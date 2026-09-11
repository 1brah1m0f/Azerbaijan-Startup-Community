import type { Expertise, Need } from "./options";
import type { MentorRecord, StartupRecord } from "./records";

/**
 * Suggests which mentors fit a startup, and says why.
 *
 * The score is only there to order the list. What the reviewer acts on is the
 * list of signals underneath it: every match spells out what lined up and what
 * did not, so the decision stays with a person.
 *
 * A pure function on purpose — it takes rows and returns rows, touching no
 * database and no request, so its behaviour can be checked in isolation.
 */

/**
 * Which mentor expertise answers which startup need.
 *
 * The two lists are different enums on purpose: a founder says what they are
 * missing, a mentor says what they know. The bridge between them is written
 * out here rather than inferred, so it can be argued with and corrected.
 *
 * "Mentor" is the exception — it is a general ask, so any expertise answers it.
 */
const NEED_TO_EXPERTISE: Record<Need, readonly Expertise[]> = {
  Mentor: [],
  "Co-founder": ["Business", "Technology", "Product"],
  "Technical Talent": ["Technology", "Product"],
  Customer: ["Sales", "Marketing"],
  Pilot: ["Business", "Sales"],
  Investment: ["Investment", "Finance"],
  Networking: ["Business", "Investment"],
};

/** Hours per month, ranked for tie-breaking only. Never part of the score. */
const AVAILABILITY_RANK: Record<string, number> = {
  "1-2": 1,
  "3-5": 2,
  "5+": 3,
};

/**
 * `unknown` means the submission did not carry enough to judge the signal. It
 * is left out of the score entirely rather than counted as a miss, so a founder
 * who skipped an optional field is not pushed down the list for it.
 */
export type SignalState = "matched" | "missed" | "unknown";

export type Signal = {
  label: string;
  state: SignalState;
};

export type MentorMatch = {
  mentor: MentorRecord;
  score: number;
  signals: Signal[];
  /** Only ever used to break ties — see `rankMentors`. */
  sectorConfirmed: boolean;
};

const WEIGHT = { stage: 3, needs: 4, sector: 1 };

function coversNeed(need: string, expertise: string[]): boolean {
  const wanted = NEED_TO_EXPERTISE[need as Need];
  if (!wanted) return false;
  // A general ask for a mentor is answered by anyone who listed expertise.
  if (wanted.length === 0) return expertise.length > 0;
  return wanted.some((item) => expertise.includes(item));
}

/** Free-text industries, so this can only ever confirm — never rule out. */
function mentionsSector(sector: string | null, industries: string): boolean {
  if (!sector || !industries.trim()) return false;
  return industries.toLowerCase().includes(sector.toLowerCase());
}

function listNeeds(needs: string[]): string {
  return needs.join(", ");
}

export function matchMentor(
  startup: StartupRecord,
  mentor: MentorRecord,
): MentorMatch {
  const signals: Signal[] = [];
  let earned = 0;
  let available = 0;

  // Stage — both sides are required fields, so this is always judgeable.
  const stageCovered = mentor.supports.includes(startup.stage);
  available += WEIGHT.stage;
  if (stageCovered) earned += WEIGHT.stage;
  signals.push({
    label: stageCovered
      ? `${startup.stage} mərhələsi ilə işləyir`
      : `${startup.stage} mərhələsini əhatə etmir`,
    state: stageCovered ? "matched" : "missed",
  });

  // Needs against expertise — partial overlap counts partially.
  const covered = startup.needs.filter((need) =>
    coversNeed(need, mentor.expertise),
  );
  const share = startup.needs.length
    ? covered.length / startup.needs.length
    : 0;
  available += WEIGHT.needs;
  earned += WEIGHT.needs * share;
  signals.push({
    label: covered.length
      ? `${listNeeds(covered)} üzrə təcrübəsi var`
      : "Axtarılan dəstək sahələri ilə üst-üstə düşmür",
    state: covered.length ? "matched" : "missed",
  });

  // Sector is free text on the mentor's side, so a miss proves nothing. It is
  // counted only when it confirms, which makes it a bonus and never a penalty.
  const sectorConfirmed = mentionsSector(startup.sector, mentor.industries);
  if (sectorConfirmed) {
    available += WEIGHT.sector;
    earned += WEIGHT.sector;
    signals.push({
      label: `${startup.sector} sektorunda təcrübəsi qeyd olunub`,
      state: "matched",
    });
  } else {
    signals.push({
      label: startup.sector
        ? "Sektor təsdiqlənmədi"
        : "Startup sektorunu göstərməyib",
      state: "unknown",
    });
  }

  return {
    mentor,
    score: available ? Math.round((earned / available) * 100) : 0,
    signals,
    sectorConfirmed,
  };
}

/**
 * Ranks every mentor against one startup, best first.
 *
 * Two mentors can both reach 100% when one of them simply had less to prove,
 * so equal scores fall back to the confirmed sector, then to whoever offered
 * more hours, then to the earlier submission — which keeps the order stable
 * between page loads.
 */
export function rankMentors(
  startup: StartupRecord,
  mentors: MentorRecord[],
): MentorMatch[] {
  return mentors
    .map((mentor) => matchMentor(startup, mentor))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;

      if (a.sectorConfirmed !== b.sectorConfirmed) {
        return a.sectorConfirmed ? -1 : 1;
      }

      const hours =
        (AVAILABILITY_RANK[b.mentor.availability] ?? 0) -
        (AVAILABILITY_RANK[a.mentor.availability] ?? 0);
      if (hours !== 0) return hours;

      return a.mentor.receivedAt.localeCompare(b.mentor.receivedAt);
    });
}
