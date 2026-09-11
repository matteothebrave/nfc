import { headers } from "next/headers";
import { listLinks } from "@/lib/db";
import LinksManager from "@/components/LinksManager";

export default async function AdminPage() {
  const links = await listLinks();
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-neutral-100">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Links das placas NFC</h1>
            <p className="mt-1 text-sm text-neutral-400">
              Cada placa aponta para um link fixo. Você pode trocar o destino
              a qualquer momento sem precisar trocar a placa ou o QR code.
            </p>
          </div>
          <LogoutButton />
        </div>

        <LinksManager initialLinks={links} baseUrl={baseUrl} />
      </div>
    </main>
  );
}

function LogoutButton() {
  return (
    <a
      href="/admin/logout"
      className="rounded-lg border border-neutral-700 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
    >
      Sair
    </a>
  );
}
