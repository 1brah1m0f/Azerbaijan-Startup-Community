"use client";

import type { ReactNode } from "react";
import { Check } from "./Icons";

/**
 * The glass panel every form sits in, plus the success state that replaces
 * the fields once a submission goes through.
 */
export function FormShell({
  id,
  title,
  sub,
  children,
  className = "bg-slate-50 border-t border-slate-200",
}: {
  id: string;
  title: string;
  sub: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative z-10 py-16 md:py-24 ${className}`}>
      <div className="max-w-4xl mx-auto px-5 sm:px-6">
        <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden reveal">
          <div
            className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full filter blur-[40px] animate-blob"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 bg-brand-violet/10 rounded-full filter blur-[40px] animate-blob-slow"
            aria-hidden="true"
          />

          <div className="relative z-10 text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {title}
            </h2>
            <p className="text-slate-600">{sub}</p>
          </div>

          {children}
        </div>
      </div>
    </section>
  );
}

export function FormSuccess({
  title,
  sub,
}: {
  title: string;
  sub: string;
}) {
  return (
    <div className="relative z-10 text-center py-10" role="status">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-teal to-brand-cyan mx-auto mb-5 flex items-center justify-center shadow-lg shadow-brand-cyan/30">
        <Check className="w-8 h-8 text-white" />
      </div>
      <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2">
        {title}
      </h3>
      <p className="text-slate-600">{sub}</p>
    </div>
  );
}
