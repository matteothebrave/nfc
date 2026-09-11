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
    <main className="relative min-h-screen overflow-hidden bg-[var(--cream)] px-6 py-10 text-[var(--foreground)]">
      <div
        className="blob h-80 w-80 bg-[var(--red)]"
        style={{ top: "-8rem", right: "-6rem" }}
      />
      <div
        className="blob h-56 w-56 bg-orange-200"
        style={{ bottom: "-4rem", left: "-4rem", animationDelay: "4s" }}
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--foreground)] bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--red-dark)]">
              <span className="pulse-dot h-2 w-2 rounded-full bg-[var(--red)]" />
              Placas ativas
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Links das placas{" "}
              <span className="bg-gradient-to-r from-[var(--red)] to-orange-500 bg-clip-text text-transparent">
                NFC
              </span>
            </h1>
            <p className="mt-1 max-w-lg text-sm text-neutral-600">
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
      className="flex-shrink-0 rounded-full border-2 border-[var(--foreground)] bg-white px-4 py-2 text-sm font-bold text-[var(--foreground)] shadow-[3px_3px_0_0_var(--foreground)] transition hover:-translate-y-0.5 hover:bg-neutral-50"
    >
      Sair
    </a>
  );
}
