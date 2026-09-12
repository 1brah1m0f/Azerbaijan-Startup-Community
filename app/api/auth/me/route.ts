import { NextResponse } from "next/server";
import { currentMember } from "@/lib/auth";

/**
 * Whether the caller is signed in, for the header.
 *
 * Asked for from the browser rather than read during the page render, so the
 * landing page can still be served as static HTML. Returns the address and
 * nothing else.
 */

export const dynamic = "force-dynamic";

export async function GET() {
  const member = await currentMember();

  return NextResponse.json(
    member ? { signedIn: true, email: member.email } : { signedIn: false },
    { headers: { "Cache-Control": "no-store" } },
  );
}
