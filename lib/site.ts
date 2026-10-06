export const SITE_NAME = "NFC OS";
export const PLAN_PRICE = "R$ 50";

export function whatsappUrl(): string {
  const number = process.env.WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
  const text = encodeURIComponent(
    `Olá! Quero assinar o plano de ${PLAN_PRICE}/mês do ${SITE_NAME}.`,
  );
  return number
    ? `https://wa.me/${number}?text=${text}`
    : `https://wa.me/?text=${text}`;
}
