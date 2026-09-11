import { Tag } from "@/components/ui/ChipGroup";
import { cn } from "@/lib/cn";
import { rankMentors, type Signal } from "@/lib/matching";
import type {
  BusinessRecord,
  MentorRecord,
  StartupRecord,
} from "@/lib/records";
import { LogoutButton } from "./LogoutButton";

/**
 * The panel itself. Everything here renders on the server: the rows never
 * reach the browser as data, only as the markup a reviewer reads.
 */

export type AdminTab = "startups" | "mentors" | "business";

/** Enough to choose from without turning every card into a directory. */
const TOP_MATCHES = 5;

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Baku",
});

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return dateFormat.format(date).replace(/\//g, ".");
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "bg-white rounded-2xl border border-slate-200 p-6 space-y-4",
        className,
      )}
    >
      {children}
    </article>
  );
}

function Empty({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
      <p className="font-heading text-lg font-semibold text-slate-700">
        {title}
      </p>
      <p className="text-sm text-slate-500 mt-2">{sub}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 text-sm">
      <span className="text-slate-400 shrink-0 w-28">{label}</span>
      <span className="text-slate-700 min-w-0">{value}</span>
    </div>
  );
}

function Mail({ address }: { address: string }) {
  return (
    <a
      href={`mailto:${address}`}
      className="text-brand-blue hover:text-brand-cyan transition-colors break-all"
    >
      {address}
    </a>
  );
}

/** Teal for what lined up, grey for what did not, a dash for what is unknown. */
function SignalLine({ signal }: { signal: Signal }) {
  const marker = {
    matched: "bg-brand-teal",
    missed: "border border-slate-300",
    unknown: "border border-dashed border-slate-300",
  }[signal.state];

  return (
    <li className="flex items-start gap-2.5">
      <span
        aria-hidden="true"
        className={cn("mt-1.5 h-2 w-2 rounded-full shrink-0", marker)}
      />
      <span
        className={cn(
          "text-sm",
          signal.state === "matched" ? "text-slate-700" : "text-slate-400",
        )}
      >
        {signal.label}
      </span>
    </li>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const tone =
    score >= 70
      ? "bg-brand-teal/10 text-brand-teal"
      : score >= 40
        ? "bg-brand-blue/10 text-brand-blue"
        : "bg-slate-100 text-slate-500";

  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-sm font-bold tabular-nums shrink-0",
        tone,
      )}
    >
      {score}%
    </span>
  );
}

function StartupCard({
  startup,
  mentors,
}: {
  startup: StartupRecord;
  mentors: MentorRecord[];
}) {
  const matches = rankMentors(startup, mentors).slice(0, TOP_MATCHES);

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-heading text-lg font-bold text-slate-900">
            {startup.startupName || startup.fullName}
          </h3>
          <p className="text-sm text-slate-500">
            {startup.startupName ? `${startup.fullName} · ` : ""}
            {formatDate(startup.receivedAt)}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 justify-end">
          <Tag tone="blue">{startup.stage}</Tag>
          {startup.sector ? <Tag tone="teal">{startup.sector}</Tag> : null}
        </div>
      </div>

      <div className="space-y-1.5">
        <Row label="E-poçt" value={<Mail address={startup.email} />} />
        <Row
          label="Axtarır"
          value={
            startup.needs.length ? (
              <span className="flex flex-wrap gap-1.5">
                {startup.needs.map((need) => (
                  <Tag key={need}>{need}</Tag>
                ))}
              </span>
            ) : null
          }
        />
        <Row label="Haqqında" value={startup.description} />
      </div>

      <div className="pt-4 border-t border-slate-100 space-y-4">
        <h4 className="text-sm font-semibold text-slate-700">
          Uyğun mentorlar
        </h4>

        {matches.length === 0 ? (
          <p className="text-sm text-slate-400">
            Hələ mentor müraciəti yoxdur, ona görə təklif göstərilmir.
          </p>
        ) : (
          <ul className="space-y-4">
            {matches.map((match) => (
              <li
                key={match.mentor.id}
                className="rounded-xl bg-slate-50 p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800">
                      {match.mentor.fullName}
                    </p>
                    <p className="text-sm text-slate-500">
                      {match.mentor.role || "Vəzifə göstərilməyib"}
                    </p>
                  </div>
                  <ScoreBadge score={match.score} />
                </div>

                <ul className="space-y-1.5">
                  {match.signals.map((signal) => (
                    <SignalLine key={signal.label} signal={signal} />
                  ))}
                </ul>

                <p className="text-sm">
                  <Mail address={match.mentor.email} />
                  <span className="text-slate-400">
                    {" "}
                    · ayda {match.mentor.availability} saat
                  </span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}

function MentorCard({ mentor }: { mentor: MentorRecord }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-heading text-lg font-bold text-slate-900">
            {mentor.fullName}
          </h3>
          <p className="text-sm text-slate-500">
            {mentor.role ? `${mentor.role} · ` : ""}
            {formatDate(mentor.receivedAt)}
          </p>
        </div>
        <Tag tone="teal">ayda {mentor.availability} saat</Tag>
      </div>

      <div className="space-y-1.5">
        <Row label="E-poçt" value={<Mail address={mentor.email} />} />
        <Row
          label="Ekspertiza"
          value={
            mentor.expertise.length ? (
              <span className="flex flex-wrap gap-1.5">
                {mentor.expertise.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </span>
            ) : null
          }
        />
        <Row
          label="Mərhələlər"
          value={
            mentor.supports.length ? (
              <span className="flex flex-wrap gap-1.5">
                {mentor.supports.map((item) => (
                  <Tag key={item} tone="blue">
                    {item}
                  </Tag>
                ))}
              </span>
            ) : null
          }
        />
        <Row label="Sektorlar" value={mentor.industries} />
        <Row
          label="LinkedIn"
          value={
            mentor.linkedin ? (
              <a
                href={mentor.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="text-brand-blue hover:text-brand-cyan transition-colors break-all"
              >
                {mentor.linkedin}
              </a>
            ) : null
          }
        />
      </div>
    </Card>
  );
}

function BusinessCard({ inquiry }: { inquiry: BusinessRecord }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-heading text-lg font-bold text-slate-900">
            {inquiry.company || inquiry.name}
          </h3>
          <p className="text-sm text-slate-500">
            {inquiry.company ? `${inquiry.name} · ` : ""}
            {formatDate(inquiry.receivedAt)}
          </p>
        </div>
        <Tag tone="blue">{inquiry.topic}</Tag>
      </div>

      <div className="space-y-1.5">
        <Row label="E-poçt" value={<Mail address={inquiry.email} />} />
        <Row label="Mesaj" value={inquiry.message} />
      </div>
    </Card>
  );
}

function TabLink({
  tab,
  current,
  label,
  count,
}: {
  tab: AdminTab;
  current: AdminTab;
  label: string;
  count: number;
}) {
  const active = tab === current;
  return (
    <a
      href={`/admin?tab=${tab}`}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border transition-colors",
        active
          ? "bg-brand-blue text-white border-brand-blue"
          : "bg-white text-slate-600 border-slate-200 hover:border-brand-cyan hover:text-brand-teal",
      )}
    >
      {label}
      <span className={cn("tabular-nums", active ? "text-white/70" : "text-slate-400")}>
        {count}
      </span>
    </a>
  );
}

export function AdminView({
  tab,
  startups,
  mentors,
  business,
}: {
  tab: AdminTab;
  startups: StartupRecord[];
  mentors: MentorRecord[];
  business: BusinessRecord[];
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-xl font-bold text-slate-900">
              Müraciətlər
            </h1>
            <p className="text-sm text-slate-500">
              Uyğunluq təklifdir — seçimi sən edirsən.
            </p>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav className="flex flex-wrap gap-2">
            <TabLink
              tab="startups"
              current={tab}
              label="Startaplar"
              count={startups.length}
            />
            <TabLink
              tab="mentors"
              current={tab}
              label="Mentorlar"
              count={mentors.length}
            />
            <TabLink
              tab="business"
              current={tab}
              label="Biznes"
              count={business.length}
            />
          </nav>

          <a
            href={`/api/admin/export?type=${tab}`}
            className="text-sm font-semibold text-slate-500 hover:text-brand-blue transition-colors"
          >
            CSV yüklə
          </a>
        </div>

        {tab === "startups" ? (
          startups.length ? (
            <div className="space-y-5">
              {startups.map((startup) => (
                <StartupCard
                  key={startup.id}
                  startup={startup}
                  mentors={mentors}
                />
              ))}
            </div>
          ) : (
            <Empty
              title="Hələ startup müraciəti yoxdur"
              sub="Saytdakı forma doldurulan kimi buradan görünəcək."
            />
          )
        ) : null}

        {tab === "mentors" ? (
          mentors.length ? (
            <div className="space-y-5">
              {mentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          ) : (
            <Empty
              title="Hələ mentor müraciəti yoxdur"
              sub="Mentorlar əlavə olunduqca startaplara təklif göstəriləcək."
            />
          )
        ) : null}

        {tab === "business" ? (
          business.length ? (
            <div className="space-y-5">
              {business.map((inquiry) => (
                <BusinessCard key={inquiry.id} inquiry={inquiry} />
              ))}
            </div>
          ) : (
            <Empty
              title="Hələ biznes müraciəti yoxdur"
              sub="Partnyorluq, sponsorluq və media müraciətləri burada toplanacaq."
            />
          )
        ) : null}
      </main>
    </div>
  );
}
