import { NextRequest, NextResponse } from "next/server";
import { deleteLink, updateLink } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const input: Partial<{
    name: string;
    destinationUrl: string;
    active: boolean;
  }> = {};

  if (body.name !== undefined) input.name = String(body.name).trim();
  if (body.destinationUrl !== undefined) {
    try {
      new URL(body.destinationUrl);
    } catch {
      return NextResponse.json(
        { error: "URL de destino inválida." },
        { status: 400 },
      );
    }
    input.destinationUrl = String(body.destinationUrl).trim();
  }
  if (body.active !== undefined) input.active = Boolean(body.active);

  const link = await updateLink(id, input);
  if (!link) {
    return NextResponse.json({ error: "Link não encontrado." }, { status: 404 });
  }
  return NextResponse.json({ link });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await deleteLink(id);
  return NextResponse.json({ ok: true });
}
