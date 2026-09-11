import type { Mentor } from "./types";

/**
 * ASC Mentor Network.
 *
 * These are placeholder cards so the section has shape — replace them with
 * real mentors as they join. Put photos in `/public/mentors/` and set
 * `photo` to that path; leaving it `null` renders the mentor's initials
 * inside a brand gradient avatar instead.
 */
export const mentors: readonly Mentor[] = [
  {
    name: "Ad Soyad",
    photo: null,
    role: "Growth & Sales",
    expertise: ["B2B Sales", "GTM", "Strategy"],
    industries: ["SaaS", "Retail"],
    supports: "Idea → Seed",
  },
  {
    name: "Ad Soyad",
    photo: null,
    role: "Product & Design",
    expertise: ["Product Discovery", "UX", "Roadmapping"],
    industries: ["FinTech", "Marketplace"],
    supports: "Idea → Pre-seed",
  },
  {
    name: "Ad Soyad",
    photo: null,
    role: "Engineering",
    expertise: ["Architecture", "MVP", "Hiring"],
    industries: ["SaaS", "AI"],
    supports: "Idea → Growth",
  },
  {
    name: "Ad Soyad",
    photo: null,
    role: "Finance & Investment",
    expertise: ["Fundraising", "Financial Modeling", "Due Diligence"],
    industries: ["FinTech", "E-commerce"],
    supports: "Seed → Growth",
  },
];
