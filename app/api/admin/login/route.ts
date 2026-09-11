import { NextResponse } from "next/server";
import { z } from "zod";
import {
  ADMIN_COOKIE,
  issueSession,
  passwordMatches,
  pauseAfterFailure,
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
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    await pauseAfterFailure();
    return rejected();
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    await pauseAfterFailure();
    return rejected();
  }

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

  if (!allowed) {
    await pauseAfterFailure();
    return rejected();
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, issueSession(), sessionCookieOptions());
  return response;
}
