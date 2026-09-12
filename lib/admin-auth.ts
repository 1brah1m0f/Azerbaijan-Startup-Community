import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/**
 * Password gate for the admin panel.
 *
 * One shared password unlocks the panel; after that the browser carries a
 * signed token instead, so the password itself is sent once and never stored
 * anywhere on the client. The token is a expiry timestamp plus an HMAC of it,
 * which means sessions expire on their own and cannot be extended by editing
 * the cookie.
 *
 * Neither the password nor the signing secret is ever logged.
 */

export const ADMIN_COOKIE = "asc_admin";

/** Long enough for an evening of going through submissions. */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

function requireEnv(name: "ADMIN_PASSWORD" | "ADMIN_SESSION_SECRET"): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} must be set to use the admin panel.`);
  return value;
}

/** Comparing digests keeps the check constant time whatever the input length. */
function digest(value: string): Buffer {
  return createHash("sha256").update(value, "utf8").digest();
}

function sign(payload: string): string {
  return createHmac("sha256", requireEnv("ADMIN_SESSION_SECRET"))
    .update(payload)
    .digest("hex");
}

export function passwordMatches(candidate: string): boolean {
  return timingSafeEqual(digest(candidate), digest(requireEnv("ADMIN_PASSWORD")));
}

export function issueSession(now: number = Date.now()): string {
  const expiresAt = now + SESSION_MAX_AGE_SECONDS * 1000;
  return `${expiresAt}.${sign(String(expiresAt))}`;
}

export function sessionIsValid(
  token: string | undefined,
  now: number = Date.now(),
): boolean {
  if (!token) return false;

  const separator = token.indexOf(".");
  if (separator < 1) return false;

  const expiresAt = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  const expected = sign(expiresAt);
  if (signature.length !== expected.length) return false;
  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return false;
  }

  const expiry = Number(expiresAt);
  return Number.isFinite(expiry) && expiry > now;
}

/**
 * `secure` is dropped in development so the cookie still works over plain
 * http on localhost; every deployed environment is https.
 */
export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}

/** Slows down guessing without making a real sign-in feel broken. */
export function pauseAfterFailure(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 700));
}

/**
 * Attempt limiting.
 *
 * The pause above only delays one request at a time, so a hundred parallel
 * requests still buy a hundred guesses. Counting attempts per caller closes
 * that: after `MAX_ATTEMPTS` failures the address is refused outright for
 * `LOCKOUT_MS`, whether or not the password is right.
 *
 * The counter lives in the running instance's memory. On serverless that means
 * it resets when an instance is recycled and is not shared between instances,
 * so it raises the cost of guessing rather than making it impossible. A shared
 * store would be needed to make the limit exact.
 */

const MAX_ATTEMPTS = 8;
const WINDOW_MS = 15 * 60 * 1000;
const LOCKOUT_MS = 15 * 60 * 1000;

type Attempts = { count: number; first: number; blockedUntil: number };

const attempts = new Map<string, Attempts>();

/** Keeps the map from growing without bound on a long-lived instance. */
function prune(now: number) {
  if (attempts.size < 1000) return;
  for (const [key, entry] of attempts) {
    if (entry.blockedUntil < now && now - entry.first > WINDOW_MS) {
      attempts.delete(key);
    }
  }
}

/** Identifies the caller for rate limiting. Falls back to a shared bucket. */
export function callerKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function isLockedOut(key: string, now: number = Date.now()): boolean {
  const entry = attempts.get(key);
  return entry !== undefined && entry.blockedUntil > now;
}

export function recordFailure(key: string, now: number = Date.now()): void {
  prune(now);
  const entry = attempts.get(key);

  if (!entry || now - entry.first > WINDOW_MS) {
    attempts.set(key, { count: 1, first: now, blockedUntil: 0 });
    return;
  }

  entry.count += 1;
  if (entry.count >= MAX_ATTEMPTS) {
    entry.blockedUntil = now + LOCKOUT_MS;
    entry.count = 0;
    entry.first = now;
  }
}

export function clearFailures(key: string): void {
  attempts.delete(key);
}
