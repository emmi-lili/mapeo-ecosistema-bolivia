import { BarChart3, Users, TrendingUp } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

/**
 * Product mockup placeholder.
 * ──────────────────────────────────────────────────────────────
 * TODO: Reemplaza este bloque por una captura real del dashboard.
 * Basta con poner tu imagen dentro del contenedor con `border` y `shadow`:
 *
 *   <img src="/dashboard.png" alt="Dashboard de Mapeo"
 *        className="w-full rounded-2xl" />
 * ──────────────────────────────────────────────────────────────
 */
export default function ProductMockup() {
  return (
    <section id="producto" className="relative pb-24">
      <div className="container-content relative">
        {/* Emerald glow behind the mockup */}
        <div
          aria-hidden
          className="emerald-glow pointer-events-none absolute inset-x-0 top-1/4 mx-auto h-[420px] w-[80%] opacity-60 blur-3xl"
        />

        <Reveal>
          <div className="relative mx-auto max-w-5xl rounded-4xl border border-subtle bg-surface p-2 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
            {/* Fake browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-white/10" />
              <span className="h-3 w-3 rounded-full bg-white/10" />
              <span className="h-3 w-3 rounded-full bg-white/10" />
            </div>

            {/* Dashboard placeholder body */}
            <div className="rounded-3xl border border-subtle bg-base p-5 sm:p-8">
              {/* Stat cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { icon: Users, label: "Usuarios activos", value: "12.480" },
                  { icon: TrendingUp, label: "Conversión", value: "4,8%" },
                  { icon: BarChart3, label: "Eventos hoy", value: "89.2k" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="card">
                    <div className="flex items-center gap-2 text-emerald-highlight">
                      <Icon size={18} />
                      <span className="text-xs uppercase tracking-wider text-body">
                        {label}
                      </span>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-heading">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Fake chart */}
              <div className="mt-4 card">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-heading">
                    Actividad últimos 30 días
                  </span>
                  <span className="text-xs text-body">+18,2%</span>
                </div>
                <div className="flex h-40 items-end gap-1.5 sm:gap-2">
                  {[38, 52, 44, 63, 55, 72, 60, 81, 70, 88, 76, 95].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-md bg-gradient-to-t from-emerald/20 to-emerald"
                        style={{ height: `${h}%` }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
