"use client";

import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

const controlClasses =
  "w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all bg-white/50 text-slate-900";

function Label({
  htmlFor,
  children,
  hint,
}: {
  htmlFor: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-semibold text-slate-700 flex items-baseline gap-2"
    >
      <span>{children}</span>
      {hint ? (
        <span className="text-xs font-normal text-slate-400">{hint}</span>
      ) : null}
    </label>
  );
}

function Error({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-rose-600 font-medium">
      {message}
    </p>
  );
}

type BaseProps = {
  label: string;
  error?: string;
  hint?: string;
};

export function Input({
  label,
  error,
  hint,
  className,
  ...rest
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="space-y-2">
      <Label htmlFor={id} hint={hint}>
        {label}
      </Label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          controlClasses,
          error && "border-rose-400 focus:border-rose-400 focus:ring-rose-200",
          className,
        )}
        {...rest}
      />
      <Error id={errorId} message={error} />
    </div>
  );
}

export function Select({
  label,
  error,
  hint,
  className,
  children,
  ...rest
}: BaseProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="space-y-2">
      <Label htmlFor={id} hint={hint}>
        {label}
      </Label>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          controlClasses,
          "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%2394a3b8%22 stroke-width=%222%22%3E%3Cpath stroke-linecap=%22round%22 stroke-linejoin=%22round%22 d=%22M19 9l-7 7-7-7%22/%3E%3C/svg%3E')] bg-[length:18px_18px] bg-[right_1rem_center] bg-no-repeat pr-11",
          error && "border-rose-400 focus:border-rose-400 focus:ring-rose-200",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <Error id={errorId} message={error} />
    </div>
  );
}

export function Textarea({
  label,
  error,
  hint,
  className,
  maxLength,
  value,
  ...rest
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const errorId = `${id}-error`;
  const used = typeof value === "string" ? value.length : 0;
  return (
    <div className="space-y-2">
      <Label htmlFor={id} hint={hint}>
        {label}
      </Label>
      <textarea
        id={id}
        value={value}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          controlClasses,
          "resize-none",
          error && "border-rose-400 focus:border-rose-400 focus:ring-rose-200",
          className,
        )}
        {...rest}
      />
      <div className="flex items-start justify-between gap-4">
        <Error id={errorId} message={error} />
        {maxLength ? (
          <span className="ml-auto text-xs text-slate-400 tabular-nums shrink-0">
            {maxLength - used}
          </span>
        ) : null}
      </div>
    </div>
  );
}
