"use client";

import { useLang } from "@/components/providers/LangProvider";
import { ArrowRight } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { scrollToId } from "@/lib/scroll";

const CARDS = [
  {
    key: "idea",
    emoji: "💡",
    gradient: "from-brand-cyan to-brand-teal",
    shadow: "shadow-brand-cyan/30",
    hover: "hover:shadow-brand-cyan/20",
    delay: "reveal-delay-1",
  },
  {
    key: "building",
    emoji: "🚀",
    gradient: "from-brand-teal to-brand-blue",
    shadow: "shadow-brand-teal/30",
    hover: "hover:shadow-brand-teal/20",
    delay: "reveal-delay-2",
  },
  {
    key: "growing",
    emoji: "📈",
    gradient: "from-brand-blue to-brand-violet",
    shadow: "shadow-brand-blue/30",
    hover: "hover:shadow-brand-blue/20",
    delay: "reveal-delay-3",
  },
] as const;

export function Stage() {
  const { d } = useLang();

  return (
    <section id="stage" className="relative z-10 py-16 md:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeading eyebrow={d.stage.eyebrow} title={d.stage.title} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {CARDS.map((card) => {
            const copy = d.stage.cards[card.key];
            return (
              <div
                key={card.key}
                className={`glass-card tilt-card rounded-3xl p-6 md:p-8 group reveal ${card.delay} hover:shadow-2xl ${card.hover}`}
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg ${card.shadow}`}
                >
                  <span className="text-2xl" aria-hidden="true">
                    {card.emoji}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-heading">
                  {copy.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-5">
                  {copy.text}
                </p>
                <span className="inline-flex items-center rounded-full bg-brand-teal/10 px-3 py-1.5 text-sm font-semibold text-brand-teal">
                  {d.stage.badge}
                </span>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10 md:mt-12 reveal">
          <a
            href="#join-startup"
            className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:text-brand-cyan transition-colors text-lg"
            onClick={(event) => {
              event.preventDefault();
              scrollToId("join-startup");
            }}
          >
            <span>{d.stage.cta}</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
