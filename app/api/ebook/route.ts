import { NextRequest, NextResponse } from "next/server";
import {
  EBOOK_LIMITS,
  checkEmailRateLimit,
  checkIpRateLimit,
  isFillTimeValid,
  isHoneypotClean,
  sanitizeEmail,
  sanitizeName,
} from "@/lib/ebook-security";

export const runtime = "nodejs";

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) {
    // Prefiere Origin; sin Origin (curl) lo dejamos pasar solo en dev
    return process.env.NODE_ENV !== "production";
  }
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) {
    return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  }

  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Content-Type inválido." }, { status: 415 });
  }

  const raw = await req.text();
  if (raw.length > EBOOK_LIMITS.maxBodyBytes) {
    return NextResponse.json({ error: "Solicitud demasiado grande." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  // Honeypot: los bots suelen rellenar campos ocultos
  if (!isHoneypotClean(body.website) || !isHoneypotClean(body.company)) {
    // Respuesta falsa de éxito para no enseñar el filtro
    return NextResponse.json({ ok: true });
  }

  if (!isFillTimeValid(body.openedAt)) {
    return NextResponse.json(
      { error: "Envío demasiado rápido. Intenta de nuevo." },
      { status: 429 },
    );
  }

  const name = sanitizeName(body.name);
  const email = sanitizeEmail(body.email);
  if (!name || !email) {
    return NextResponse.json({ error: "Nombre o email inválidos." }, { status: 400 });
  }

  const ip = clientIp(req);
  const ipLimit = checkIpRateLimit(ip);
  if (!ipLimit.ok) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Prueba más tarde." },
      {
        status: 429,
        headers: { "Retry-After": String(ipLimit.retryAfterSec) },
      },
    );
  }

  const emailLimit = checkEmailRateLimit(email);
  if (!emailLimit.ok) {
    return NextResponse.json(
      { error: "Este correo ya pidió el ebook recientemente." },
      {
        status: 429,
        headers: { "Retry-After": String(emailLimit.retryAfterSec) },
      },
    );
  }

  // ── MOCK envío ──────────────────────────────────────────
  // Conectar aquí Resend / Mailchimp / etc.
  // await sendEbook({ name, email });
  await new Promise((r) => setTimeout(r, 400));
  // ───────────────────────────────────────────────────────

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ error: "Método no permitido." }, { status: 405 });
}
