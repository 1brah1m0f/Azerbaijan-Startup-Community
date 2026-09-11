import type { TeamMember } from "./types";

/**
 * ASC core team.
 *
 * Bios are translated, so each member points at a key in
 * `dictionary.team.bios` rather than carrying its text here. To add a member,
 * add the bio to both `locales/az.ts` and `locales/en.ts` first, then widen
 * the `bioKey` union in `data/types.ts`.
 */
export const team: readonly TeamMember[] = [
  {
    name: "Shamsi Bayramzadeh",
    role: "Managing Partner",
    org: "CEO, Holberton School Azerbaijan",
    photo: "/logos/fixed_logos/1769061902323.png",
    bioKey: "shamsi",
    overlay: "from-brand-blue/70",
  },
  {
    name: "Fehruz Jabrayilov",
    role: "Founder & Community Leader",
    org: "Azerbaijan Startup Community",
    photo: "/logos/fixed_logos/1721919816220.jpg",
    bioKey: "fehruz",
    overlay: "from-brand-teal/70",
  },
  {
    name: "Mehin Mustafazadeh",
    role: "Community Head",
    org: "Azerbaijan Startup Community",
    photo: "/logos/fixed_logos/1777623008804.png",
    bioKey: "mehin",
    overlay: "from-brand-violet/70",
  },
];

/** Decorative community photo used in the team / final CTA sections. */
export const communityPhoto = "/logos/fixed_logos/1778662388448.jpg";
