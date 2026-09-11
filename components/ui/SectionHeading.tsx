import { cn } from "@/lib/cn";

/**
 * The centred eyebrow + heading + subtitle block used at the top of most
 * sections in the reference design.
 */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  eyebrowClassName = "text-brand-teal",
  className,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  eyebrowClassName?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-center max-w-3xl mx-auto mb-12 md:mb-16 reveal",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "font-semibold tracking-wider uppercase text-sm mb-4 block",
            eyebrowClassName,
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6">
        {title}
      </h2>
      {sub ? <p className="text-lg sm:text-xl text-slate-600">{sub}</p> : null}
    </div>
  );
}

/** Gradient tile that holds a section card's icon. */
export function IconTile({
  gradient,
  children,
  className,
}: {
  gradient: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-14 h-14 bg-gradient-to-br rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg",
        gradient,
        className,
      )}
    >
      {children}
    </div>
  );
}
