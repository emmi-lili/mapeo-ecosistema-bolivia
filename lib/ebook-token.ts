import { createHmac, timingSafeEqual } from "node:crypto";

const TTL_MS = 60 * 1000; // 1 minuto: suficiente para bajar, corto para no reusar el link

function secret(): string {
  const s = process.env.EBOOK_DOWNLOAD_SECRET;
  if (s && s.length >= 16) return s;
  if (process.env.NODE_ENV === "production") {
    throw new Error("Falta EBOOK_DOWNLOAD_SECRET (mín. 16 chars)");
  }
  return "dev-only-ebook-secret-change-me";
}

/** Token firmado de corta vida para descargar el PDF. */
export function mintDownloadToken(email: string): string {
  const exp = Date.now() + TTL_MS;
  const payload = `${email.toLowerCase()}.${exp}`;
  const sig = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyDownloadToken(token: string): { ok: true; email: string } | { ok: false } {
  const parts = token.split(".");
  if (parts.length !== 3) return { ok: false };
  const [email, expStr, sig] = parts;
  const exp = Number(expStr);
  if (!email || !Number.isFinite(exp) || Date.now() > exp) return { ok: false };

  const payload = `${email}.${expStr}`;
  const expected = createHmac("sha256", secret()).update(payload).digest("base64url");

  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return { ok: false };
  } catch {
    return { ok: false };
  }

  return { ok: true, email };
}

export const EBOOK_FILENAME = "Ebook_Mapeo_2026.pdf";
