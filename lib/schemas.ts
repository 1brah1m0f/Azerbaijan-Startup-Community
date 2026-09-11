import { z } from "zod";
import {
  AVAILABILITY,
  EXPERTISE,
  MAX_DESCRIPTION,
  NEEDS,
  SECTORS,
  STAGES,
  TOPICS,
} from "./options";

/**
 * Shared between the client forms and the API route handlers, so a payload is
 * validated identically in both places.
 *
 * Validation messages are *keys* into `dictionary.form`, not sentences — the
 * form component looks the key up in the active language before showing it.
 */

const requiredText = z.string().trim().min(1, "required");
const email = z
  .string()
  .trim()
  .min(1, "required")
  .email("invalidEmail");

export const startupSchema = z
  .object({
    fullName: requiredText,
    email,
    startupName: z.string().trim().optional().default(""),
    stage: z.enum(STAGES, { errorMap: () => ({ message: "required" }) }),
    sector: z.enum(SECTORS).optional(),
    description: z
      .string()
      .trim()
      .max(MAX_DESCRIPTION, "tooLong")
      .optional()
      .default(""),
    needs: z.array(z.enum(NEEDS)).min(1, "selectOne"),
  })
  .superRefine((value, ctx) => {
    // A startup name is only optional while the founder is still at idea stage.
    if (value.stage !== "Idea" && !value.startupName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["startupName"],
        message: "required",
      });
    }
  });

export const mentorSchema = z.object({
  fullName: requiredText,
  email,
  role: z.string().trim().optional().default(""),
  expertise: z.array(z.enum(EXPERTISE)).min(1, "selectOne"),
  industries: z.string().trim().optional().default(""),
  supports: z.array(z.enum(STAGES)).min(1, "selectOne"),
  linkedin: z
    .union([z.literal(""), z.string().trim().url("invalidUrl")])
    .optional()
    .default(""),
  availability: z.enum(AVAILABILITY, {
    errorMap: () => ({ message: "required" }),
  }),
});

export const businessSchema = z.object({
  name: requiredText,
  company: z.string().trim().optional().default(""),
  email,
  topic: z.enum(TOPICS, { errorMap: () => ({ message: "required" }) }),
  message: requiredText,
});

export const loginSchema = z.object({
  role: z.enum(["startup", "mentor"]),
  name: z.string().trim().optional().default(""),
  email,
  password: z.string().min(1, "required"),
});

export type StartupInput = z.input<typeof startupSchema>;
export type StartupPayload = z.output<typeof startupSchema>;
export type MentorInput = z.input<typeof mentorSchema>;
export type MentorPayload = z.output<typeof mentorSchema>;
export type BusinessInput = z.input<typeof businessSchema>;
export type BusinessPayload = z.output<typeof businessSchema>;
export type LoginPayload = z.output<typeof loginSchema>;

/** Flattens a ZodError into `{ fieldName: "messageKey" }` for the forms. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
