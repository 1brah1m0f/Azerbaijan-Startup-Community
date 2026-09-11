"use client";

import { useCallback, useState } from "react";
import type { ZodTypeAny, z } from "zod";
import { useLang } from "@/components/providers/LangProvider";
import { fieldErrors } from "@/lib/schemas";

export type SubmitStatus = "idle" | "sending" | "done";

/**
 * Validates a form against its shared zod schema, posts the result to an API
 * route, and tracks the success state.
 *
 * Schema messages are keys into `dictionary.form`, so the errors this returns
 * are already in the visitor's language.
 */
export function useFormSubmit<S extends ZodTypeAny>(
  endpoint: string,
  schema: S,
) {
  const { d } = useLang();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const translate = useCallback(
    (key: string) => (d.form as Record<string, string>)[key] ?? key,
    [d],
  );

  const submit = useCallback(
    async (raw: unknown) => {
      const parsed = schema.safeParse(raw) as z.SafeParseReturnType<
        unknown,
        z.infer<S>
      >;

      if (!parsed.success) {
        const next = fieldErrors(parsed.error);
        setErrors(
          Object.fromEntries(
            Object.entries(next).map(([field, key]) => [field, translate(key)]),
          ),
        );
        return false;
      }

      setErrors({});
      setStatus("sending");

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        });
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        setStatus("done");
        return true;
      } catch {
        setStatus("idle");
        setErrors({ form: d.form.serverError });
        return false;
      }
    },
    [endpoint, schema, translate, d],
  );

  return { errors, status, submit, setErrors };
}
