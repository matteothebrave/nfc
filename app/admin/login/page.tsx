"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Erro ao entrar.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--cream)] p-6">
      <div
        className="blob h-72 w-72 bg-[var(--red)]"
        style={{ top: "-4rem", left: "-4rem" }}
      />
      <div
        className="blob h-96 w-96 bg-red-300"
        style={{ bottom: "-6rem", right: "-6rem", animationDelay: "3s" }}
      />
      <div
        className="blob h-40 w-40 bg-orange-300"
        style={{ top: "30%", right: "10%", animationDelay: "6s" }}
      />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm rounded-[28px] border-2 border-[var(--foreground)] bg-white p-8 shadow-[8px_8px_0_0_var(--red)]"
      >
        <div className="flex items-center gap-2">
          <span className="pulse-dot inline-block h-2.5 w-2.5 rounded-full bg-[var(--red)]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--red-dark)]">
            NFC OS
          </span>
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--foreground)]">
          Backoffice{" "}
          <span className="bg-gradient-to-r from-[var(--red)] to-orange-500 bg-clip-text text-transparent">
            NFC
          </span>
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Entre com a senha de administrador pra gerenciar os links.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoFocus
          className="mt-6 w-full rounded-2xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 outline-none transition focus:border-[var(--red)] focus:bg-white"
        />

        {error && (
          <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-[var(--red-dark)]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-2xl bg-[var(--red)] px-3 py-3 font-bold text-white shadow-[4px_4px_0_0_var(--foreground)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--foreground)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--foreground)] disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar →"}
        </button>
      </form>
    </main>
  );
}
