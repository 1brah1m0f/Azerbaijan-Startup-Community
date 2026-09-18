"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { useModal } from "@/components/providers/ModalProvider";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { cn } from "@/lib/cn";
import { scrollToId } from "@/lib/scroll";

type Mode = "login" | "signup";

/** Maps an error code from the API onto a message in the active language. */
const MESSAGE_KEY: Record<string, string> = {
  invalid: "errorInvalid",
  "not-registered": "errorNotRegistered",
  "already-registered": "errorAlreadyRegistered",
  "weak-password": "errorWeakPassword",
  "not-configured": "errorFailed",
  failed: "errorFailed",
};

const MIN_PASSWORD = 8;

export function LoginModal() {
  const { d } = useLang();
  const { isLoginOpen, role, closeLogin, setRole } = useModal();

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  /** Set when the address has no submission, so the form link can be offered. */
  const [offerForm, setOfferForm] = useState(false);
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

  // Clear everything the visitor typed once the modal is closed. Leaving a
  // password in a field is not something to do on a shared machine.
  useEffect(() => {
    if (isLoginOpen) return;
    setMode("login");
    setEmail("");
    setPassword("");
    setError(null);
    setOfferForm(false);
    setSending(false);
  }, [isLoginOpen]);

  if (!isLoginOpen) return null;

  const signup = mode === "signup";
  const message = (key: string) => (d.auth as Record<string, string>)[key] ?? key;

  const switchMode = (next: Mode) => {
    setMode(next);
    setError(null);
    setOfferForm(false);
    setPassword("");
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setOfferForm(false);

    const address = email.trim();
    if (!address || !password) {
      setError(d.auth.errorMissing);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
      setError(d.auth.errorEmail);
      return;
    }
    if (signup && password.length < MIN_PASSWORD) {
      setError(d.auth.errorWeakPassword);
      return;
    }

    setSending(true);
    try {
      const response = await fetch(
        signup ? "/api/auth/signup" : "/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: address, password }),
        },
      );

      const body = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !body.ok) {
        const code = body.error ?? "failed";
        setError(message(MESSAGE_KEY[code] ?? "errorFailed"));
        setOfferForm(code === "not-registered");
        setSending(false);
        return;
      }

      // A full load rather than a client transition, so the server component
      // renders with the session cookies that were just set.
      window.location.assign("/account");
    } catch {
      setError(d.auth.errorFailed);
      setSending(false);
    }
  };

  const goToRegistration = () => {
    closeLogin();
    scrollToId(role === "mentor" ? "join-mentor" : "join-startup");
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all bg-white text-slate-900 placeholder:text-slate-400";

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
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden outline-none animate-slide-up sm:animate-none border border-slate-200"
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
          <div className="h-10 mx-auto mb-3 flex justify-center">
            <BrandLogo className="h-10" alt="ASC" />
          </div>
          <h3
            id="auth-title"
            className="font-heading text-2xl font-bold text-slate-900"
          >
            {signup ? d.auth.signupTitle : d.auth.title}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {signup ? d.auth.signupSubtitle : d.auth.subtitle}
          </p>
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

        <form onSubmit={onSubmit} noValidate className="space-y-4 tab-fade" key={mode}>
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
              className="text-sm font-semibold text-slate-700 flex items-baseline gap-2"
            >
              <span>{d.auth.password}</span>
              {signup ? (
                <span className="text-xs font-normal text-slate-400">
                  {d.auth.passwordHint}
                </span>
              ) : null}
            </label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClasses}
              placeholder="••••••••"
              autoComplete={signup ? "new-password" : "current-password"}
            />
          </div>

          {error ? (
            <div className="space-y-2 text-center">
              <p className="text-sm text-rose-600 font-medium">{error}</p>
              {offerForm ? (
                <button
                  type="button"
                  onClick={goToRegistration}
                  className="text-sm text-brand-teal font-semibold hover:text-brand-blue transition-colors"
                >
                  {d.auth.goToForm}
                </button>
              ) : null}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={sending}
            className="w-full relative group overflow-hidden bg-gradient-to-r from-brand-teal via-brand-cyan to-brand-blue bg-[length:200%_auto] text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-brand-cyan/20 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {sending
              ? d.form.sending
              : signup
                ? d.auth.signup
                : d.auth.submit}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-4">
          <span>{signup ? d.auth.haveAccount : d.auth.noAccount} </span>
          <button
            type="button"
            onClick={() => switchMode(signup ? "login" : "signup")}
            className="text-brand-teal font-semibold hover:text-brand-blue transition-colors"
          >
            {signup ? d.auth.backToLogin : d.auth.signup}
          </button>
        </p>
      </div>
    </div>
  );
}
