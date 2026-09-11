import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/schemas";
import { saveSubmission } from "@/lib/submissions";

/**
 * Placeholder login endpoint.
 *
 * There is no account system yet, so this validates the credentials' shape,
 * records the attempt, and tells the client that log in is not enabled. The
 * modal shows that as a notice. Swap the body for a real session check when
 * authentication is added — the client already handles a JSON response.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid-json" },
      { status: 400 },
    );
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "invalid-credentials" },
      { status: 400 },
    );
  }

  // Never log the password.
  const { password: _password, ...safe } = parsed.data;
  await saveSubmission("login", safe);

  return NextResponse.json({ ok: true, status: "not-enabled" });
}
