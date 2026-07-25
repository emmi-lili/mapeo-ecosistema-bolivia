"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X, CheckCircle2, Loader2 } from "lucide-react";

/**
 * Hero CTA button + lead-capture modal.
 * Pide nombre y email y "envía" el reporte.
 *
 * ⚠️ MOCK: por ahora el envío está simulado (setTimeout). Para conectarlo de
 * verdad, reemplaza el cuerpo de `handleSubmit` por un fetch a tu endpoint /
 * servicio de email (Resend, Mailchimp, etc.).
 */

type Status = "idle" | "sending" | "done";

export default function EbookModal({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Cerrar con Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    // Resetear tras la animación de salida
    setTimeout(() => {
      setStatus("idle");
      setName("");
      setEmail("");
    }, 250);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    // ── MOCK ─────────────────────────────────────────────
    // Simula la llamada al backend / servicio de email.
    // Sustituir por:
    //   await fetch("/api/ebook", {
    //     method: "POST",
    //     body: JSON.stringify({ name, email }),
    //   });
    await new Promise((r) => setTimeout(r, 900));
    // ─────────────────────────────────────────────────────

    setStatus("done");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
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
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={close}
            />

            {/* Card */}
            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-md rounded-4xl border border-subtle bg-surface p-8 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Emerald glow */}
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
                  <CheckCircle2 size={44} className="text-emerald-highlight" />
                  <h3 className="mt-4 text-xl font-semibold text-heading">
                    ¡Listo, {name.split(" ")[0] || "crack"}!
                  </h3>
                  <p className="mt-2 text-sm text-body">
                    Enviamos el reporte a{" "}
                    <span className="text-heading">{email}</span>. Revisa tu
                    bandeja (y el spam, por si acaso).
                  </p>
                  <button onClick={close} className="btn-secondary mt-6 w-full">
                    Cerrar
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-subtle bg-emerald/10 text-emerald-highlight">
                    <Download size={20} />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-heading">
                    Descarga el ebook
                  </h3>
                  <p className="mt-2 text-sm text-body">
                    Déjanos tu nombre y correo y te enviamos el reporte del
                    ecosistema cripto boliviano.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@correo.com"
                        className="w-full rounded-xl border border-subtle bg-base px-4 py-2.5 text-sm text-heading placeholder:text-body/60 focus:border-emerald focus:outline-none focus:ring-1 focus:ring-emerald"
                      />
                    </div>

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
                    No compartimos tu correo. Solo te enviamos el reporte.
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
