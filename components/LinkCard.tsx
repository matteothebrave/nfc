"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import type { LinkRecord } from "@/lib/db";
import { reviewLinkFromPlaceId } from "@/lib/places";
import PlaceSearch from "@/components/PlaceSearch";

export default function LinkCard({
  link,
  baseUrl,
  onUpdate,
  onDelete,
}: {
  link: LinkRecord;
  baseUrl: string;
  onUpdate: (id: string, patch: Partial<LinkRecord>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const redirectUrl = `${baseUrl}/r/${link.slug}`;
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [destinationUrl, setDestinationUrl] = useState(link.destinationUrl);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    QRCode.toDataURL(redirectUrl, {
      width: 240,
      margin: 1,
      color: { dark: "#1a1210", light: "#ffffff" },
    }).then(setQrDataUrl);
  }, [redirectUrl]);

  async function copyLink() {
    await navigator.clipboard.writeText(redirectUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function saveDestination() {
    await onUpdate(link.id, { destinationUrl });
    setEditing(false);
  }

  return (
    <div className="group flex flex-col gap-4 rounded-[28px] border-2 border-[var(--foreground)] bg-white p-6 shadow-[5px_5px_0_0_rgba(26,18,16,0.08)] transition hover:shadow-[7px_7px_0_0_var(--red)] sm:flex-row">
      {qrDataUrl && (
        <div className="flex-shrink-0 rounded-2xl border-2 border-[var(--foreground)] bg-white p-2">
          <Image
            src={qrDataUrl}
            alt={`QR code para ${link.name}`}
            width={240}
            height={240}
            unoptimized
            className="h-28 w-28"
          />
        </div>
      )}

      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-[var(--foreground)]">
              {link.name}
            </h3>
            <button
              onClick={copyLink}
              className="mt-1 block text-left text-sm font-medium text-[var(--red-dark)] hover:underline"
              title="Copiar link"
            >
              {redirectUrl} {copied ? "✓ copiado" : "· copiar"}
            </button>
          </div>
          <label className="flex flex-shrink-0 items-center gap-2 rounded-full border-2 border-[var(--foreground)] bg-neutral-50 px-3 py-1 text-xs font-bold">
            <input
              type="checkbox"
              checked={link.active}
              onChange={(e) => onUpdate(link.id, { active: e.target.checked })}
              className="accent-[var(--red)]"
            />
            <span
              className={
                link.active ? "text-[var(--red-dark)]" : "text-neutral-400"
              }
            >
              {link.active ? "Ativo" : "Inativo"}
            </span>
          </label>
        </div>

        <div className="mt-3">
          {editing ? (
            <div className="space-y-2">
              <PlaceSearch
                onSelect={(place) =>
                  setDestinationUrl(reviewLinkFromPlaceId(place.placeId))
                }
              />
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="url"
                  value={destinationUrl}
                  onChange={(e) => setDestinationUrl(e.target.value)}
                  className="flex-1 rounded-xl border-2 border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-900 outline-none focus:border-[var(--red)] focus:bg-white"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveDestination}
                    className="rounded-full bg-[var(--red)] px-4 py-1.5 text-sm font-bold text-white shadow-[2px_2px_0_0_var(--foreground)] transition hover:-translate-y-0.5"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => {
                      setDestinationUrl(link.destinationUrl);
                      setEditing(false);
                    }}
                    className="rounded-full border-2 border-neutral-200 px-4 py-1.5 text-sm font-medium text-neutral-500 hover:bg-neutral-50"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <p className="truncate text-sm text-neutral-500">
                → {link.destinationUrl}
              </p>
              <button
                onClick={() => setEditing(true)}
                className="flex-shrink-0 rounded-full bg-[var(--red-soft)] px-3 py-1 text-xs font-bold text-[var(--red-dark)] hover:bg-red-100"
              >
                Trocar destino
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 font-bold text-neutral-600">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--red)]" />
            {link.clickCount} cliques
          </span>
          {qrDataUrl && (
            <a
              href={qrDataUrl}
              download={`qrcode-${link.slug}.png`}
              className="font-bold text-[var(--red-dark)] hover:underline"
            >
              Baixar QR code
            </a>
          )}
          <button
            onClick={() => onDelete(link.id)}
            className="ml-auto font-bold text-neutral-400 hover:text-[var(--red-dark)] hover:underline"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
