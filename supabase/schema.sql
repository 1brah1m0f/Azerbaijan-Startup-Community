-- ============================================================================
-- Azerbaijan Startup Community — database schema
--
-- Run this once in the Supabase SQL editor on a new project. It is written to
-- be safe to run again: every statement is guarded, so re-running it will not
-- drop anything or fail on objects that already exist.
--
-- Two keys talk to these tables and they can do different things:
--
--   the publishable key, used by the public forms, may INSERT and nothing else
--   the secret key, used only by the admin panel and the member pages, bypasses
--   row level security entirely and never leaves the server
--
-- That split is what stops a mistake in the public form path exposing anybody's
-- contact details.
-- ============================================================================

-- ---------------------------------------------------------------- submissions

create table if not exists public.startup_submissions (
  id           uuid primary key default gen_random_uuid(),
  received_at  timestamptz not null default now(),
  full_name    text not null,
  email        text not null,
  startup_name text,
  stage        text not null,
  sector       text,
  description  text,
  needs        text[] not null default '{}'
);

create table if not exists public.mentor_submissions (
  id           uuid primary key default gen_random_uuid(),
  received_at  timestamptz not null default now(),
  full_name    text not null,
  email        text not null,
  role         text,
  expertise    text[] not null default '{}',
  industries   text,
  supports     text[] not null default '{}',
  linkedin     text,
  availability text not null
);

create table if not exists public.business_inquiries (
  id          uuid primary key default gen_random_uuid(),
  received_at timestamptz not null default now(),
  name        text not null,
  company     text,
  email       text not null,
  topic       text not null,
  message     text not null
);

create table if not exists public.login_attempts (
  id          uuid primary key default gen_random_uuid(),
  received_at timestamptz not null default now(),
  role        text,
  name        text,
  email       text
);

-- The option columns are deliberately plain text rather than enums. Adding a
-- sector to lib/options.ts must never make the database reject a submission,
-- and a row written before an option was renamed still reads back cleanly.

-- --------------------------------------------------------- indexes

-- Every read is newest first, and accounts look a person up by address.
create index if not exists startup_submissions_received_at_idx
  on public.startup_submissions (received_at desc);
create index if not exists mentor_submissions_received_at_idx
  on public.mentor_submissions (received_at desc);
create index if not exists business_inquiries_received_at_idx
  on public.business_inquiries (received_at desc);

create index if not exists startup_submissions_email_idx
  on public.startup_submissions (lower(email));
create index if not exists mentor_submissions_email_idx
  on public.mentor_submissions (lower(email));

-- --------------------------------------------------- row level security

alter table public.startup_submissions enable row level security;
alter table public.mentor_submissions  enable row level security;
alter table public.business_inquiries  enable row level security;
alter table public.login_attempts      enable row level security;

-- Insert only, for anyone. There is deliberately no select policy: with row
-- level security on and no policy granting it, a select through the public key
-- returns nothing at all. Reading is done with the secret key, which bypasses
-- these rules and is confined to the server.

do $$
declare
  t text;
begin
  foreach t in array array[
    'startup_submissions',
    'mentor_submissions',
    'business_inquiries',
    'login_attempts'
  ]
  loop
    execute format(
      'drop policy if exists %I on public.%I', t || '_insert', t
    );
    execute format(
      'create policy %I on public.%I for insert to anon, authenticated with check (true)',
      t || '_insert', t
    );
  end loop;
end
$$;

-- ============================================================================
-- Accounts
--
-- Sign-up is gated in the application: /api/auth/signup refuses an address that
-- does not already appear in startup_submissions or mentor_submissions, so the
-- member area stays limited to people who actually applied. Accounts are
-- created already confirmed, which is why no email provider has to be wired up.
--
-- Member pages read a person's own rows with the secret key, filtered by the
-- email on their verified session, so no extra select policy is needed here.
-- ============================================================================
