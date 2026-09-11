import { NextRequest, NextResponse } from "next/server";
import { createLink, getLinkBySlug, listLinks } from "@/lib/db";
import { isValidSlug, slugify } from "@/lib/slug";

export async function GET() {
  const links = await listLinks();
  return NextResponse.json({ links });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const name = String(body.name ?? "").trim();
  const destinationUrl = String(body.destinationUrl ?? "").trim();
  let slug = slugify(String(body.slug ?? "") || name);

  if (!name) {
    return NextResponse.json({ error: "Nome é obrigatório." }, { status: 400 });
  }
  try {
    new URL(destinationUrl);
  } catch {
    return NextResponse.json(
      { error: "URL de destino inválida." },
      { status: 400 },
    );
  }
  if (!slug || !isValidSlug(slug)) {
    return NextResponse.json(
      { error: "Não foi possível gerar um link válido a partir do nome." },
      { status: 400 },
    );
  }

  const existing = await getLinkBySlug(slug);
  if (existing) {
    slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
  }

  const link = await createLink({ slug, name, destinationUrl });
  return NextResponse.json({ link }, { status: 201 });
}
