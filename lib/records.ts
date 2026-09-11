/**
 * The submission rows as the admin panel reads them back.
 *
 * These mirror the tables written by `saveSubmission`, with the columns
 * renamed to the camelCase the rest of the app uses. Option fields stay as
 * plain strings: the database deliberately does not constrain them, so a row
 * written before an option was renamed still reads back cleanly.
 */

export type StartupRecord = {
  id: string;
  receivedAt: string;
  fullName: string;
  email: string;
  startupName: string;
  stage: string;
  sector: string | null;
  description: string;
  needs: string[];
};

export type MentorRecord = {
  id: string;
  receivedAt: string;
  fullName: string;
  email: string;
  role: string;
  expertise: string[];
  industries: string;
  supports: string[];
  linkedin: string;
  availability: string;
};

export type BusinessRecord = {
  id: string;
  receivedAt: string;
  name: string;
  company: string;
  email: string;
  topic: string;
  message: string;
};
