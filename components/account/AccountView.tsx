"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { Tag } from "@/components/ui/ChipGroup";
import { Check, Close } from "@/components/ui/Icons";
import type { MemberPage, MemberMatch, StartupSummary } from "@/lib/member-data";
import type { Signal } from "@/lib/matching";
import type { MentorRecord, StartupRecord } from "@/lib/records";

function formatDate(value: string): string {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString("az-AZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
}

function SignOutButton({ label }: { label: string }) {
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.assign("/");
      }}
      className="text-sm font-semibold text-slate-500 hover:text-brand-blue transition-colors disabled:opacity-60"
    >
      {label}
    </button>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-3 border-b border-slate-100 last:border-0 sm:grid sm:grid-cols-[10rem_1fr] sm:gap-4">
      <dt className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 sm:mb-0">
        {label}
      </dt>
      <dd className="text-slate-700">{children}</dd>
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  if (items.length === 0) return <span className="text-slate-400">—</span>;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="glass-card rounded-3xl p-6 sm:p-8">
      <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SignalLine({ signal }: { signal: Signal }) {
  const icon =
    signal.state === "matched" ? (
      <Check className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
    ) : signal.state === "missed" ? (
      <Close className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
    ) : (
      <span
        className="w-4 h-4 shrink-0 mt-0.5 text-slate-300 text-center leading-4"
        aria-hidden="true"
      >
        ?
      </span>
    );

  return (
    <li className="flex items-start gap-2 text-sm">
      {icon}
      <span
        className={
          signal.state === "matched" ? "text-slate-700" : "text-slate-400"
        }
      >
        {signal.label}
      </span>
    </li>
  );
}

function MentorMatchCard({ match }: { match: MemberMatch }) {
  const { d } = useLang();
  const m = match.mentor;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white/70 p-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="min-w-0">
          <h3 className="font-heading text-lg font-bold text-slate-900 truncate">
            {m.fullName}
          </h3>
          <p className="text-sm font-semibold text-brand-teal">{m.role}</p>
        </div>
        <span className="shrink-0 rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-bold text-brand-teal">
          {d.account.fit} {match.score}%
        </span>
      </div>

      <dl className="space-y-2 text-sm mb-4">
        <div>
          <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {d.account.labelExpertise}
          </dt>
          <dd className="text-slate-600">{m.expertise.join(" · ") || "—"}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {d.account.labelIndustries}
          </dt>
          <dd className="text-slate-600">{m.industries || "—"}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {d.account.labelSupports}
          </dt>
          <dd className="text-slate-600">{m.supports.join(" · ") || "—"}</dd>
        </div>
      </dl>

      <ul className="space-y-1.5">
        {match.signals.map((signal) => (
          <SignalLine key={signal.label} signal={signal} />
        ))}
      </ul>
    </div>
  );
}

function StartupMatchCard({ startup }: { startup: StartupSummary }) {
  const { d } = useLang();

  return (
    <div className="rounded-2xl border border-slate-100 bg-white/70 p-5">
      <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
        {startup.startupName || "—"}
      </h3>
      <div className="flex flex-wrap gap-2 mb-3">
        <Tag tone="blue">
          {d.account.labelStage}: {startup.stage}
        </Tag>
        {startup.sector ? <Tag tone="teal">{startup.sector}</Tag> : null}
      </div>
      {startup.description ? (
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          {startup.description}
        </p>
      ) : null}
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
        {d.account.labelNeeds}
      </p>
      <Tags items={startup.needs} />
    </div>
  );
}

function StartupProfile({ startup }: { startup: StartupRecord }) {
  const { d } = useLang();
  return (
    <Panel title={d.account.startupProfile}>
      <dl>
        <Row label={d.account.submitted}>{formatDate(startup.receivedAt)}</Row>
        <Row label="Startup">{startup.startupName || "—"}</Row>
        <Row label={d.account.labelStage}>{startup.stage}</Row>
        <Row label={d.account.labelSector}>{startup.sector ?? "—"}</Row>
        <Row label={d.account.labelNeeds}>
          <Tags items={startup.needs} />
        </Row>
        <Row label={d.account.labelAbout}>{startup.description || "—"}</Row>
      </dl>
    </Panel>
  );
}

function MentorProfile({ mentor }: { mentor: MentorRecord }) {
  const { d } = useLang();
  return (
    <Panel title={d.account.mentorProfile}>
      <dl>
        <Row label={d.account.submitted}>{formatDate(mentor.receivedAt)}</Row>
        <Row label={d.account.labelRole}>{mentor.role || "—"}</Row>
        <Row label={d.account.labelExpertise}>
          <Tags items={mentor.expertise} />
        </Row>
        <Row label={d.account.labelIndustries}>{mentor.industries || "—"}</Row>
        <Row label={d.account.labelSupports}>
          <Tags items={mentor.supports} />
        </Row>
        <Row label={d.account.labelAvailability}>{mentor.availability}</Row>
      </dl>
    </Panel>
  );
}

export function AccountView({
  email,
  page,
}: {
  email: string;
  page: MemberPage;
}) {
  const { d } = useLang();
  const nothing = !page.startup && !page.mentor;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <Image
              src="/logos/asc-logo-tight.png"
              alt="Azerbaijan Startup Community"
              width={168}
              height={82}
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            <span className="text-sm text-slate-500 truncate hidden sm:inline">
              {email}
            </span>
            <Link
              href="/"
              className="text-sm font-semibold text-slate-500 hover:text-brand-blue transition-colors whitespace-nowrap"
            >
              {d.account.backToSite}
            </Link>
            <SignOutButton label={d.account.signOut} />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-6 py-8 sm:py-12 space-y-8">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
          {d.account.title}
        </h1>

        {nothing ? (
          <p className="text-slate-500">{d.account.nothingYet}</p>
        ) : null}

        {page.startup ? (
          <>
            <StartupProfile startup={page.startup.startup} />
            <Panel title={d.account.startupMatches}>
              <p className="text-sm text-slate-500 mb-5">
                {d.account.introNote}
              </p>
              {page.startup.matches.length === 0 ? (
                <p className="text-slate-500">{d.account.noMatches}</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {page.startup.matches.map((match) => (
                    <MentorMatchCard key={match.mentor.id} match={match} />
                  ))}
                </div>
              )}
            </Panel>
          </>
        ) : null}

        {page.mentor ? (
          <>
            <MentorProfile mentor={page.mentor.mentor} />
            <Panel title={d.account.mentorMatches}>
              <p className="text-sm text-slate-500 mb-5">
                {d.account.introNote}
              </p>
              {page.mentor.startups.length === 0 ? (
                <p className="text-slate-500">{d.account.noMatches}</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {page.mentor.startups.map((startup) => (
                    <StartupMatchCard key={startup.id} startup={startup} />
                  ))}
                </div>
              )}
            </Panel>
          </>
        ) : null}
      </main>
    </div>
  );
}
