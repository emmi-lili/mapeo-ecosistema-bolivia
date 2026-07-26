/**
 * Protección del endpoint de descarga del ebook.
 * Rate limit en memoria (ok para un solo proceso; en multi-instancia usar Redis/Upstash).
 */

export const EBOOK_LIMITS = {
  maxNameLen: 80,
  minNameLen: 2,
  maxEmailLen: 254,
  maxBodyBytes: 2_048,
  /** Tiempo mínimo con el modal abierto antes de enviar (anti-bot instantáneo). */
  minFillMs: 2_500,
  /** Máx. intentos por IP en la ventana. */
  ipMax: 5,
  ipWindowMs: 60 * 60 * 1000, // 1 h
  /** Máx. envíos exitosos por email en la ventana. */
  emailMax: 2,
  emailWindowMs: 24 * 60 * 60 * 1000, // 24 h
  /** Cooldown en el navegador tras un envío OK. */
  clientCooldownMs: 60 * 60 * 1000, // 1 h
} as const;

type Bucket = { count: number; resetAt: number };

const ipBuckets = new Map<string, Bucket>();
const emailBuckets = new Map<string, Bucket>();

function prune(map: Map<string, Bucket>, now: number) {
  for (const [key, b] of Array.from(map.entries())) {
    if (b.resetAt <= now) map.delete(key);
  }
}

function hit(
  map: Map<string, Bucket>,
  key: string,
  max: number,
  windowMs: number,
  now: number,
): { ok: boolean; retryAfterSec: number } {
  prune(map, now);
  const existing = map.get(key);
  if (!existing || existing.resetAt <= now) {
    map.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSec: 0 };
  }
  if (existing.count >= max) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }
  existing.count += 1;
  return { ok: true, retryAfterSec: 0 };
}

export function checkIpRateLimit(ip: string) {
  return hit(ipBuckets, ip, EBOOK_LIMITS.ipMax, EBOOK_LIMITS.ipWindowMs, Date.now());
}

export function checkEmailRateLimit(email: string) {
  return hit(
    emailBuckets,
    email.toLowerCase(),
    EBOOK_LIMITS.emailMax,
    EBOOK_LIMITS.emailWindowMs,
    Date.now(),
  );
}

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function sanitizeName(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const name = raw.replace(/[\u0000-\u001F\u007F]/g, "").trim().replace(/\s+/g, " ");
  if (name.length < EBOOK_LIMITS.minNameLen || name.length > EBOOK_LIMITS.maxNameLen) {
    return null;
  }
  return name;
}

export function sanitizeEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const email = raw.trim().toLowerCase();
  if (email.length > EBOOK_LIMITS.maxEmailLen || !EMAIL_RE.test(email)) return null;
  // Bloquea dominios obviamente desechables / test comunes en spam
  const domain = email.split("@")[1] ?? "";
  const blocked = ["mailinator.com", "guerrillamail.com", "tempmail.com", "10minutemail.com"];
  if (blocked.includes(domain)) return null;
  return email;
}

export function isHoneypotClean(value: unknown): boolean {
  return value === undefined || value === null || value === "";
}

export function isFillTimeValid(openedAt: unknown): boolean {
  if (typeof openedAt !== "number" || !Number.isFinite(openedAt)) return false;
  const elapsed = Date.now() - openedAt;
  // Rechaza si es demasiado rápido o si el timestamp es del futuro / > 2h
  if (elapsed < EBOOK_LIMITS.minFillMs) return false;
  if (elapsed > 2 * 60 * 60 * 1000) return false;
  return true;
}
