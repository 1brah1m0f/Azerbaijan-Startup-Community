"use client";

import { useLang } from "@/components/providers/LangProvider";
import {
  Academic,
  Calendar,
  Chat,
  Exchange,
  Globe,
  Handshake,
} from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";

const CARDS = [
  {
    key: "mentorship",
    Icon: Academic,
    gradient: "from-brand-cyan to-brand-teal",
    shadow: "shadow-brand-cyan/30",
    hover: "hover:shadow-brand-cyan/20",
    delay: "reveal-delay-1",
  },
  {
    key: "community",
    Icon: Chat,
    gradient: "from-brand-teal to-brand-blue",
    shadow: "shadow-brand-teal/30",
    hover: "hover:shadow-brand-teal/20",
    delay: "reveal-delay-2",
  },
  {
    key: "corporate",
    Icon: Exchange,
    gradient: "from-brand-blue to-brand-violet",
    shadow: "shadow-brand-blue/30",
    hover: "hover:shadow-brand-blue/20",
    delay: "reveal-delay-3",
  },
  {
    key: "investor",
    Icon: Handshake,
    gradient: "from-brand-violet to-brand-cyan",
    shadow: "shadow-brand-violet/30",
    hover: "hover:shadow-brand-violet/20",
    delay: "reveal-delay-1",
  },
  {
    key: "events",
    Icon: Calendar,
    gradient: "from-brand-cyan to-brand-blue",
    shadow: "shadow-brand-cyan/30",
    hover: "hover:shadow-brand-cyan/20",
    delay: "reveal-delay-2",
  },
  {
    key: "global",
    Icon: Globe,
    gradient: "from-brand-teal to-brand-violet",
    shadow: "shadow-brand-teal/30",
    hover: "hover:shadow-brand-teal/20",
    delay: "reveal-delay-3",
  },
] as const;

export function Opportunities() {
  const { d } = useLang();

  return (
    <section
      id="opportunities"
      className="relative z-10 py-16 md:py-24 bg-slate-50 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeading
          eyebrow={d.opportunities.eyebrow}
          title={d.opportunities.title}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {CARDS.map(({ key, Icon, gradient, shadow, hover, delay }) => {
            const copy = d.opportunities.cards[key];
            return (
              <div
                key={key}
                className={`glass-card tilt-card rounded-3xl p-6 md:p-8 group reveal ${delay} hover:shadow-2xl ${hover}`}
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg ${shadow}`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 font-heading">
                  {copy.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{copy.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
