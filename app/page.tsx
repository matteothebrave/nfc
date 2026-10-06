import type { Metadata } from "next";
import TapDemo from "@/components/landing/TapDemo";
import LinkSwapDemo from "@/components/landing/LinkSwapDemo";
import { PLAN_PRICE, SITE_NAME, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_NAME} · Plataforma para placas NFC de avaliação`,
  description:
    "Grave um link fixo na placa NFC e controle tudo por um painel: destino, QR code e acessos. Feito para vendedores de placas.",
};

const STEPS = [
  {
    title: "Encontre o comércio",
    text: "Busque a empresa pelo nome direto no painel. O link oficial de avaliação do Google é gerado na hora.",
  },
  {
    title: "Grave e imprima",
    text: "Grave o link fixo na placa NFC e baixe o QR code em PNG para imprimir junto.",
  },
  {
    title: "O cliente avalia",
    text: "Quem encosta o celular ou aponta a câmera cai direto na tela de avaliação do Google.",
  },
];

const BENEFITS = [
  {
    emoji: "🔗",
    title: "Link que não quebra",
    text: "A placa aponta sempre para o mesmo link. Mudou o destino? Troque no painel, sem regravar nada.",
  },
  {
    emoji: "🖨️",
    title: "QR code pronto",
    text: "Cada placa ganha um QR code para baixar e imprimir, para quem não usa NFC.",
  },
  {
    emoji: "🔎",
    title: "Busca no Google",
    text: "Encontre a empresa pelo nome e gere o link de avaliação oficial, sem caçar link na mão.",
  },
  {
    emoji: "📊",
    title: "Contagem de acessos",
    text: "Veja quantas vezes cada placa foi usada e mostre o resultado para o seu cliente.",
  },
  {
    emoji: "⏸️",
    title: "Pausar placa",
    text: "Desative uma placa com um clique e reative quando quiser.",
  },
  {
    emoji: "📱",
    title: "Painel no celular",
    text: "Painel leve e simples, para usar do celular na frente do cliente.",
  },
];

const PLAN_ITEMS = [
  "Painel de gestão das placas",
  "Links fixos com QR code",
  "Busca de empresas no Google",
  "Contagem de acessos por placa",
  "Ativar e pausar placas",
  "Atendimento pelo WhatsApp",
];

const FAQ = [
  {
    q: "Preciso regravar a placa se o link de avaliação mudar?",
    a: "Não. A placa guarda o link fixo da plataforma. Você só troca o destino no painel e a placa continua funcionando.",
  },
  {
    q: "E se o celular do cliente não tiver NFC?",
    a: "Cada placa tem um QR code. É só apontar a câmera do celular.",
  },
  {
    q: "Como recebo meu acesso?",
    a: "Chame no WhatsApp, combine a assinatura e você recebe o acesso ao painel.",
  },
  {
    q: "Posso usar com placas que já vendi?",
    a: "Sim, desde que a placa NFC não esteja bloqueada para gravação. Basta regravar com o link da plataforma.",
  },
];

export default function LandingPage() {
  const subscribeUrl = whatsappUrl();

  return (
    <main className="relative overflow-x-clip bg-[var(--cream)] text-[var(--foreground)]">
      <div
        className="blob h-96 w-96 bg-[var(--red)]"
        style={{ top: "-8rem", right: "-6rem" }}
      />
      <div
        className="blob h-72 w-72 bg-orange-200"
        style={{ top: "28rem", left: "-8rem", animationDelay: "4s" }}
      />

      <header className="sticky top-0 z-30 border-b-2 border-[var(--foreground)] bg-[var(--cream)]/85 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <a href="#" className="flex items-center gap-2 text-lg font-bold">
            <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-[var(--red)]" />
            {SITE_NAME}
          </a>
          <div className="hidden items-center gap-6 text-sm font-bold md:flex">
            <a href="#como-funciona" className="hover:text-[var(--red-dark)]">
              Como funciona
            </a>
            <a href="#beneficios" className="hover:text-[var(--red-dark)]">
              Benefícios
            </a>
            <a href="#preco" className="hover:text-[var(--red-dark)]">
              Preço
            </a>
            <a href="#duvidas" className="hover:text-[var(--red-dark)]">
              Dúvidas
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/admin/login"
              className="text-sm font-bold hover:text-[var(--red-dark)]"
            >
              Entrar
            </a>
            <CtaButton href={subscribeUrl} small>
              Assinar
            </CtaButton>
          </div>
        </nav>
      </header>

      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--foreground)] bg-white px-3 py-1 text-xs font-bold tracking-widest text-[var(--red-dark)] uppercase">
            Para vendedores de placas NFC
          </span>
          <h1 className="mt-5 text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Placas de avaliação que{" "}
            <span className="bg-gradient-to-r from-[var(--red)] to-orange-500 bg-clip-text text-transparent">
              nunca ficam desatualizadas
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-neutral-600">
            Grave um link fixo na placa e controle tudo por um painel: para onde
            ele leva, quantos acessos teve e o QR code pronto para imprimir.
            Mostre para seus clientes e venda placas com mais valor.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CtaButton href={subscribeUrl}>
              Assinar por {PLAN_PRICE}/mês
            </CtaButton>
            <a
              href="#como-funciona"
              className="rounded-full border-2 border-[var(--foreground)] bg-white px-5 py-3 font-bold transition hover:-translate-y-0.5"
            >
              Ver como funciona
            </a>
          </div>
        </div>
        <TapDemo />
      </section>

      <section className="relative mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[28px] border-2 border-dashed border-neutral-300 bg-white/60 p-8">
            <p className="text-sm font-bold tracking-widest text-neutral-400 uppercase">
              Placa gravada direto no Google
            </p>
            <ul className="mt-4 space-y-3 text-neutral-500">
              <ListItem bad>Link mudou, placa perdida</ListItem>
              <ListItem bad>Ninguém sabe se a placa está sendo usada</ListItem>
              <ListItem bad>
                Para trocar o destino, só fazendo outra placa
              </ListItem>
            </ul>
          </div>
          <div className="rounded-[28px] border-2 border-[var(--foreground)] bg-white p-8 shadow-[6px_6px_0_0_var(--red)]">
            <p className="text-sm font-bold tracking-widest text-[var(--red-dark)] uppercase">
              Placa com {SITE_NAME}
            </p>
            <ul className="mt-4 space-y-3 font-medium">
              <ListItem>Destino trocado em segundos pelo painel</ListItem>
              <ListItem>Contagem de acessos de cada placa</ListItem>
              <ListItem>A placa nunca precisa ser regravada</ListItem>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="como-funciona"
        className="relative mx-auto max-w-6xl scroll-mt-20 px-6 py-16"
      >
        <SectionTitle
          kicker="Como funciona"
          title="Três passos, e a placa está pronta"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="rounded-[28px] border-2 border-[var(--foreground)] bg-white p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--red)] text-lg font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-neutral-600">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="beneficios"
        className="relative mx-auto max-w-6xl scroll-mt-20 px-6 py-16"
      >
        <SectionTitle
          kicker="Benefícios"
          title="Tudo que você precisa para vender e gerenciar"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="rounded-[28px] border-2 border-[var(--foreground)] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--red)]"
            >
              <span className="text-3xl">{b.emoji}</span>
              <h3 className="mt-3 text-lg font-bold">{b.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative border-y-2 border-[var(--foreground)] bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
          <div>
            <SectionTitle
              kicker="Um link, qualquer destino"
              title="A placa é a mesma. O destino você decide."
              align="left"
            />
            <p className="mt-4 text-lg text-neutral-600">
              Hoje avaliação no Google, amanhã o cardápio, o Instagram ou a
              promoção da semana. Seu cliente ganha uma placa que acompanha o
              negócio, e você ganha um motivo a mais para ele continuar com
              você.
            </p>
          </div>
          <LinkSwapDemo />
        </div>
      </section>

      <section
        id="preco"
        className="relative mx-auto max-w-6xl scroll-mt-20 px-6 py-20"
      >
        <SectionTitle
          kicker="Preço"
          title="Um plano simples, sem complicação"
        />
        <div className="mx-auto mt-10 max-w-md rounded-[32px] border-2 border-[var(--foreground)] bg-white p-8 shadow-[10px_10px_0_0_var(--red)]">
          <span className="rounded-full bg-[var(--red-soft)] px-3 py-1 text-xs font-bold tracking-widest text-[var(--red-dark)] uppercase">
            Plano Vendedor
          </span>
          <p className="mt-5 flex items-baseline gap-1">
            <span className="text-6xl font-bold tracking-tight">
              {PLAN_PRICE}
            </span>
            <span className="text-lg font-bold text-neutral-500">/mês</span>
          </p>
          <ul className="mt-6 space-y-3">
            {PLAN_ITEMS.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </ul>
          <div className="mt-8">
            <CtaButton href={subscribeUrl} full>
              Quero assinar
            </CtaButton>
          </div>
          <p className="mt-3 text-center text-xs text-neutral-500">
            Assinatura e liberação do acesso pelo WhatsApp.
          </p>
        </div>
      </section>

      <section
        id="duvidas"
        className="relative mx-auto max-w-3xl scroll-mt-20 px-6 py-16"
      >
        <SectionTitle kicker="Dúvidas" title="Perguntas frequentes" />
        <div className="mt-10 space-y-3">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border-2 border-[var(--foreground)] bg-white p-5 open:shadow-[4px_4px_0_0_var(--red)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                {item.q}
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--red-soft)] text-[var(--red-dark)] transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-neutral-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-[32px] border-2 border-[var(--foreground)] bg-[var(--red)] px-8 py-14 text-center text-white shadow-[8px_8px_0_0_var(--foreground)]">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Pronto para vender placas que valem mais?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Assine por {PLAN_PRICE}/mês e comece a cadastrar as placas dos seus
            clientes hoje.
          </p>
          <a
            href={subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full border-2 border-[var(--foreground)] bg-white px-6 py-3 font-bold text-[var(--foreground)] shadow-[4px_4px_0_0_var(--foreground)] transition hover:-translate-y-0.5"
          >
            Falar no WhatsApp →
          </a>
        </div>
      </section>

      <footer className="relative border-t-2 border-[var(--foreground)] bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-sm">
          <p className="font-bold">
            © {new Date().getFullYear()} {SITE_NAME}
          </p>
          <a
            href="/admin/login"
            className="font-bold text-[var(--red-dark)] hover:underline"
          >
            Acessar painel →
          </a>
        </div>
      </footer>
    </main>
  );
}

function CtaButton({
  href,
  children,
  small,
  full,
}: {
  href: string;
  children: React.ReactNode;
  small?: boolean;
  full?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block rounded-full bg-[var(--red)] text-center font-bold text-white shadow-[3px_3px_0_0_var(--foreground)] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--foreground)] active:translate-y-0 active:shadow-[1px_1px_0_0_var(--foreground)] ${
        small ? "px-4 py-2 text-sm" : "px-6 py-3"
      } ${full ? "w-full" : ""}`}
    >
      {children}
    </a>
  );
}

function SectionTitle({
  kicker,
  title,
  align = "center",
}: {
  kicker: string;
  title: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className="text-sm font-bold tracking-widest text-[var(--red-dark)] uppercase">
        {kicker}
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function ListItem({
  children,
  bad,
}: {
  children: React.ReactNode;
  bad?: boolean;
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          bad ? "bg-neutral-200 text-neutral-500" : "bg-[var(--red)] text-white"
        }`}
      >
        {bad ? "✕" : "✓"}
      </span>
      {children}
    </li>
  );
}
