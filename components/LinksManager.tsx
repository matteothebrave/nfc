"use client";

import { useState } from "react";
import type { LinkRecord } from "@/lib/db";
import LinkCard from "@/components/LinkCard";

export default function LinksManager({
  initialLinks,
  baseUrl,
}: {
  initialLinks: LinkRecord[];
  baseUrl: string;
}) {
  const [links, setLinks] = useState(initialLinks);
  const [name, setName] = useState("");
  const [destinationUrl, setDestinationUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError(null);
    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, destinationUrl, slug }),
    });
    setCreating(false);
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Erro ao criar link.");
      return;
    }
    setLinks((prev) => [data.link, ...prev]);
    setName("");
    setDestinationUrl("");
    setSlug("");
  }

  async function handleUpdate(id: string, patch: Partial<LinkRecord>) {
    const res = await fetch(`/api/links/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error ?? "Erro ao atualizar link.");
      return;
    }
    setLinks((prev) => prev.map((l) => (l.id === id ? data.link : l)));
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir este link? A placa/QR que aponta para ele deixará de funcionar.")) {
      return;
    }
    const res = await fetch(`/api/links/${id}`, { method: "DELETE" });
    if (res.ok) {
      setLinks((prev) => prev.filter((l) => l.id !== id));
    }
  }

  return (
    <div className="mt-8 space-y-8">
      <form
        onSubmit={handleCreate}
        className="rounded-[28px] border-2 border-[var(--foreground)] bg-white p-6 shadow-[6px_6px_0_0_var(--red)]"
      >
        <h2 className="flex items-center gap-2 text-lg font-bold text-[var(--foreground)]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--red)] text-sm text-white">
            +
          </span>
          Novo link
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do comércio (ex: Padaria do João)"
            className="rounded-xl border-2 border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-[var(--red)] focus:bg-white sm:col-span-2"
          />
          <input
            required
            type="url"
            value={destinationUrl}
            onChange={(e) => setDestinationUrl(e.target.value)}
            placeholder="Link do Google Reviews (destino)"
            className="rounded-xl border-2 border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-[var(--red)] focus:bg-white sm:col-span-2"
          />
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Identificador do link (opcional, ex: padaria-joao)"
            className="rounded-xl border-2 border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-[var(--red)] focus:bg-white sm:col-span-2"
          />
        </div>
        {error && (
          <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-[var(--red-dark)]">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={creating}
          className="mt-4 rounded-full bg-[var(--red)] px-5 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0_0_var(--foreground)] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--foreground)] active:translate-y-0 active:shadow-[1px_1px_0_0_var(--foreground)] disabled:opacity-50"
        >
          {creating ? "Criando..." : "Criar link ✨"}
        </button>
      </form>

      <div className="space-y-4">
        {links.length === 0 && (
          <p className="rounded-2xl border-2 border-dashed border-neutral-300 bg-white/60 p-6 text-center text-sm text-neutral-500">
            Nenhum link criado ainda. Crie o primeiro acima.
          </p>
        )}
        {links.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            baseUrl={baseUrl}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
