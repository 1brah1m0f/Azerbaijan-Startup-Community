import type {
  BusinessPayload,
  LoginPayload,
  MentorPayload,
  StartupPayload,
} from "./schemas";
import { supabase } from "./supabase";

/**
 * Single place where form submissions leave the app.
 *
 * Every submission is inserted into Supabase Postgres. The option fields are
 * stored as the same enum values the forms use, so the rows can be filtered and
 * matched without parsing free text.
 */

export type SubmissionKind =
  | "join-startup"
  | "join-mentor"
  | "business"
  | "login";

export type Submission<T> = {
  kind: SubmissionKind;
  receivedAt: string;
  payload: T;
};

type Insert = { table: string; row: Record<string, unknown> };

/**
 * Maps a validated payload onto the table and columns that hold it.
 *
 * The payload type follows from `kind`, but the handler that calls
 * `saveSubmission` is generic over its schema and cannot prove that to the
 * compiler, so each branch asserts the type it was given.
 */
function toInsert(kind: SubmissionKind, payload: unknown): Insert {
  switch (kind) {
    case "join-startup": {
      const p = payload as StartupPayload;
      return {
        table: "startup_submissions",
        row: {
          full_name: p.fullName,
          email: p.email,
          startup_name: p.startupName,
          stage: p.stage,
          sector: p.sector ?? null,
          description: p.description,
          needs: p.needs,
        },
      };
    }

    case "join-mentor": {
      const p = payload as MentorPayload;
      return {
        table: "mentor_submissions",
        row: {
          full_name: p.fullName,
          email: p.email,
          role: p.role,
          expertise: p.expertise,
          industries: p.industries,
          supports: p.supports,
          linkedin: p.linkedin,
          availability: p.availability,
        },
      };
    }

    case "business": {
      const p = payload as BusinessPayload;
      return {
        table: "business_inquiries",
        row: {
          name: p.name,
          company: p.company,
          email: p.email,
          topic: p.topic,
          message: p.message,
        },
      };
    }

    case "login": {
      const p = payload as Omit<LoginPayload, "password">;
      return {
        table: "login_attempts",
        row: { role: p.role, name: p.name, email: p.email },
      };
    }
  }
}

export async function saveSubmission<T>(
  kind: SubmissionKind,
  payload: T,
): Promise<Submission<T>> {
  const submission: Submission<T> = {
    kind,
    receivedAt: new Date().toISOString(),
    payload,
  };

  const { table, row } = toInsert(kind, payload);
  const { error } = await supabase().from(table).insert(row);

  if (error) {
    // Log the payload before giving up, so a submission lost to a database
    // problem can still be recovered from the server logs.
    // eslint-disable-next-line no-console
    console.error(
      `[ASC] failed to store ${kind}: ${error.message}`,
      JSON.stringify(submission),
    );
    throw new Error(`Could not store ${kind} submission.`);
  }

  return submission;
}
