import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AccountView } from "@/components/account/AccountView";
import { currentMember } from "@/lib/auth";
import { readMemberPage } from "@/lib/member-data";

/**
 * A member's own page. It shows their submission and who they match, so it is
 * never cached or indexed and the session is re-checked on every request.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hesabım — ASC",
  robots: { index: false, follow: false, nocache: true },
};

function Problem({ text }: { text: string }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="max-w-sm text-center space-y-2">
        <h1 className="font-heading text-xl font-bold text-slate-900">
          Məlumat yüklənmədi
        </h1>
        <p className="text-sm text-slate-500">{text}</p>
      </div>
    </main>
  );
}

export default async function AccountPage() {
  const member = await currentMember();
  if (!member) redirect("/");

  try {
    const page = await readMemberPage(member.email);
    return <AccountView email={member.email} page={page} />;
  } catch {
    return <Problem text="Bazaya qoşulmaq alınmadı. Bir azdan yenidən yoxla." />;
  }
}
