"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X, CheckCircle2, Loader2 } from "lucide-react";
import { EBOOK_LIMITS } from "@/lib/ebook-security";

/**
 * Hero CTA + lead-capture modal con protecciones anti-abuso:
 * honeypot, tiempo mínimo de llenado, cooldown local y API rate-limited.
 */

type Status = "idle" | "sending" | "done" | "error";

const COOLDOWN_KEY = "mapeo:ebook-cooldown";

/** Archivo servido desde /public. Cambia el nombre aquí si tu PDF se llama distinto. */
const EBOOK_FILE = "/Ebook_Mapeo_Crypto_Blockchain_Bolivia_2026.pdf";

function downloadEbook() {
  const a = document.createElement("a");
  a.href = encodeURI(EBOOK_FILE);
  a.download = "Ebook_Mapeo_Crypto_Blockchain_Bolivia_2026.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function cooldownActive(): boolean {
  try {
    const raw = localStorage.getItem(COOLDOWN_KEY);
    if (!raw) return false;
    return Date.now() < Number(raw);
  } catch {
    return false;
  }
}

function setCooldown() {
  try {
    localStorage.setItem(
      COOLDOWN_KEY,
      String(Date.now() + EBOOK_LIMITS.clientCooldownMs),
    );
  } catch {
    /* private mode */
  }
}

export default function EbookModal({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const openedAt = useRef(0);
  const submitting = useRef(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function openModal() {
    if (cooldownActive()) {
      setError("Ya pediste el ebook hace poco. Revisa tus descargas.");
      setStatus("error");
      setOpen(true);
      openedAt.current = Date.now();
      return;
    }
    openedAt.current = Date.now();
    setStatus("idle");
    setError("");
    setOpen(true);
  }

  function close() {
    setOpen(false);
    setTimeout(() => {
      setStatus("idle");
      setError("");
      setName("");
      setEmail("");
      setWebsite("");
      submitting.current = false;
    }, 250);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting.current || status === "sending") return;
    submitting.current = true;
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          website, // honeypot - debe ir vacío
          openedAt: openedAt.current,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!res.ok) {
        setError(data.error || "No se pudo enviar. Intenta más tarde.");
        setStatus("error");
        submitting.current = false;
        return;
      }

      setCooldown();
      setStatus("done");
      downloadEbook();
    } catch {
      setError("Error de red. Revisa tu conexión e intenta de nuevo.");
      setStatus("error");
      submitting.current = false;
    }
  }

  return (
    <>
      <button
        onClick={openModal}
        className="btn-primary px-7 py-3 text-base"
      >
        {label}
        <Download size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={close}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-md rounded-4xl border border-subtle bg-surface p-8 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                aria-hidden
                className="emerald-glow pointer-events-none absolute -top-10 left-1/2 h-40 w-64 -translate-x-1/2 opacity-50 blur-2xl"
              />

              <button
                onClick={close}
                aria-label="Cerrar"
                className="absolute right-5 top-5 text-body transition-colors hover:text-heading"
              >
                <X size={20} />
              </button>

              {status === "done" ? (
                <div className="relative flex flex-col items-center text-center">
                  <CheckCircle2 size={44} className="text-accent-gradient" />
                  <h3 className="mt-4 text-xl font-semibold text-heading">
                    ¡Listo, {name.split(" ")[0] || "crack"}!
                  </h3>
                  <p className="mt-2 text-sm text-body">
                    Tu descarga comenzó. Si no arrancó sola, dale al botón de
                    abajo.
                  </p>
                  <button
                    onClick={downloadEbook}
                    className="btn-primary mt-6 w-full"
                  >
                    Descargar ebook
                    <Download size={18} />
                  </button>
                  <button onClick={close} className="btn-secondary mt-3 w-full">
                    Cerrar
                  </button>
                </div>
              ) : status === "error" && !name && !email ? (
                <div className="relative flex flex-col items-center text-center">
                  <h3 className="text-xl font-semibold text-heading">
                    Espera un momento
                  </h3>
                  <p className="mt-2 text-sm text-body">{error}</p>
                  <button onClick={close} className="btn-secondary mt-6 w-full">
                    Entendido
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-subtle bg-emerald/10 text-[#56bfc8]">
                    <Download size={20} />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-heading">
                    Descarga el ebook
                  </h3>
                  <p className="mt-2 text-sm text-body">
                    Déjanos tu nombre y correo y el reporte del ecosistema
                    cripto boliviano se descarga al instante.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    {/* Honeypot - oculto a humanos, visible a bots naive */}
                    <div
                      aria-hidden
                      className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden opacity-0"
                      tabIndex={-1}
                    >
                      <label htmlFor="ebook-website">Website</label>
                      <input
                        id="ebook-website"
                        name="website"
                        type="text"
                        autoComplete="off"
                        tabIndex={-1}
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="ebook-name"
                        className="mb-1.5 block text-sm text-body"
                      >
                        Nombre
                      </label>
                      <input
                        id="ebook-name"
                        type="text"
                        required
                        maxLength={EBOOK_LIMITS.maxNameLen}
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                        className="w-full rounded-xl border border-subtle bg-base px-4 py-2.5 text-sm text-heading placeholder:text-body/60 focus:border-emerald focus:outline-none focus:ring-1 focus:ring-emerald"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="ebook-email"
                        className="mb-1.5 block text-sm text-body"
                      >
                        Email
                      </label>
                      <input
                        id="ebook-email"
                        type="email"
                        required
                        maxLength={EBOOK_LIMITS.maxEmailLen}
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@correo.com"
                        className="w-full rounded-xl border border-subtle bg-base px-4 py-2.5 text-sm text-heading placeholder:text-body/60 focus:border-emerald focus:outline-none focus:ring-1 focus:ring-emerald"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-400" role="alert">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-primary w-full py-3 disabled:opacity-70"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Enviando…
                        </>
                      ) : (
                        <>
                          Enviar y descargar
                          <Download size={18} />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="mt-4 text-center text-xs text-body/70">
                    No compartimos tu correo. El reporte se descarga al instante.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
