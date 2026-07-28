/**
 * Inserción de leads en Supabase vía su API REST (PostgREST).
 * Usa fetch en vez de @supabase/supabase-js para evitar el cliente Realtime,
 * que requiere WebSocket global (roto en Node < 22).
 * Usa la service_role key: solo servidor, salta RLS. NUNCA importar en cliente.
 */
const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export type InsertResult = { error: { message: string; code?: string } | null };

export async function insertEbookLead(row: {
  name: string;
  email: string;
  ip: string | null;
  user_agent: string | null;
}): Promise<InsertResult> {
  if (!url || !serviceKey) {
    return {
      error: { message: "Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY" },
    };
  }

  const res = await fetch(`${url}/rest/v1/ebook_leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (res.ok) return { error: null };

  let code: string | undefined;
  let message = `HTTP ${res.status}`;
  try {
    const body = (await res.json()) as { code?: string; message?: string };
    code = body.code;
    if (body.message) message = body.message;
  } catch {
    // cuerpo no-JSON: nos quedamos con el status
  }
  return { error: { message, code } };
}
