import { NextResponse } from "next/server";
import { z } from "zod";
import {
  ADMIN_COOKIE,
  callerKey,
  clearFailures,
  isLockedOut,
  issueSession,
  passwordMatches,
  pauseAfterFailure,
  recordFailure,
  sessionCookieOptions,
} from "@/lib/admin-auth";

/**
 * Exchanges the shared password for a signed session cookie.
 *
 * Every rejection answers the same way and after the same pause, so the
 * response cannot be used to tell a malformed attempt from a wrong password.
 */

const schema = z.object({ password: z.string().min(1) });

const rejected = () =>
  NextResponse.json({ ok: false, error: "invalid" }, { status: 401 });

export async function POST(request: Request) {
  const caller = callerKey(request);

  // Answers the same way as a wrong password, so probing cannot map the limit.
  if (isLockedOut(caller)) {
    await pauseAfterFailure();
    return rejected();
  }

  const fail = async () => {
    recordFailure(caller);
    await pauseAfterFailure();
    return rejected();
  };

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail();
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return fail();

  let allowed = false;
  try {
    allowed = passwordMatches(parsed.data.password);
  } catch {
    // A missing password or signing secret is a configuration problem, not a
    // failed sign-in. Say so without naming the variable.
    return NextResponse.json(
      { ok: false, error: "not-configured" },
      { status: 500 },
    );
  }

  if (!allowed) return fail();

  clearFailures(caller);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, issueSession(), sessionCookieOptions());
  return response;
}
