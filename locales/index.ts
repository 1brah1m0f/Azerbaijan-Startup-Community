import { az, type Dictionary } from "./az";
import { en } from "./en";

export type Lang = "az" | "en";

export const LANGS: readonly Lang[] = ["az", "en"] as const;
export const DEFAULT_LANG: Lang = "az";

export const dictionaries: Record<Lang, Dictionary> = { az, en };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang] ?? dictionaries[DEFAULT_LANG];
}

export type { Dictionary };
