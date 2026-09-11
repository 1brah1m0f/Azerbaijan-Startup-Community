/**
 * Canonical option values used by the forms, the API payloads and the
 * `/data` files. These are the enums that make the submissions usable for
 * matchmaking — keep them in sync with the labels in `locales/*.ts`.
 */

export const STAGES = ["Idea", "Pre-seed", "Seed", "Growth"] as const;
export type Stage = (typeof STAGES)[number];

export const SECTORS = [
  "FinTech",
  "AI",
  "EdTech",
  "SaaS",
  "E-commerce",
  "HealthTech",
  "Marketplace",
  "Logistics",
  "GreenTech",
  "Media",
  "Other",
] as const;
export type Sector = (typeof SECTORS)[number];

/** What a startup is looking for right now. */
export const NEEDS = [
  "Mentor",
  "Co-founder",
  "Technical Talent",
  "Customer",
  "Pilot",
  "Investment",
  "Networking",
] as const;
export type Need = (typeof NEEDS)[number];

export const EXPERTISE = [
  "Business",
  "Technology",
  "Product",
  "Sales",
  "Marketing",
  "Finance",
  "Legal",
  "Investment",
  "Other",
] as const;
export type Expertise = (typeof EXPERTISE)[number];

export const AVAILABILITY = ["1-2", "3-5", "5+"] as const;
export type Availability = (typeof AVAILABILITY)[number];

export const TOPICS = ["partnership", "sponsorship", "media", "other"] as const;
export type Topic = (typeof TOPICS)[number];

/** Placeholder for data the client has not confirmed yet. */
export const TODO = "TODO" as const;
export type Todo = typeof TODO;

export const MAX_DESCRIPTION = 300;
