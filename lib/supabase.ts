import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client for the API routes.
 *
 * The key is deliberately not prefixed with `NEXT_PUBLIC_`, so it stays on the
 * server and never reaches the browser bundle. It may only insert: the
 * submission tables have row level security on with an insert-only policy, so
 * nothing that visitors send can be read back through the Data API.
 *
 * Built on first use rather than at import time, so a missing variable surfaces
 * as a failed submission instead of a broken build.
 */

let client: SupabaseClient | null = null;

export function supabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY must be set to store submissions.",
    );
  }

  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}
