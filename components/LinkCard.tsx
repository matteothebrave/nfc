"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import type { LinkRecord } from "@/lib/db";

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
    QRCode.toDataURL(redirectUrl, { width: 240, margin: 1 }).then(
      setQrDataUrl,
    );
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
    <div className="flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 sm:flex-row">
      {qrDataUrl && (
        <Image
          src={qrDataUrl}
          alt={`QR code para ${link.name}`}
          width={240}
          height={240}
          unoptimized
          className="h-32 w-32 flex-shrink-0 rounded-lg bg-white p-2"
        />
      )}

      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-medium text-neutral-100">{link.name}</h3>
            <button
              onClick={copyLink}
              className="mt-1 block text-left text-sm text-neutral-400 hover:text-neutral-200"
              title="Copiar link"
            >
              {redirectUrl} {copied ? "✓ copiado" : "· copiar"}
            </button>
          </div>
          <label className="flex items-center gap-2 text-xs text-neutral-400">
            <input
              type="checkbox"
              checked={link.active}
              onChange={(e) => onUpdate(link.id, { active: e.target.checked })}
            />
            {link.active ? "Ativo" : "Inativo"}
          </label>
        </div>

        <div className="mt-3">
          {editing ? (
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="url"
                value={destinationUrl}
                onChange={(e) => setDestinationUrl(e.target.value)}
                className="flex-1 rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-1.5 text-sm text-neutral-100 outline-none focus:border-neutral-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={saveDestination}
                  className="rounded-lg bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-900 hover:bg-neutral-300"
                >
                  Salvar
                </button>
                <button
                  onClick={() => {
                    setDestinationUrl(link.destinationUrl);
                    setEditing(false);
                  }}
                  className="rounded-lg border border-neutral-700 px-3 py-1.5 text-sm text-neutral-300 hover:bg-neutral-800"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <p className="truncate text-sm text-neutral-400">
                → {link.destinationUrl}
              </p>
              <button
                onClick={() => setEditing(true)}
                className="flex-shrink-0 text-sm text-neutral-300 underline hover:text-neutral-100"
              >
                Trocar destino
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs text-neutral-500">
          <span>{link.clickCount} cliques</span>
          {qrDataUrl && (
            <a
              href={qrDataUrl}
              download={`qrcode-${link.slug}.png`}
              className="underline hover:text-neutral-300"
            >
              Baixar QR code
            </a>
          )}
          <button
            onClick={() => onDelete(link.id)}
            className="ml-auto text-red-400 underline hover:text-red-300"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
