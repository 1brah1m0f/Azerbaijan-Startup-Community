import { NextResponse } from "next/server";
import type { ZodTypeAny, z } from "zod";
import { fieldErrors } from "./schemas";
import { saveSubmission, type SubmissionKind } from "./submissions";

/**
 * Builds a POST handler that validates the body against a shared schema and
 * hands the result to `saveSubmission`. Every form route is one of these.
 */
export function createSubmitHandler<S extends ZodTypeAny>(
  kind: SubmissionKind,
  schema: S,
) {
  return async function POST(request: Request) {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "invalid-json" },
        { status: 400 },
      );
    }

    const parsed = schema.safeParse(body) as z.SafeParseReturnType<
      unknown,
      z.infer<S>
    >;

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: fieldErrors(parsed.error) },
        { status: 400 },
      );
    }

    await saveSubmission(kind, parsed.data);

    return NextResponse.json({ ok: true });
  };
}
