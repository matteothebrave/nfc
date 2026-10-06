"use client";

import { useState } from "react";
import type { PlaceResult } from "@/lib/places";

export default function PlaceSearch({
  onSelect,
}: {
  onSelect: (place: PlaceResult) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  async function search() {
    if (query.trim().length < 3) {
      setError("Digite pelo menos 3 letras.");
      return;
    }
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/places/search?q=${encodeURIComponent(query)}`);
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    setSearched(true);
    if (!res.ok) {
      setError(data.error ?? "Erro ao buscar empresa.");
      setResults([]);
      return;
    }
    setResults(data.places ?? []);
  }

  function select(place: PlaceResult) {
    onSelect(place);
    setResults([]);
    setSearched(false);
    setQuery("");
  }

  return (
    <div className="rounded-2xl border-2 border-dashed border-[var(--red)]/40 bg-[var(--red-soft)]/40 p-3">
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[var(--red-dark)]">
        🔎 Buscar empresa no Google
      </p>
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              search();
            }
          }}
          placeholder="Nome e cidade (ex: Padaria do João Curitiba)"
          className="flex-1 rounded-xl border-2 border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-[var(--red)]"
        />
        <button
          type="button"
          onClick={search}
          disabled={loading}
          className="rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-50"
        >
          {loading ? "..." : "Buscar"}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm font-medium text-[var(--red-dark)]">{error}</p>
      )}

      {searched && !error && results.length === 0 && (
        <p className="mt-2 text-sm text-neutral-500">Nenhuma empresa encontrada.</p>
      )}

      {results.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {results.map((place) => (
            <li key={place.placeId}>
              <button
                type="button"
                onClick={() => select(place)}
                className="w-full rounded-xl border-2 border-transparent bg-white px-3 py-2 text-left transition hover:border-[var(--red)]"
              >
                <span className="block text-sm font-bold text-[var(--foreground)]">
                  {place.name}
                </span>
                <span className="block text-xs text-neutral-500">{place.address}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
