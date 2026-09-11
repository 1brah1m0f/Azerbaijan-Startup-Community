import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, sessionIsValid } from "@/lib/admin-auth";
import { readBusiness, readMentors, readStartups } from "@/lib/admin-data";

/**
 * Downloads one table as CSV. Behind the same session cookie as the panel, so
 * it cannot be used to slip past the password.
 */

export const dynamic = "force-dynamic";

type Sheet = { header: string[]; rows: string[][] };

/** A quoted field is always safe; doubling quotes is the whole escape rule. */
function cell(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

function toCsv({ header, rows }: Sheet): string {
  const lines = [header, ...rows].map((row) => row.map(cell).join(","));
  // The BOM is what makes Excel read the Azerbaijani characters correctly.
  return `\uFEFF${lines.join("\r\n")}\r\n`;
}

async function sheetFor(type: string): Promise<Sheet | null> {
  if (type === "startups") {
    return {
      header: [
        "Tarix",
        "Ad Soyad",
        "E-poçt",
        "Startup",
        "Mərhələ",
        "Sektor",
        "Axtarır",
        "Haqqında",
      ],
      rows: (await readStartups()).map((row) => [
        row.receivedAt,
        row.fullName,
        row.email,
        row.startupName,
        row.stage,
        row.sector ?? "",
        row.needs.join(", "),
        row.description,
      ]),
    };
  }

  if (type === "mentors") {
    return {
      header: [
        "Tarix",
        "Ad Soyad",
        "E-poçt",
        "Vəzifə",
        "Ekspertiza",
        "Sektorlar",
        "Mərhələlər",
        "LinkedIn",
        "Aylıq saat",
      ],
      rows: (await readMentors()).map((row) => [
        row.receivedAt,
        row.fullName,
        row.email,
        row.role,
        row.expertise.join(", "),
        row.industries,
        row.supports.join(", "),
        row.linkedin,
        row.availability,
      ]),
    };
  }

  if (type === "business") {
    return {
      header: ["Tarix", "Ad", "Şirkət", "E-poçt", "Mövzu", "Mesaj"],
      rows: (await readBusiness()).map((row) => [
        row.receivedAt,
        row.name,
        row.company,
        row.email,
        row.topic,
        row.message,
      ]),
    };
  }

  return null;
}

export async function GET(request: Request) {
  const store = await cookies();

  let signedIn = false;
  try {
    signedIn = sessionIsValid(store.get(ADMIN_COOKIE)?.value);
  } catch {
    signedIn = false;
  }

  if (!signedIn) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const type = new URL(request.url).searchParams.get("type") ?? "";

  let sheet: Sheet | null;
  try {
    sheet = await sheetFor(type);
  } catch {
    return NextResponse.json({ ok: false, error: "read-failed" }, { status: 500 });
  }

  if (!sheet) {
    return NextResponse.json({ ok: false, error: "unknown-type" }, { status: 400 });
  }

  return new NextResponse(toCsv(sheet), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="asc-${type}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
