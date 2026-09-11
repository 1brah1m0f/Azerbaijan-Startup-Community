"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { useModal } from "@/components/providers/ModalProvider";
import { cn } from "@/lib/cn";
import { loginSchema } from "@/lib/schemas";
import { scrollToId } from "@/lib/scroll";

export function LoginModal() {
  const { d } = useLang();
  const { isLoginOpen, role, closeLogin, setRole } = useModal();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Escape closes the modal, and the page behind it must not scroll.
  useEffect(() => {
    if (!isLoginOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLogin();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isLoginOpen, closeLogin]);

  // Clear transient state whenever the modal is reopened.
  useEffect(() => {
    if (!isLoginOpen) {
      setError(null);
      setNotice(null);
      setSending(false);
    }
  }, [isLoginOpen]);

  if (!isLoginOpen) return null;

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setNotice(null);

    const parsed = loginSchema.safeParse({ role, name, email, password });
    if (!parsed.success) {
      const hasEmailIssue = parsed.error.issues.some(
        (issue) =>
          issue.path[0] === "email" && issue.message === "invalidEmail",
      );
      setError(hasEmailIssue ? d.auth.errorEmail : d.auth.errorMissing);
      return;
    }

    setSending(true);
    try {
      await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
    } catch {
      /* the stub endpoint never blocks the notice below */
    } finally {
      setSending(false);
      setNotice(d.auth.soon);
    }
  };

  const goToRegistration = () => {
    closeLogin();
    scrollToId(role === "mentor" ? "join-mentor" : "join-startup");
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all";

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[rgba(18,42,61,0.6)] backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeLogin();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        tabIndex={-1}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden outline-none animate-slide-up sm:animate-none"
      >
        <button
          type="button"
          onClick={closeLogin}
          className="absolute top-4 right-4 w-9 h-9 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
          aria-label={d.auth.close}
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-10 mx-auto mb-3 relative">
            <Image
              src="/logos/asc-logo-tight.png"
              alt="ASC"
              fill
              sizes="56px"
              className="object-contain"
            />
          </div>
          <h3
            id="auth-title"
            className="font-heading text-2xl font-bold text-slate-900"
          >
            {d.auth.title}
          </h3>
          <p className="text-sm text-slate-500 mt-1">{d.auth.subtitle}</p>
        </div>

        <div className="flex rounded-full bg-slate-100 p-1 mb-5">
          <button
            type="button"
            onClick={() => setRole("startup")}
            aria-pressed={role === "startup"}
            className={cn(
              "auth-role-btn flex-1 py-2 rounded-full text-sm font-semibold transition-all",
              role === "startup" && "active",
            )}
          >
            {d.auth.roleStartup}
          </button>
          <button
            type="button"
            onClick={() => setRole("mentor")}
            aria-pressed={role === "mentor"}
            className={cn(
              "auth-role-btn flex-1 py-2 rounded-full text-sm font-semibold transition-all",
              role === "mentor" && "active",
            )}
          >
            {d.auth.roleMentor}
          </button>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-4 tab-fade" key={role}>
          <div className="space-y-1.5">
            <label
              htmlFor="auth-name"
              className="text-sm font-semibold text-slate-700"
            >
              {d.auth.name}
            </label>
            <input
              id="auth-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClasses}
              autoComplete="name"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="auth-email"
              className="text-sm font-semibold text-slate-700"
            >
              {d.auth.email}
            </label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClasses}
              placeholder="you@startup.az"
              autoComplete="email"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="auth-password"
              className="text-sm font-semibold text-slate-700"
            >
              {d.auth.password}
            </label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClasses}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error ? (
            <p className="text-sm text-rose-600 font-medium text-center">
              {error}
            </p>
          ) : null}
          {notice ? (
            <p
              className="text-sm text-brand-blue font-medium text-center bg-brand-cyan/10 rounded-xl px-4 py-3"
              role="status"
            >
              {notice}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={sending}
            className="w-full relative group overflow-hidden bg-gradient-to-r from-brand-teal via-brand-cyan to-brand-blue bg-[length:200%_auto] text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-brand-cyan/20 hover:-translate-y-0.5 disabled:opacity-60"
          >
            {sending ? d.form.sending : d.auth.submit}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-4">
          <span>{d.auth.noAccount} </span>
          <button
            type="button"
            onClick={goToRegistration}
            className="text-brand-teal font-semibold hover:text-brand-blue transition-colors"
          >
            {d.auth.signup}
          </button>
        </p>
      </div>
    </div>
  );
}
