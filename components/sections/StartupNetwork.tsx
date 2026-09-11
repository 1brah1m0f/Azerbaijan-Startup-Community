"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { Tag } from "@/components/ui/ChipGroup";
import { ArrowRight, ExternalLink } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { startups } from "@/data/startups";
import type { Startup } from "@/data/types";
import { cn } from "@/lib/cn";
import { TODO, type Need, type Sector, type Stage } from "@/lib/options";
import { scrollToId } from "@/lib/scroll";

/** Collects the values a filter can offer, ignoring entries still marked TODO. */
function uniqueValues<T extends string>(values: (T | typeof TODO)[]): T[] {
  return Array.from(new Set(values.filter((v): v is T => v !== TODO)));
}

function StartupCard({ startup }: { startup: Startup }) {
  const { d } = useLang();
  const needs =
    startup.lookingFor === TODO ? [] : (startup.lookingFor as readonly Need[]);

  return (
    <div className="glass-card rounded-3xl p-6 flex flex-col gap-4 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group reveal">
      <div className="logo-pill h-12 flex items-center">
        {startup.logo ? (
          <Image
            src={startup.logo}
            alt={startup.name}
            width={200}
            height={60}
            className={cn("w-auto object-contain", startup.logoHeight ?? "h-10")}
          />
        ) : (
          <span className="text-2xl font-extrabold tracking-tight text-slate-800">
            {startup.name}
          </span>
        )}
      </div>

      <div>
        <h3 className="font-heading text-xl font-bold text-slate-900">
          {startup.name}
        </h3>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <Tag tone="teal">
            {startup.sector === TODO ? d.startups.todo : startup.sector}
          </Tag>
          <Tag tone="blue">
            {d.startups.labelStage}:{" "}
            {startup.stage === TODO ? d.startups.todo : startup.stage}
          </Tag>
        </div>
      </div>

      <div className="mt-auto">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          {d.startups.labelLooking}
        </p>
        <div className="flex flex-wrap gap-2">
          {needs.length > 0 ? (
            needs.map((need) => <Tag key={need}>{need}</Tag>)
          ) : (
            <Tag>{d.startups.todo}</Tag>
          )}
        </div>
      </div>

      <a
        href={startup.website}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:text-brand-cyan transition-colors text-sm"
      >
        <span>{d.startups.website}</span>
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}

function FilterRow<T extends string>({
  label,
  options,
  value,
  onChange,
  allLabel,
}: {
  label: string;
  options: readonly T[];
  value: T | null;
  onChange: (next: T | null) => void;
  allLabel: string;
}) {
  if (options.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
        {label}
      </span>
      <button
        type="button"
        onClick={() => onChange(null)}
        aria-pressed={value === null}
        className={cn(
          "px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200",
          value === null
            ? "chip-active"
            : "bg-white/60 border-slate-200 text-slate-600 hover:border-brand-cyan hover:text-brand-teal",
        )}
      >
        {allLabel}
      </button>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(value === option ? null : option)}
          aria-pressed={value === option}
          className={cn(
            "px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200",
            value === option
              ? "chip-active"
              : "bg-white/60 border-slate-200 text-slate-600 hover:border-brand-cyan hover:text-brand-teal",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export function StartupNetwork() {
  const { d } = useLang();
  const [stage, setStage] = useState<Stage | null>(null);
  const [sector, setSector] = useState<Sector | null>(null);
  const [need, setNeed] = useState<Need | null>(null);

  const stageOptions = useMemo(
    () => uniqueValues(startups.map((s) => s.stage)),
    [],
  );
  const sectorOptions = useMemo(
    () => uniqueValues(startups.map((s) => s.sector)),
    [],
  );
  const needOptions = useMemo(
    () =>
      uniqueValues(
        startups.flatMap((s) =>
          s.lookingFor === TODO ? [] : [...(s.lookingFor as readonly Need[])],
        ),
      ),
    [],
  );

  const hasFilters =
    stageOptions.length > 0 || sectorOptions.length > 0 || needOptions.length > 0;

  const visible = useMemo(
    () =>
      startups.filter((startup) => {
        if (stage && startup.stage !== stage) return false;
        if (sector && startup.sector !== sector) return false;
        if (need) {
          if (startup.lookingFor === TODO) return false;
          if (!(startup.lookingFor as readonly Need[]).includes(need))
            return false;
        }
        return true;
      }),
    [stage, sector, need],
  );

  return (
    <section
      id="startups"
      className="relative z-10 py-16 md:py-24 bg-white/60 backdrop-blur-sm border-y border-white/30"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeading
          eyebrow={d.startups.eyebrow}
          title={d.startups.title}
          sub={d.startups.sub}
        />

        {hasFilters ? (
          <div className="flex flex-col gap-3 mb-10 reveal">
            <FilterRow
              label={d.startups.filterStage}
              options={stageOptions}
              value={stage}
              onChange={setStage}
              allLabel={d.startups.filterAll}
            />
            <FilterRow
              label={d.startups.filterSector}
              options={sectorOptions}
              value={sector}
              onChange={setSector}
              allLabel={d.startups.filterAll}
            />
            <FilterRow
              label={d.startups.filterLooking}
              options={needOptions}
              value={need}
              onChange={setNeed}
              allLabel={d.startups.filterAll}
            />
          </div>
        ) : null}

        {visible.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {visible.map((startup) => (
              <StartupCard key={startup.name} startup={startup} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 py-10">{d.startups.empty}</p>
        )}

        <div className="text-center mt-12 md:mt-16 reveal">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-slate-900 mb-5">
            {d.startups.bottomTitle}
          </h3>
          <a
            href="#join-startup"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-brand-blue border-2 border-brand-blue/20 hover:border-brand-cyan hover:text-brand-teal transition-all duration-300 bg-white/60 backdrop-blur-sm"
            onClick={(event) => {
              event.preventDefault();
              scrollToId("join-startup");
            }}
          >
            <span>{d.startups.cta}</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
