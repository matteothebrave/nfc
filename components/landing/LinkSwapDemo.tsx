"use client";

import { useEffect, useState } from "react";

const DESTINATIONS = [
  {
    emoji: "⭐",
    label: "Avaliação no Google",
    url: "search.google.com/local/writereview…",
  },
  {
    emoji: "🍞",
    label: "Cardápio digital",
    url: "cardapio.padariadojoao.com.br",
  },
  { emoji: "📸", label: "Instagram", url: "instagram.com/padariadojoao" },
  {
    emoji: "🎉",
    label: "Promoção da semana",
    url: "padariadojoao.com.br/promo",
  },
];

export default function LinkSwapDemo() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setTimeout(
      () => setIndex((i) => (i + 1) % DESTINATIONS.length),
      2600,
    );
    return () => clearTimeout(id);
  }, [index]);

  const current = DESTINATIONS[index];

  return (
    <div className="rounded-[28px] border-2 border-[var(--foreground)] bg-white p-6 shadow-[6px_6px_0_0_var(--red)]">
      <p className="text-xs font-bold tracking-widest text-neutral-500 uppercase">
        🔒 Link gravado na placa
      </p>
      <p className="mt-1 rounded-xl bg-neutral-100 px-3 py-2 font-mono text-sm break-all">
        seudominio.com/r/padaria-do-joao
      </p>

      <p className="my-3 text-center text-2xl text-[var(--red)]" aria-hidden>
        ↓
      </p>

      <div
        key={index}
        className="fade-up flex items-center gap-3 rounded-2xl border-2 border-[var(--red)] bg-[var(--red-soft)]/50 p-4"
      >
        <span className="text-3xl">{current.emoji}</span>
        <div className="min-w-0">
          <p className="font-bold">{current.label}</p>
          <p className="truncate font-mono text-xs text-neutral-500">
            {current.url}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {DESTINATIONS.map((d, i) => (
          <button
            key={d.label}
            type="button"
            onClick={() => setIndex(i)}
            className={`rounded-full border-2 px-3 py-1 text-xs font-bold transition ${
              i === index
                ? "border-[var(--foreground)] bg-[var(--foreground)] text-white"
                : "border-neutral-200 bg-white text-neutral-600 hover:border-[var(--red)]"
            }`}
          >
            {d.emoji} {d.label}
          </button>
        ))}
      </div>
    </div>
  );
}
