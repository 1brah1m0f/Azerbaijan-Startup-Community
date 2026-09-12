import { NextResponse } from "next/server";
import { z } from "zod";
import {
  normaliseEmail,
  privilegedClient,
  registrationsFor,
  sessionClient,
} from "@/lib/auth";

/**
 * Opens an account for somebody who has already registered.
 *
 * Only an email that appears in the startup or mentor tables can create one,
 * so the member area stays limited to real applicants. The account is created
 * already confirmed, which is what lets this work without an email provider
 * being wired up.
 */

export const dynamic = "force-dynamic";

/**
 * Long enough to be worth having. Supabase enforces its own project minimum
 * as well; this is the floor the site asks for.
 */
const MIN_PASSWORD = 8;

const schema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(MIN_PASSWORD),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const tooShort = parsed.error.issues.some(
      (issue) => issue.path[0] === "password",
    );
    return NextResponse.json(
      { ok: false, error: tooShort ? "weak-password" : "invalid" },
      { status: 400 },
    );
  }

  const email = normaliseEmail(parsed.data.email);

  let roles: string[];
  try {
    roles = await registrationsFor(email);
  } catch {
    return NextResponse.json(
      { ok: false, error: "not-configured" },
      { status: 500 },
    );
  }

  // The gate: no submission, no account.
  if (roles.length === 0) {
    return NextResponse.json(
      { ok: false, error: "not-registered" },
      { status: 403 },
    );
  }

  const { error } = await privilegedClient().auth.admin.createUser({
    email,
    password: parsed.data.password,
    email_confirm: true,
    user_metadata: { roles },
  });

  if (error) {
    // Supabase reports an existing address as a conflict; say so plainly so
    // the visitor is told to sign in rather than shown a generic failure.
    const exists =
      error.status === 422 || /already|registered|exists/i.test(error.message);
    return NextResponse.json(
      { ok: false, error: exists ? "already-registered" : "failed" },
      { status: exists ? 409 : 500 },
    );
  }

  // Sign the new account in straight away, so the visitor is not asked to type
  // the same details a second time.
  const client = await sessionClient();
  const signIn = await client.auth.signInWithPassword({
    email,
    password: parsed.data.password,
  });

  if (signIn.error) {
    return NextResponse.json({ ok: true, signedIn: false });
  }

  return NextResponse.json({ ok: true, signedIn: true });
}
