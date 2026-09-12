"use client";

import Image from "next/image";
import { useLang } from "@/components/providers/LangProvider";
import { Button } from "@/components/ui/Button";
import { ArrowLongRight } from "@/components/ui/Icons";
import { communityPhoto } from "@/data/team";

export function FinalCta() {
  const { d } = useLang();

  return (
    <section id="join" className="relative z-10 py-16 md:py-20 lg:py-28 overflow-hidden">
      <Image
        src={communityPhoto}
        alt="Azerbaijan Startup Community"
        fill
        sizes="100vw"
        className="object-cover z-0"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 via-brand-teal/80 to-brand-cyan/80 z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-brand-violet/30 rounded-full filter blur-[80px] animate-blob z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-10 md:mb-14 reveal drop-shadow-lg">
          {d.finalCta.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-5 md:gap-8">
          <div className="reveal reveal-left rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 sm:p-8 text-center flex flex-col">
            <h3 className="font-heading text-2xl font-bold text-white mb-3">
              {d.finalCta.startup.title}
            </h3>
            <p className="text-white/90 mb-7 drop-shadow">
              {d.finalCta.startup.text}
            </p>
            <div className="mt-auto">
              <Button variant="white" to="#join-startup">
                <span>{d.finalCta.startup.cta}</span>
                <ArrowLongRight className="w-5 h-5 animate-pulse-slow" />
              </Button>
            </div>
          </div>

          <div className="reveal reveal-right rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 sm:p-8 text-center flex flex-col">
            <h3 className="font-heading text-2xl font-bold text-white mb-3">
              {d.finalCta.mentor.title}
            </h3>
            <p className="text-white/90 mb-7 drop-shadow">
              {d.finalCta.mentor.text}
            </p>
            <div className="mt-auto">
              <Button variant="whiteOutline" to="#join-mentor">
                <span>{d.finalCta.mentor.cta}</span>
                <ArrowLongRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
