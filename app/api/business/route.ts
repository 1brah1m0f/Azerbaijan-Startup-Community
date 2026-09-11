import { createSubmitHandler } from "@/lib/handler";
import { businessSchema } from "@/lib/schemas";

/** Receives a business / partnership inquiry. */
export const POST = createSubmitHandler("business", businessSchema);
