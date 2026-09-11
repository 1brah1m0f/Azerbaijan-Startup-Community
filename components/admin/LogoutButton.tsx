"use client";

import { useState } from "react";

export function LogoutButton() {
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.replace("/admin");
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={busy}
      className="text-sm font-semibold text-slate-500 hover:text-brand-blue transition-colors disabled:opacity-60"
    >
      Çıxış
    </button>
  );
}
