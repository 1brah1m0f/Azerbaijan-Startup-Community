"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
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

function persist(lang: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* storage unavailable — the choice just won't persist */
  }
}

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

  const setLang = useCallback((next: Lang) => {
    setLangState((current) => {
      if (current === next) return current;
      persist(next);
      return next;
    });
  }, []);

  // A fade is in flight; a second click must not start another one.
  const fading = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach((id) => window.clearTimeout(id));
    },
    [],
  );

  const toggleLang = useCallback(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      // Flip off the current value rather than one captured 220ms ago.
      setLangState((current) => {
        const next: Lang = current === "az" ? "en" : "az";
        persist(next);
        return next;
      });
      return;
    }

    if (fading.current) return;
    fading.current = true;

    const body = document.body;
    body.style.transition = `opacity ${FADE_MS}ms ease`;
    body.style.opacity = "0";

    timers.current.push(
      window.setTimeout(() => {
        setLangState((current) => {
          const next: Lang = current === "az" ? "en" : "az";
          persist(next);
          return next;
        });
        body.style.opacity = "1";

        timers.current.push(
          window.setTimeout(() => {
            body.style.transition = "";
            body.style.opacity = "";
            fading.current = false;
          }, FADE_MS + 10),
        );
      }, FADE_MS),
    );
  }, []);

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
