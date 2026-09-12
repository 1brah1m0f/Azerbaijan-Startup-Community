import "server-only";

import { normaliseEmail, privilegedClient } from "./auth";
import { rankMentors, type MentorMatch } from "./matching";
import type { MentorRecord, StartupRecord } from "./records";

/**
 * What a signed-in member is allowed to see.
 *
 * Every read here is filtered by the email on the verified session — that
 * filter is the access control, so it is applied in this module and nowhere
 * else. Nothing in here returns another person's contact details: a founder
 * sees which mentors fit and why, a mentor sees which startups fit, and ASC
 * makes the introduction.
 */

type Row = Record<string, unknown>;

const text = (value: unknown): string =>
  typeof value === "string" ? value : "";
const list = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];

function toStartup(row: Row): StartupRecord {
  return {
    id: text(row.id),
    receivedAt: text(row.received_at),
    fullName: text(row.full_name),
    email: text(row.email),
    startupName: text(row.startup_name),
    stage: text(row.stage),
    sector: typeof row.sector === "string" ? row.sector : null,
    description: text(row.description),
    needs: list(row.needs),
  };
}

function toMentor(row: Row): MentorRecord {
  return {
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
  };
}

/** The member's own registrations, newest first. */
async function ownRows(table: string, email: string): Promise<Row[]> {
  const { data, error } = await privilegedClient()
    .from(table)
    .select("*")
    .ilike("email", normaliseEmail(email))
    .order("received_at", { ascending: false });

  if (error) throw new Error(`Could not read ${table}: ${error.message}`);
  return (data ?? []) as Row[];
}

/** A mentor as shown to a founder: no email, no direct contact. */
export type MentorSummary = {
  id: string;
  fullName: string;
  role: string;
  expertise: string[];
  industries: string;
  supports: string[];
  availability: string;
};

/** A startup as shown to a mentor: no email, no direct contact. */
export type StartupSummary = {
  id: string;
  startupName: string;
  stage: string;
  sector: string | null;
  description: string;
  needs: string[];
};

export type MemberMatch = {
  score: number;
  signals: MentorMatch["signals"];
  mentor: MentorSummary;
};

export type StartupSide = {
  startup: StartupRecord;
  matches: MemberMatch[];
};

export type MentorSide = {
  mentor: MentorRecord;
  startups: StartupSummary[];
};

export type MemberPage = {
  startup: StartupSide | null;
  mentor: MentorSide | null;
};

/** How many matches are worth showing before the list stops being useful. */
const TOP_MATCHES = 5;

function summariseMentor(mentor: MentorRecord): MentorSummary {
  return {
    id: mentor.id,
    fullName: mentor.fullName,
    role: mentor.role,
    expertise: mentor.expertise,
    industries: mentor.industries,
    supports: mentor.supports,
    availability: mentor.availability,
  };
}

function summariseStartup(startup: StartupRecord): StartupSummary {
  return {
    id: startup.id,
    startupName: startup.startupName,
    stage: startup.stage,
    sector: startup.sector,
    description: startup.description,
    needs: startup.needs,
  };
}

export async function readMemberPage(email: string): Promise<MemberPage> {
  const [startupRows, mentorRows] = await Promise.all([
    ownRows("startup_submissions", email),
    ownRows("mentor_submissions", email),
  ]);

  const db = privilegedClient();
  let startup: StartupSide | null = null;
  let mentor: MentorSide | null = null;

  if (startupRows.length > 0) {
    const own = toStartup(startupRows[0]!);

    const { data, error } = await db.from("mentor_submissions").select("*");
    if (error) throw new Error(`Could not read mentors: ${error.message}`);

    const mentors = ((data ?? []) as Row[]).map(toMentor);
    startup = {
      startup: own,
      matches: rankMentors(own, mentors)
        .filter((match) => match.score > 0)
        .slice(0, TOP_MATCHES)
        .map((match) => ({
          score: match.score,
          signals: match.signals,
          mentor: summariseMentor(match.mentor),
        })),
    };
  }

  if (mentorRows.length > 0) {
    const own = toMentor(mentorRows[0]!);

    const { data, error } = await db.from("startup_submissions").select("*");
    if (error) throw new Error(`Could not read startups: ${error.message}`);

    const startups = ((data ?? []) as Row[]).map(toStartup);

    // Rank the other way round: score each startup against this one mentor.
    mentor = {
      mentor: own,
      startups: startups
        .map((candidate) => ({
          candidate,
          score: rankMentors(candidate, [own])[0]?.score ?? 0,
        }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, TOP_MATCHES)
        .map((entry) => summariseStartup(entry.candidate)),
    };
  }

  return { startup, mentor };
}
