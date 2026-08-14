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
import { mintDownloadToken } from "@/lib/ebook-token";
import { insertEbookLead } from "@/lib/supabase";

export const runtime = "nodejs";

function storeLeadsEnabled(): boolean {
  if (process.env.EBOOK_STORE_LEADS === "false") return false;
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) {
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

  if (!isHoneypotClean(body.website) || !isHoneypotClean(body.company)) {
    return NextResponse.json({ ok: true, downloadUrl: null });
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

  // Guardar lead solo si la DB está habilitada (opcional).
  if (storeLeadsEnabled()) {
    const { error } = await insertEbookLead({
      name,
      email,
      ip: ip === "unknown" ? null : ip,
      user_agent: req.headers.get("user-agent")?.slice(0, 500) ?? null,
    });
    if (error && error.code !== "23505") {
      console.error("[ebook] insert error:", error.message);
      // No bloqueamos la descarga si falla el storage
    }
  }

  const token = mintDownloadToken(email);
  const downloadUrl = `/api/ebook/file?t=${encodeURIComponent(token)}`;

  return NextResponse.json({ ok: true, downloadUrl });
}

export async function GET() {
  return NextResponse.json({ error: "Método no permitido." }, { status: 405 });
}
