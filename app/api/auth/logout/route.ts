import { NextResponse } from "next/server";
import { sessionClient } from "@/lib/auth";

/** Ends the session and clears its cookies. */

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const client = await sessionClient();
    await client.auth.signOut();
  } catch {
    // Nothing to sign out of, or accounts are not configured. Either way the
    // caller ends up signed out.
  }

  return NextResponse.json({ ok: true });
}
