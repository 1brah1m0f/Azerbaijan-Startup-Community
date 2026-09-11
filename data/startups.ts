import { TODO } from "@/lib/options";
import type { Startup } from "./types";

/**
 * ASC Startup Network.
 *
 * To add a startup: copy one entry, drop its logo into `/public/logos/`, and
 * point `logo` at that path (or set it to `null` to show the name as text).
 *
 * `sector`, `stage` and `lookingFor` are set to TODO where ASC has not
 * confirmed the value yet. Replace TODO with a value from `lib/options.ts`:
 *   sector      FinTech | AI | EdTech | SaaS | E-commerce | HealthTech |
 *               Marketplace | Logistics | GreenTech | Media | Other
 *   stage       Idea | Pre-seed | Seed | Growth
 *   lookingFor  an array of: Mentor | Co-founder | Technical Talent |
 *               Customer | Pilot | Investment | Networking
 * Entries still marked TODO are simply hidden from the filters.
 */
export const startups: readonly Startup[] = [
  {
    name: "NUS Gallery",
    logo: "/logos/fixed_logos/nusgallery.png",
    logoHeight: "h-12",
    website: "https://nus.gallery/",
    sector: TODO,
    stage: TODO,
    lookingFor: TODO,
  },
  {
    name: "Bucard",
    logo: "/logos/fixed_logos/buvard.png",
    logoHeight: "h-9",
    website: "https://bucard.az/",
    sector: TODO,
    stage: TODO,
    lookingFor: TODO,
  },
  {
    name: "FlouMe",
    logo: "/logos/fixed_logos/floume.png",
    logoHeight: "h-11",
    website: "https://floume.ai/",
    sector: TODO,
    stage: TODO,
    lookingFor: TODO,
  },
  {
    name: "UWORK",
    logo: null,
    website: "http://uwork.az/",
    sector: TODO,
    stage: TODO,
    lookingFor: TODO,
  },
  {
    name: "Luhive",
    logo: "/logos/fixed_logos/luhive.png",
    logoHeight: "h-10",
    website: "https://luhive.com/",
    sector: TODO,
    stage: TODO,
    lookingFor: TODO,
  },
  {
    name: "coffeein",
    logo: "/logos/fixed_logos/coffeinnlogo.png",
    logoHeight: "h-9",
    website: "https://coffeein.az/",
    sector: TODO,
    stage: TODO,
    lookingFor: TODO,
  },
  {
    name: "Vexxon",
    logo: "/logos/vexxon.png",
    logoHeight: "h-10",
    website: "https://www.vexonsolution.com/",
    sector: TODO,
    stage: TODO,
    lookingFor: TODO,
  },
  {
    name: "TALAB",
    logo: "/logos/talab.png",
    logoHeight: "h-10",
    website: "https://talabapp.co.uk/",
    sector: TODO,
    stage: TODO,
    lookingFor: TODO,
  },
  {
    name: "Tələbə 360",
    logo: "/logos/telebe360.png",
    logoHeight: "h-12",
    website: "https://www.telebe360.com/",
    sector: TODO,
    stage: TODO,
    lookingFor: TODO,
  },
  {
    name: "Arivio",
    logo: "/logos/arivio.png",
    logoHeight: "h-10",
    website: "https://arivio.ai/",
    sector: TODO,
    stage: TODO,
    lookingFor: TODO,
  },
  {
    name: "Nexed",
    logo: "/logos/nexed-light.png",
    logoHeight: "h-10",
    website: "https://nexed.az/",
    sector: TODO,
    stage: TODO,
    lookingFor: TODO,
  },
  {
    name: "Insyde",
    logo: "/logos/insyde-light.png",
    logoHeight: "h-12",
    website: "https://insyde.info/",
    sector: TODO,
    stage: TODO,
    lookingFor: TODO,
  },
  {
    name: "Bonfi",
    logo: "/logos/bonfi.png",
    logoHeight: "h-10",
    website: "https://www.bonfi.az/az",
    sector: TODO,
    stage: TODO,
    lookingFor: TODO,
  },
];
