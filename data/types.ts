import type { Need, Sector, Stage, Todo } from "@/lib/options";

/** A startup listed in the ASC Startup Network. */
export type Startup = {
  /** Display name. Used as the card title and as the logo's alt text. */
  name: string;
  /** Path under /public, or null to show the name as a wordmark instead. */
  logo: string | null;
  /** Tailwind height class controlling how large the logo renders. */
  logoHeight?: string;
  website: string;
  /** Set to a value from SECTORS once confirmed. */
  sector: Sector | Todo;
  /** Set to a value from STAGES once confirmed. */
  stage: Stage | Todo;
  /** Set to values from NEEDS once confirmed. */
  lookingFor: readonly Need[] | Todo;
};

/** A mentor listed in the ASC Mentor Network. */
export type Mentor = {
  name: string;
  /** Path under /public. Falls back to initials when null. */
  photo: string | null;
  /** Short role line, e.g. "Growth & Sales". */
  role: string;
  expertise: readonly string[];
  industries: readonly string[];
  /** Stage range the mentor supports, e.g. "Idea → Seed". */
  supports: string;
};

export type Partner = {
  name: string;
  logo: string;
  website: string;
  /** Alt text for the logo. */
  alt: string;
};

export type TeamMember = {
  name: string;
  role: string;
  org: string;
  photo: string;
  /** Key into `dictionary.team.bios`. */
  bioKey: "shamsi" | "fehruz" | "mehin";
  /** Tailwind gradient used for the hover overlay. */
  overlay: string;
};
