"use client";

import Image from "next/image";
import { useLang } from "@/components/providers/LangProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { team } from "@/data/team";

export function Team() {
  const { d } = useLang();

  return (
    <section id="about" className="relative z-10 py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <SectionHeading
          eyebrow={d.team.eyebrow}
          title={d.team.title}
          sub={d.team.sub}
          eyebrowClassName="text-brand-blue"
          className="mb-10 md:mb-12"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`group reveal reveal-delay-${Math.min(index + 1, 3)}`}
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-square bg-slate-100 shadow-lg">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
                  className="object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${member.overlay} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900">
                {member.name}
              </h3>
              <p className="text-brand-teal font-semibold text-sm mb-1">
                {member.role}
              </p>
              <p className="text-slate-500 text-xs mb-2">{member.org}</p>
              <p className="text-slate-600 leading-relaxed text-sm">
                {d.team.bios[member.bioKey]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
