import { createSubmitHandler } from "@/lib/handler";
import { startupSchema } from "@/lib/schemas";

/** Receives a "join as a startup" submission. */
export const POST = createSubmitHandler("join-startup", startupSchema);
