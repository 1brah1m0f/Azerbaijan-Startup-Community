"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";

/**
 * The gate in front of the panel. Only the password leaves the browser; the
 * signed cookie the server sends back is what every later request carries.
 */
export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(undefined);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        window.location.replace("/admin");
        return;
      }

      setError(
        response.status === 500
          ? "Panel hələ konfiqurasiya olunmayıb."
          : "Parol yanlışdır.",
      );
    } catch {
      setError("Əlaqə alınmadı. Bir azdan yenidən yoxla.");
    }

    setBusy(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
        <div className="space-y-2">
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            Müraciətlər
          </h1>
          <p className="text-sm text-slate-500">
            Davam etmək üçün parolu daxil et.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <Input
            label="Parol"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={error}
            required
          />
          <Button variant="submit" type="submit" disabled={busy || !password}>
            {busy ? "Yoxlanılır…" : "Daxil ol"}
          </Button>
        </form>
      </div>
    </main>
  );
}
