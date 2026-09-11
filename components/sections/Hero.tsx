"use client";

import { useRef } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ChevronDown } from "@/components/ui/Icons";
import { useParticles } from "@/hooks/useMotion";

export function Hero() {
  const { d } = useLang();
  const particlesRef = useRef<HTMLDivElement>(null);
  useParticles(particlesRef);

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

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="reveal font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            {d.hero.titleLead}{" "}
            <span className="text-gradient">{d.hero.titleAccent}</span>
          </h1>

          <p className="reveal reveal-delay-1 text-lg sm:text-xl md:text-2xl text-slate-600 max-w-3xl mb-10 sm:mb-12 leading-relaxed px-2">
            {d.hero.sub}
          </p>

          <div className="reveal reveal-delay-2 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-2 sm:px-0">
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

          <p className="reveal reveal-delay-3 mt-6 text-sm sm:text-base italic text-slate-500">
            {d.hero.note}
          </p>
        </div>
      </div>
    </main>
  );
}
