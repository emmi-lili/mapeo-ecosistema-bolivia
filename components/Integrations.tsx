import { integrations } from "@/config/content";
import Reveal from "@/components/ui/Reveal";

/**
 * Grayscale logo grid, grouped by "Con código" / "Sin código".
 * Replace the text placeholders with real logo SVGs/PNGs (kept in grayscale).
 */
export default function Integrations() {
  return (
    <section id="integraciones" className="py-24">
      <div className="container-content">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{integrations.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            {integrations.title}
          </h2>
          <p className="mt-4 text-body">{integrations.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
          {integrations.groups.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 0.08}>
              <p className="mb-5 text-center text-sm font-medium uppercase tracking-wider text-body md:text-left">
                {group.label}
              </p>
              <div className="grid grid-cols-3 gap-3">
                {group.logos.map((logo) => (
                  <div
                    key={logo}
                    className="flex h-20 items-center justify-center rounded-2xl border border-subtle bg-white/[0.02] text-sm font-medium text-white/40 grayscale transition hover:text-white/70"
                  >
                    {/* TODO: reemplaza por el logo real (SVG en grayscale) */}
                    {logo}
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
