"use client";

import Image from "next/image";
import { useLang } from "@/components/providers/LangProvider";
import { Instagram, LinkedIn } from "@/components/ui/Icons";
import { scrollToId } from "@/lib/scroll";

const LINKS = [
  { id: "about", key: "about" },
  { id: "opportunities", key: "opportunities" },
  { id: "startups", key: "startups" },
  { id: "mentors", key: "mentors" },
  { id: "apply", key: "contact" },
] as const;

export function Footer() {
  const { d } = useLang();

  return (
    <footer className="relative z-10 bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <a
            href="#hero"
            className="group"
            onClick={(event) => {
              event.preventDefault();
              scrollToId("hero");
            }}
          >
            <Image
              src="/logos/asc-logo-tight.png"
              alt="Azerbaijan Startup Community"
              width={168}
              height={82}
              className="h-24 sm:h-32 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </a>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 font-medium text-slate-500">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="hover:text-brand-blue transition-colors"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId(link.id);
                }}
              >
                {d.footer[link.key]}
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/azerbaijanstartupcommunity_"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-gradient-to-br hover:from-violet-500 hover:via-pink-500 hover:to-brand-cyan hover:text-white hover:scale-110 transition-all duration-300"
              aria-label={d.footer.instagram}
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/azerbaijan-start-up-community"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-brand-blue hover:text-white hover:scale-110 transition-all duration-300"
              aria-label={d.footer.linkedin}
            >
              <LinkedIn className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="text-center text-slate-400 text-sm mt-8 border-t border-slate-100 pt-8">
          <p>{d.footer.copy}</p>
        </div>
      </div>
    </footer>
  );
}
