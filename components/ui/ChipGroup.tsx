"use client";

import { cn } from "@/lib/cn";

/**
 * Multi-select chips. Selected chips carry the brand gradient, matching the
 * active state of the language pill and the modal's role tabs.
 *
 * Rendered as a group of toggle buttons so screen readers announce the
 * pressed state; the selected values go into the payload as a real array.
 */
export function ChipGroup<T extends string>({
  label,
  hint,
  options,
  labels,
  value,
  onChange,
  error,
}: {
  label: string;
  hint?: string;
  options: readonly T[];
  /** Display label per option value. */
  labels: Record<string, string>;
  value: readonly T[];
  onChange: (next: T[]) => void;
  error?: string;
}) {
  const toggle = (option: T) => {
    onChange(
      value.includes(option)
        ? value.filter((item) => item !== option)
        : [...value, option],
    );
  };

  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-semibold text-slate-700 flex items-baseline gap-2">
        <span>{label}</span>
        {hint ? (
          <span className="text-xs font-normal text-slate-400">{hint}</span>
        ) : null}
      </legend>
      <div className="flex flex-wrap gap-2 pt-1">
        {options.map((option) => {
          const selected = value.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => toggle(option)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200",
                selected
                  ? "chip-active"
                  : "bg-white/60 border-slate-200 text-slate-600 hover:border-brand-cyan hover:text-brand-teal",
              )}
            >
              {labels[option] ?? option}
            </button>
          );
        })}
      </div>
      {error ? (
        <p className="text-sm text-rose-600 font-medium">{error}</p>
      ) : null}
    </fieldset>
  );
}

/** Small read-only tag used on the startup and mentor cards. */
export function Tag({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "slate" | "teal" | "blue";
}) {
  const tones = {
    slate: "bg-slate-100 text-slate-600",
    teal: "bg-brand-teal/10 text-brand-teal",
    blue: "bg-brand-blue/10 text-brand-blue",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
