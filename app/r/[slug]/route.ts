import { NextRequest, NextResponse } from "next/server";
import { getLinkBySlug, incrementClicks } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const link = await getLinkBySlug(slug);

  if (!link || !link.active) {
    return NextResponse.redirect(new URL("/r/nao-encontrado", request.url));
  }

  await incrementClicks(slug);

  // 302 (não permanente): o navegador nunca guarda o destino em cache,
  // então o mesmo QR/NFC continua válido mesmo depois de trocar o link.
  return NextResponse.redirect(link.destinationUrl, { status: 302 });
}
