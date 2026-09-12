"use client";

import { useRef } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ChevronDown } from "@/components/ui/Icons";
import { useHeroParallax, useParticles } from "@/hooks/useMotion";

export function Hero() {
  const { d } = useLang();
  const particlesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useParticles(particlesRef);
  // The hero is already on screen at load, so it plays its own entrance
  // instead of waiting on the scroll-triggered reveal, and eases back as the
  // visitor scrolls into the first section rather than just vanishing.
  useHeroParallax(contentRef);

  return (
    <main
      id="hero"
      className="relative z-10 pt-28 pb-12 sm:pt-36 md:pt-40 lg:pt-48 lg:pb-24 overflow-hidden"
    >
      <div
        ref={particlesRef}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      />

      <div
        ref={contentRef}
        className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10"
      >
        <div className="flex flex-col items-center text-center">
          <h1
            className="enter font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 mb-6 leading-tight"
            style={{ "--enter": 0 } as React.CSSProperties}
          >
            {d.hero.titleLead}{" "}
            <span className="text-gradient">{d.hero.titleAccent}</span>
          </h1>

          <p
            className="enter text-lg sm:text-xl md:text-2xl text-slate-600 max-w-3xl mb-10 sm:mb-12 leading-relaxed px-2"
            style={{ "--enter": 1 } as React.CSSProperties}
          >
            {d.hero.sub}
          </p>

          <div
            className="enter flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-2 sm:px-0"
            style={{ "--enter": 2 } as React.CSSProperties}
          >
            <Button variant="heroPrimary" to="#join-startup">
              <span className="relative flex items-center justify-center gap-2">
                <span>{d.hero.ctaStartup}</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>

            <Button variant="heroSecondary" to="#join-mentor">
              <span className="flex items-center justify-center gap-2">
                <span>{d.hero.ctaMentor}</span>
                <ChevronDown className="w-5 h-5 animate-bounce-soft" />
              </span>
            </Button>
          </div>

          <p
            className="enter mt-6 text-sm sm:text-base italic text-slate-500"
            style={{ "--enter": 3 } as React.CSSProperties}
          >
            {d.hero.note}
          </p>
        </div>
      </div>
    </main>
  );
}
