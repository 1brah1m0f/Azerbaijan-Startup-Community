import { NextResponse } from "next/server";
import { z } from "zod";
import { normaliseEmail, sessionClient } from "@/lib/auth";

/**
 * Signs a member in.
 *
 * Supabase sets the session as httpOnly cookies through the client built in
 * `sessionClient`, so the access token never reaches page JavaScript. A wrong
 * address and a wrong password answer identically, so this cannot be used to
 * find out who has an account.
 *
 * The password is never logged and never stored by this application.
 */

export const dynamic = "force-dynamic";

const schema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

const rejected = () =>
  NextResponse.json({ ok: false, error: "invalid" }, { status: 401 });

/** Costs a guess the same as a real attempt, without feeling broken. */
const pause = () => new Promise((resolve) => setTimeout(resolve, 500));

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    await pause();
    return rejected();
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    await pause();
    return rejected();
  }

  let client;
  try {
    client = await sessionClient();
  } catch {
    return NextResponse.json(
      { ok: false, error: "not-configured" },
      { status: 500 },
    );
  }

  const { data, error } = await client.auth.signInWithPassword({
    email: normaliseEmail(parsed.data.email),
    password: parsed.data.password,
  });

  if (error || !data.session) {
    await pause();
    return rejected();
  }

  return NextResponse.json({ ok: true });
}
