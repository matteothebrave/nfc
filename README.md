# Backoffice de Links NFC

Painel simples para gerenciar os links que ficam gravados nas placas NFC/QR
code dos comércios. Cada placa aponta para um link **fixo** (ex:
`https://seudominio.com/r/padaria-joao`), e esse link redireciona para o
destino que você configurar no painel (ex: página de avaliações do Google).

**A ideia central:** o link/QR code impresso na placa nunca muda. Se você
precisar trocar para onde ele aponta (ou o comércio mudar de página de
avaliações), você só edita o destino no painel — a placa física continua
funcionando para sempre, sem precisar imprimir um novo QR code.

## Como funciona

- `/admin` — painel protegido por senha, onde você cria e edita os links.
- `/r/<slug>` — a URL pública que vai gravada na placa NFC / impressa no QR
  code. Redireciona (302) para o destino configurado.
- O QR code exibido no painel é gerado a partir da URL `/r/<slug>` — como
  essa URL nunca muda, o QR code impresso também nunca precisa mudar.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000 — vai te levar para `/admin/login`.

Em desenvolvimento, os links são salvos num arquivo SQLite local
(`.data/app.db`, já ignorado pelo git). Não precisa configurar banco de dados
nenhum para testar.

A senha de admin e a chave de sessão já estão em `.env.local` (gerado
automaticamente). **Troque a senha** (`ADMIN_PASSWORD`) antes de usar de
verdade.

## Publicando na Vercel

1. Suba este projeto para um repositório no GitHub e importe na Vercel
   (https://vercel.com/new).
2. Em **Settings → Environment Variables**, adicione:
   - `ADMIN_PASSWORD` — a senha do painel.
   - `SESSION_SECRET` — uma string aleatória (gere com
     `openssl rand -hex 32`).
   - `DATABASE_URL` — connection string de um Postgres (veja abaixo).
3. Deploy.

### Banco de dados em produção

Localmente o projeto usa SQLite (arquivo), mas em produção na Vercel o
sistema de arquivos não é persistente — por isso é preciso um banco de
verdade. O projeto já está pronto para isso: basta definir `DATABASE_URL` que
ele passa a usar Postgres automaticamente (mesmo código, sem precisar mudar
nada).

Caminho mais simples: no seu projeto na Vercel, vá em **Storage → Create
Database → Postgres** (via marketplace, ex. Neon), e a Vercel te dá a
`DATABASE_URL` pronta para colar nas variáveis de ambiente.

### Domínio próprio

Depois de conectar um domínio próprio na Vercel, os links passam a ser algo
como `https://suamarca.com/r/padaria-joao` — é esse link que você grava nas
placas NFC e imprime como QR code.

## Estrutura

- `app/r/[slug]/route.ts` — redirecionamento público.
- `app/admin/` — painel (login + dashboard).
- `app/api/links/` — CRUD dos links (protegido por sessão de admin).
- `lib/db.ts` — camada de dados (SQLite local / Postgres em produção).
- `lib/auth.ts` — sessão simples por cookie assinado (HMAC).
