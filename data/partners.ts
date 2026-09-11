import type { Partner } from "./types";

/**
 * Partner organisations. Logos live in `/public/logos/`.
 */
export const partners: readonly Partner[] = [
  {
    name: "Holberton",
    logo: "/logos/fixed_logos/holbertonazerbaijan.png",
    website: "https://holbertonschool.az/",
    alt: "Holberton School Azerbaijan",
  },
  {
    name: "Peerstack",
    logo: "/logos/peerstack.png",
    website: "https://peerstack.tech/",
    alt: "Peerstack Academy",
  },
  {
    name: "Devlab",
    logo: "/logos/devlab.png",
    website: "https://devlab.llc/",
    alt: "Devlab Talent",
  },
  {
    name: "Casting AZ",
    logo: "/logos/fixed_logos/castingazerbaijan.png",
    website: "https://casting.az/",
    alt: "Casting Azerbaijan",
  },
];
