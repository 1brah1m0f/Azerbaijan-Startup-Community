"use client";

import Image from "next/image";
import { useRef } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { partners } from "@/data/partners";
import { useBrandRipple } from "@/hooks/useMotion";

export function Partners() {
  const { d } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  useBrandRipple(containerRef);

  return (
    <section
      id="partners"
      className="relative z-10 py-16 bg-white/60 backdrop-blur-sm border-y border-white/30"
    >
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest reveal">
          {d.partners.title}
        </h2>
      </div>

      <div
        ref={containerRef}
        className="max-w-4xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5"
      >
        {partners.map((partner) => (
          <a
            key={partner.name}
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="partner-card brand-link group rounded-2xl glass-card h-28 sm:h-32 flex flex-col items-center justify-center gap-2 p-5 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="relative w-full h-12">
              <Image
                src={partner.logo}
                alt={partner.alt}
                fill
                sizes="(max-width: 640px) 40vw, 200px"
                className="object-contain opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
              {partner.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
