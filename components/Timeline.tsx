import { timeline } from "@/config/content";
import Reveal from "@/components/ui/Reveal";

/**
 * Mini regulatory timeline — a teaser (the full one lives in the ebook).
 * Horizontal stepper on desktop, vertical on mobile. Breaks the rhythm of
 * centered text sections and reads like a real report.
 */
export default function Timeline() {
  return (
    <section className="border-y border-subtle bg-surface py-16">
      <div className="container-content">
        <Reveal>
          <p className="section-label">
            <span className="section-label__num">01</span>
            <span className="h-px w-6 bg-white/15" />
            {timeline.label}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <ol className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.steps.map((step, i) => (
              <li key={step.year} className="relative">
                {/* Connector line (desktop) */}
                {i < timeline.steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-4 top-2 hidden h-px w-full bg-gradient-to-r from-emerald/40 to-transparent lg:block"
                  />
                )}
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <span className="h-3 w-3 rounded-full border border-emerald bg-emerald/20" />
                  <span className="absolute h-1.5 w-1.5 rounded-full bg-emerald-highlight" />
                </span>

                <p className="mt-4 font-display text-sm font-semibold tracking-wide text-emerald-highlight">
                  {step.year}
                </p>
                <p className="mt-1 font-medium text-heading">{step.title}</p>
                <p className="mt-1 text-sm leading-snug text-body">
                  {step.caption}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
