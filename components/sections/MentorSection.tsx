"use client";

import Image from "next/image";
import { useLang } from "@/components/providers/LangProvider";
import { Tag } from "@/components/ui/ChipGroup";
import { ArrowRight, Check } from "@/components/ui/Icons";
import { mentors } from "@/data/mentors";
import type { Mentor } from "@/data/types";
import { scrollToId } from "@/lib/scroll";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function MentorCard({
  mentor,
  onDark = false,
}: {
  mentor: Mentor;
  onDark?: boolean;
}) {
  const { d } = useLang();

  return (
    <div
      className={
        onDark
          ? "rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 p-5 text-white"
          : "glass-card rounded-3xl p-6 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300"
      }
    >
      <div className="flex items-center gap-4 mb-4">
        {mentor.photo ? (
          <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 bg-slate-100">
            <Image
              src={mentor.photo}
              alt={mentor.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
        ) : (
          <div
            className="w-14 h-14 rounded-full shrink-0 bg-gradient-to-br from-brand-cyan to-brand-teal flex items-center justify-center text-white font-bold text-lg"
            aria-hidden="true"
          >
            {initials(mentor.name)}
          </div>
        )}
        <div className="min-w-0">
          <h4
            className={`font-heading text-lg font-bold truncate ${onDark ? "text-white" : "text-slate-900"}`}
          >
            {mentor.name}
          </h4>
          <p
            className={`text-sm font-semibold ${onDark ? "text-white/80" : "text-brand-teal"}`}
          >
            {mentor.role}
          </p>
        </div>
      </div>

      <dl className="space-y-2.5 text-sm">
        <div>
          <dt
            className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${onDark ? "text-white/60" : "text-slate-400"}`}
          >
            {d.mentors.labelExpertise}
          </dt>
          <dd
            className={`font-medium ${onDark ? "text-white/90" : "text-slate-600"}`}
          >
            {mentor.expertise.join(" · ")}
          </dd>
        </div>
        <div>
          <dt
            className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${onDark ? "text-white/60" : "text-slate-400"}`}
          >
            {d.mentors.labelIndustries}
          </dt>
          <dd
            className={`font-medium ${onDark ? "text-white/90" : "text-slate-600"}`}
          >
            {mentor.industries.join(" · ")}
          </dd>
        </div>
        <div>
          <dt
            className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${onDark ? "text-white/60" : "text-slate-400"}`}
          >
            {d.mentors.labelSupports}
          </dt>
          <dd>
            {onDark ? (
              <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold text-white">
                {mentor.supports}
              </span>
            ) : (
              <Tag tone="blue">{mentor.supports}</Tag>
            )}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export function MentorSection() {
  const { d } = useLang();
  const sample = mentors[0];

  return (
    <section id="mentors" className="relative z-10 py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left — the pitch */}
          <div className="reveal reveal-left">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {d.mentors.title}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {d.mentors.paragraph}
            </p>

            <p className="font-semibold text-slate-900 mb-4">
              {d.mentors.listTitle}
            </p>
            <ul className="space-y-3 mb-8 text-slate-700">
              {d.mentors.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <a
              href="#join-mentor"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white shadow-lg hover:shadow-brand-cyan/40 transition-all duration-300 transform hover:-translate-y-0.5 relative overflow-hidden group"
              onClick={(event) => {
                event.preventDefault();
                scrollToId("join-mentor");
              }}
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-brand-violet via-brand-cyan to-brand-teal bg-[length:200%_auto] animate-gradient-x"
                aria-hidden="true"
              />
              <span className="relative flex items-center gap-2">
                {d.mentors.cta}
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <p className="mt-5 text-sm italic text-slate-500 max-w-lg">
              {d.mentors.note}
            </p>
          </div>

          {/* Right — a mentor profile shown on the brand gradient */}
          <div className="reveal reveal-right rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-violet to-brand-cyan animate-gradient-x bg-[length:200%_200%]"
              aria-hidden="true"
            />
            <div
              className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/30 rounded-full mix-blend-screen filter blur-[50px] animate-blob"
              aria-hidden="true"
            />
            <div className="relative z-10">
              <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white mb-5">
                {d.mentors.sampleBadge}
              </span>
              {sample ? <MentorCard mentor={sample} onDark /> : null}
            </div>
          </div>
        </div>

        {/* Mentor network */}
        <div className="mt-16 md:mt-24">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12 reveal">
            <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {d.mentors.networkTitle}
            </h3>
            <p className="text-slate-600">{d.mentors.networkSub}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {mentors.map((mentor) => (
              <div key={`${mentor.name}-${mentor.role}`} className="reveal">
                <MentorCard mentor={mentor} />
              </div>
            ))}
          </div>

          <div className="text-center mt-10 md:mt-12 reveal">
            <a
              href="#join-mentor"
              className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:text-brand-cyan transition-colors text-lg"
              onClick={(event) => {
                event.preventDefault();
                scrollToId("join-mentor");
              }}
            >
              <span>{d.mentors.networkCta}</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
