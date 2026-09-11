"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { useModal } from "@/components/providers/ModalProvider";
import { Button } from "@/components/ui/Button";
import { Close, Menu } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { scrollToId } from "@/lib/scroll";

const NAV_ITEMS = [
  { id: "startups", key: "startups" },
  { id: "mentors", key: "mentors" },
  { id: "opportunities", key: "opportunities" },
  { id: "about", key: "about" },
] as const;

export function Header() {
  const { d, lang, toggleLang } = useLang();
  const { openLogin } = useModal();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = () => query.matches && setMenuOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  const underline =
    "hover:text-brand-teal transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-brand-teal after:to-brand-cyan hover:after:w-full after:transition-all";

  return (
    <nav className="fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="glass rounded-2xl flex items-center justify-between px-4 sm:px-6 py-3">
          <a
            href="#hero"
            className="group shrink-0"
            onClick={(event) => {
              event.preventDefault();
              go("hero");
            }}
          >
            <Image
              src="/logos/asc-logo-tight.png"
              alt="Azerbaijan Startup Community"
              width={168}
              height={82}
              priority
              className="h-12 sm:h-16 lg:h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </a>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden lg:flex gap-5 xl:gap-8 font-medium text-slate-600">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={underline}
                  onClick={(event) => {
                    event.preventDefault();
                    go(item.id);
                  }}
                >
                  {d.nav[item.key]}
                </a>
              ))}
              <button
                type="button"
                className={cn(underline, "font-medium")}
                onClick={() => openLogin("startup")}
              >
                {d.nav.login}
              </button>
            </div>

            <button
              type="button"
              onClick={toggleLang}
              className="lang-btn flex items-center gap-1 text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:border-brand-cyan shrink-0"
              title={d.nav.switchLang}
              aria-label={d.nav.switchLang}
            >
              <span className={lang === "az" ? "" : "opacity-40"}>AZ</span>
              <span className="opacity-40">/</span>
              <span className={lang === "en" ? "" : "opacity-40"}>EN</span>
            </button>

            <Button
              variant="gradient"
              to="#join-startup"
              className="hidden lg:inline-flex"
            >
              {d.nav.joinStartup}
            </Button>
            <Button
              variant="outline"
              to="#join-mentor"
              className="hidden lg:inline-flex"
            >
              {d.nav.joinMentor}
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
              aria-label={d.nav.menu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? (
                <Close className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div id="mobile-menu" className="lg:hidden mt-2" hidden={!menuOpen}>
          <div className="glass rounded-2xl p-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-4 py-3 rounded-xl font-medium text-slate-700 hover:bg-white/70 hover:text-brand-teal transition-colors"
                onClick={(event) => {
                  event.preventDefault();
                  go(item.id);
                }}
              >
                {d.nav[item.key]}
              </a>
            ))}
            <button
              type="button"
              className="px-4 py-3 rounded-xl font-medium text-slate-700 text-left hover:bg-white/70 hover:text-brand-teal transition-colors"
              onClick={() => {
                setMenuOpen(false);
                openLogin("startup");
              }}
            >
              {d.nav.login}
            </button>

            <button
              type="button"
              className="mt-2 px-4 py-3 rounded-xl font-semibold text-white text-center bg-gradient-to-r from-brand-violet via-brand-cyan to-brand-teal"
              onClick={() => go("join-startup")}
            >
              {d.nav.joinStartup}
            </button>
            <button
              type="button"
              className="mt-1 px-4 py-3 rounded-xl font-semibold text-brand-blue text-center border-2 border-brand-blue/20"
              onClick={() => go("join-mentor")}
            >
              {d.nav.joinMentor}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
