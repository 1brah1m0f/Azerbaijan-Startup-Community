import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type {
  BusinessRecord,
  MentorRecord,
  StartupRecord,
} from "./records";

/**
 * Reads submissions back for the admin panel.
 *
 * This is the only place that holds a key able to read the tables. The key the
 * public site uses can insert and nothing else, so a mistake in the form path
 * can never expose anyone's details. `server-only` above makes importing this
 * module from a client component a build error rather than a leak.
 */

let client: SupabaseClient | null = null;

function adminClient(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_SECRET_KEY must be set to read submissions.",
    );
  }

  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}

/**
 * How many rows to pull per request. Supabase caps a single response at its
 * project `max-rows` setting (1000 by default) and truncates silently, so the
 * rows are fetched a page at a time instead of trusting one unbounded select.
 */
const PAGE_SIZE = 1000;

/** A ceiling, so a runaway table cannot hang the panel. */
const MAX_ROWS = 20000;

/** Newest first — the panel is read top to bottom. */
async function newestFirst(table: string) {
  const rows: unknown[] = [];

  for (let from = 0; from < MAX_ROWS; from += PAGE_SIZE) {
    const { data, error } = await adminClient()
      .from(table)
      .select("*")
      .order("received_at", { ascending: false })
      .range(from, from + PAGE_SIZE - 1);

    if (error) throw new Error(`Could not read ${table}: ${error.message}`);

    const page = data ?? [];
    rows.push(...page);

    // A short page means the table is exhausted.
    if (page.length < PAGE_SIZE) break;
  }

  return rows as Record<string, unknown>[];
}

type Row = Record<string, unknown>;

const text = (value: unknown): string => (typeof value === "string" ? value : "");
const list = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

export async function readStartups(): Promise<StartupRecord[]> {
  return (await newestFirst("startup_submissions")).map((row: Row) => ({
    id: text(row.id),
    receivedAt: text(row.received_at),
    fullName: text(row.full_name),
    email: text(row.email),
    startupName: text(row.startup_name),
    stage: text(row.stage),
    sector: typeof row.sector === "string" ? row.sector : null,
    description: text(row.description),
    needs: list(row.needs),
  }));
}

export async function readMentors(): Promise<MentorRecord[]> {
  return (await newestFirst("mentor_submissions")).map((row: Row) => ({
    id: text(row.id),
    receivedAt: text(row.received_at),
    fullName: text(row.full_name),
    email: text(row.email),
    role: text(row.role),
    expertise: list(row.expertise),
    industries: text(row.industries),
    supports: list(row.supports),
    linkedin: text(row.linkedin),
    availability: text(row.availability),
  }));
}

export async function readBusiness(): Promise<BusinessRecord[]> {
  return (await newestFirst("business_inquiries")).map((row: Row) => ({
    id: text(row.id),
    receivedAt: text(row.received_at),
    name: text(row.name),
    company: text(row.company),
    email: text(row.email),
    topic: text(row.topic),
    message: text(row.message),
  }));
}
