import { createSubmitHandler } from "@/lib/handler";
import { mentorSchema } from "@/lib/schemas";

/** Receives a "join as a mentor" submission. */
export const POST = createSubmitHandler("join-mentor", mentorSchema);
