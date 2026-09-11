import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminView, type AdminTab } from "@/components/admin/AdminView";
import { ADMIN_COOKIE, sessionIsValid } from "@/lib/admin-auth";
import { readBusiness, readMentors, readStartups } from "@/lib/admin-data";

/**
 * The panel holds other people's contact details, so nothing about it may be
 * cached or indexed: every request re-checks the cookie and re-reads the rows.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Müraciətlər — ASC",
  robots: { index: false, follow: false, nocache: true },
};

const TABS: AdminTab[] = ["startups", "mentors", "business"];

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

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const store = await cookies();

  let signedIn = false;
  try {
    signedIn = sessionIsValid(store.get(ADMIN_COOKIE)?.value);
  } catch {
    // No signing secret configured — treat everyone as signed out.
    signedIn = false;
  }

  if (!signedIn) return <AdminLogin />;

  const { tab } = await searchParams;
  const current = TABS.includes(tab as AdminTab)
    ? (tab as AdminTab)
    : "startups";

  try {
    const [startups, mentors, business] = await Promise.all([
      readStartups(),
      readMentors(),
      readBusiness(),
    ]);

    return (
      <AdminView
        tab={current}
        startups={startups}
        mentors={mentors}
        business={business}
      />
    );
  } catch {
    return <Problem text="Bazaya qoşulmaq alınmadı. Bir azdan yenidən yoxla." />;
  }
}
