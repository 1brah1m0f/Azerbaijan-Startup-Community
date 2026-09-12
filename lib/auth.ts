import "server-only";

import { createServerClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Accounts for the people who registered.
 *
 * Sessions are Supabase Auth sessions carried in httpOnly cookies, so the
 * access token is never readable from JavaScript in the browser.
 *
 * Two clients live here and they are deliberately different:
 *
 *   `sessionClient()` uses the publishable key and acts as the signed-in
 *   visitor. It is what signs somebody in or out.
 *
 *   `privilegedClient()` uses the secret key and bypasses row level security.
 *   It is only ever used behind a verified session, and only to read rows
 *   belonging to the email on that session. `server-only` above makes
 *   importing any of this from a client component a build error.
 */

function env(name: "SUPABASE_URL" | "SUPABASE_PUBLISHABLE_KEY" | "SUPABASE_SECRET_KEY") {
  const value = process.env[name];
  if (!value) throw new Error(`${name} must be set to use accounts.`);
  return value;
}

/**
 * Reads and writes the Supabase session cookies.
 *
 * In a server component cookies cannot be written, so `setAll` is allowed to
 * fail there; the session is refreshed by the route handlers instead.
 */
export async function sessionClient(): Promise<SupabaseClient> {
  const store = await cookies();

  return createServerClient(env("SUPABASE_URL"), env("SUPABASE_PUBLISHABLE_KEY"), {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) =>
            store.set(name, value, options),
          );
        } catch {
          /* read-only context — nothing to refresh here */
        }
      },
    },
  });
}

let privileged: SupabaseClient | null = null;

export function privilegedClient(): SupabaseClient {
  if (privileged) return privileged;
  privileged = createClient(env("SUPABASE_URL"), env("SUPABASE_SECRET_KEY"), {
    auth: { persistSession: false },
  });
  return privileged;
}

export type Member = {
  id: string;
  email: string;
};

/**
 * The signed-in member, or null.
 *
 * Uses `getUser`, which asks Supabase to verify the token, rather than reading
 * the claims out of the cookie — a cookie can be edited, a verified token
 * cannot.
 */
export async function currentMember(): Promise<Member | null> {
  let client: SupabaseClient;
  try {
    client = await sessionClient();
  } catch {
    // Accounts are not configured; treat that as nobody being signed in.
    return null;
  }

  const { data, error } = await client.auth.getUser();
  if (error || !data.user?.email) return null;

  return { id: data.user.id, email: data.user.email };
}

/** Emails are compared lowercase everywhere, so normalise in one place. */
export function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}

export type RegisteredAs = "startup" | "mentor";

/**
 * Which registration forms an email has been through.
 *
 * Only people who already applied may open an account, so this is the gate on
 * sign-up. It is also what decides which member page somebody sees.
 */
export async function registrationsFor(
  email: string,
): Promise<RegisteredAs[]> {
  const wanted = normaliseEmail(email);
  const db = privilegedClient();

  const [startup, mentor] = await Promise.all([
    db.from("startup_submissions").select("id").ilike("email", wanted).limit(1),
    db.from("mentor_submissions").select("id").ilike("email", wanted).limit(1),
  ]);

  if (startup.error) {
    throw new Error(`Could not check registrations: ${startup.error.message}`);
  }
  if (mentor.error) {
    throw new Error(`Could not check registrations: ${mentor.error.message}`);
  }

  const roles: RegisteredAs[] = [];
  if ((startup.data ?? []).length > 0) roles.push("startup");
  if ((mentor.data ?? []).length > 0) roles.push("mentor");
  return roles;
}
