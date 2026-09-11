/**
 * Single place where form submissions leave the app.
 *
 * Right now every submission is logged to the server console. To persist them
 * for real, replace the body of `saveSubmission` with a write to your store —
 * the payloads are already validated and typed, so nothing else has to change:
 *
 *   // Google Sheets / Airtable
 *   await fetch(process.env.SHEET_WEBHOOK_URL!, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ kind, ...payload }),
 *   });
 *
 *   // or a database
 *   await db.insert(submissions).values({ kind, payload, createdAt: new Date() });
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

export async function saveSubmission<T>(
  kind: SubmissionKind,
  payload: T,
): Promise<Submission<T>> {
  const submission: Submission<T> = {
    kind,
    receivedAt: new Date().toISOString(),
    payload,
  };

  // eslint-disable-next-line no-console
  console.log(`[ASC] ${kind}`, JSON.stringify(submission, null, 2));

  return submission;
}
