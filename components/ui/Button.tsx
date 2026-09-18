"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { scrollToId } from "@/lib/scroll";

/**
 * The button styles from the reference design system.
 *
 * - `gradient`  header primary — animated gradient pill
 * - `outline`   header secondary — outlined pill
 * - `heroPrimary` / `heroSecondary` — the larger hero pair
 * - `submit`    full-width gradient form button
 * - `white` / `whiteOutline` — for use on the dark CTA band
 * - `link`      inline text link with an arrow
 */
export type ButtonVariant =
  | "gradient"
  | "outline"
  | "heroPrimary"
  | "heroSecondary"
  | "submit"
  | "white"
  | "whiteOutline"
  | "link";

const base: Record<ButtonVariant, string> = {
  gradient:
    "relative group overflow-hidden rounded-full px-5 py-2.5 font-semibold text-white shadow-lg hover:shadow-brand-cyan/40 transition-all duration-300 transform hover:-translate-y-0.5 shrink-0",
  outline:
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 font-semibold text-brand-blue border-2 border-brand-blue/20 hover:border-brand-cyan hover:text-brand-teal transition-all duration-300 shrink-0 dark:text-white/90 dark:border-white/15",
  heroPrimary:
    "group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-brand-blue text-white rounded-full font-semibold text-base sm:text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:scale-105 duration-300 shine",
  heroSecondary:
    "group px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg text-brand-blue border-2 border-brand-blue/20 hover:border-brand-cyan hover:text-brand-teal transition-all duration-300 hover:scale-105 bg-white/60 backdrop-blur-sm dark:text-white/90 dark:border-white/15",
  submit:
    "relative group w-full overflow-hidden bg-gradient-to-r from-brand-teal via-brand-cyan to-brand-blue bg-[length:200%_auto] hover:bg-right text-white font-semibold py-4 rounded-xl transition-all duration-500 shadow-lg shadow-brand-cyan/20 transform hover:-translate-y-1 disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed",
  white:
    "inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 !bg-white text-brand-blue rounded-full font-bold text-base sm:text-lg hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all duration-300",
  whiteOutline:
    "inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg text-white border-2 border-white/60 hover:!bg-white hover:text-brand-blue hover:scale-105 transition-all duration-300",
  link: "inline-flex items-center gap-2 text-brand-blue font-semibold hover:text-brand-cyan transition-colors",
};

type CommonProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
};

type LinkProps = CommonProps & {
  /** In-page target, e.g. "#join-startup". Renders an <a> and smooth-scrolls. */
  to: string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type ActionProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: never };

export function Button(props: LinkProps | ActionProps) {
  const { variant = "gradient", children, className } = props;
  const classes = cn(base[variant], className);

  // The animated gradient lives in a child layer so the label stays crisp.
  const content =
    variant === "gradient" ? (
      <>
        <span
          className="absolute inset-0 bg-gradient-to-r from-brand-violet via-brand-cyan to-brand-teal bg-[length:200%_auto] animate-gradient-x"
          aria-hidden="true"
        />
        <span className="relative">{children}</span>
      </>
    ) : (
      children
    );

  if ("to" in props && props.to) {
    const target = props.to;
    return (
      <a
        href={target}
        className={cn(classes, variant === "gradient" && "inline-flex")}
        onClick={(event) => {
          event.preventDefault();
          scrollToId(target);
        }}
      >
        {content}
      </a>
    );
  }

  const { variant: _v, children: _c, className: _cn, ...rest } =
    props as ActionProps;

  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
