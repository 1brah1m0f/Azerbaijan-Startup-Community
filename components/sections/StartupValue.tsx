"use client";

import { useLang } from "@/components/providers/LangProvider";
import { Academic, ArrowRight, Eye, Ticket, Users } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { scrollToId } from "@/lib/scroll";

const CARDS = [
  {
    key: "people",
    Icon: Users,
    gradient: "from-brand-cyan to-brand-teal",
    shadow: "shadow-brand-cyan/30",
    hover: "hover:shadow-brand-cyan/20",
    delay: "reveal-delay-1",
  },
  {
    key: "experience",
    Icon: Academic,
    gradient: "from-brand-teal to-brand-blue",
    shadow: "shadow-brand-teal/30",
    hover: "hover:shadow-brand-teal/20",
    delay: "reveal-delay-2",
  },
  {
    key: "access",
    Icon: Ticket,
    gradient: "from-brand-blue to-brand-violet",
    shadow: "shadow-brand-blue/30",
    hover: "hover:shadow-brand-blue/20",
    delay: "reveal-delay-3",
  },
  {
    key: "visibility",
    Icon: Eye,
    gradient: "from-brand-violet to-brand-cyan",
    shadow: "shadow-brand-violet/30",
    hover: "hover:shadow-brand-violet/20",
    delay: "reveal-delay-3",
  },
] as const;

export function StartupValue() {
  const { d } = useLang();

  return (
    <section id="why" className="relative z-10 py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeading eyebrow={d.why.eyebrow} title={d.why.title} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {CARDS.map(({ key, Icon, gradient, shadow, hover, delay }) => {
            const copy = d.why.cards[key];
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
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 font-heading">
                  {copy.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{copy.text}</p>
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
            <span>{d.why.cta}</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
