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
        className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6"
      >
        <h2 className="font-medium text-neutral-100">Novo link</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do comércio (ex: Padaria do João)"
            className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-neutral-500 sm:col-span-2"
          />
          <input
            required
            type="url"
            value={destinationUrl}
            onChange={(e) => setDestinationUrl(e.target.value)}
            placeholder="Link do Google Reviews (destino)"
            className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-neutral-500 sm:col-span-2"
          />
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Identificador do link (opcional, ex: padaria-joao)"
            className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-neutral-500 sm:col-span-2"
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={creating}
          className="mt-4 rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-300 disabled:opacity-50"
        >
          {creating ? "Criando..." : "Criar link"}
        </button>
      </form>

      <div className="space-y-4">
        {links.length === 0 && (
          <p className="text-sm text-neutral-500">
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
