"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LANG,
  getDictionary,
  type Dictionary,
  type Lang,
} from "@/locales";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  d: Dictionary;
};

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "asc-lang";
/** Matches the reference site's cross-fade when the language changes. */
const FADE_MS = 220;

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  // Restore the visitor's choice after hydration, so the server and the first
  // client render always agree on the default language.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (stored === "az" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback(
    (next: Lang) => {
      setLangState((current) => {
        if (current === next) return current;
        try {
          window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
          /* storage unavailable — the choice just won't persist */
        }
        return next;
      });
    },
    [],
  );

  const toggleLang = useCallback(() => {
    const next: Lang = lang === "az" ? "en" : "az";
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setLang(next);
      return;
    }

    const body = document.body;
    body.style.transition = `opacity ${FADE_MS}ms ease`;
    body.style.opacity = "0";
    window.setTimeout(() => {
      setLang(next);
      body.style.opacity = "1";
      window.setTimeout(() => {
        body.style.transition = "";
        body.style.opacity = "";
      }, FADE_MS + 10);
    }, FADE_MS);
  }, [lang, setLang]);

  return (
    <LangContext.Provider
      value={{ lang, setLang, toggleLang, d: getDictionary(lang) }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) throw new Error("useLang must be used inside <LangProvider>");
  return context;
}
