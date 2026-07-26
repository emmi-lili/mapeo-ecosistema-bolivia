import { hero } from "@/config/content";
import Reveal from "@/components/ui/Reveal";
import { Ripple } from "@/components/ui/Ripple";
import Sparkline from "@/components/ui/Sparkline";
import EbookModal from "@/components/EbookModal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24">
      {/* Signature effect: animated ripple (no extra glow — one effect only) */}
      <Ripple
        className="opacity-90"
        mainCircleSize={240}
        mainCircleOpacity={0.5}
        numCircles={9}
      />

      <div className="container-content relative flex flex-col items-center text-center">
        <Reveal>
          <h1 className="mx-auto max-w-4xl text-balance font-display text-3xl font-bold leading-[1.12] tracking-tight text-heading sm:text-5xl">
            {hero.titleLine1}{" "}
            <span className="text-emerald-highlight">{hero.titleLine2}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">
            {hero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-9 flex flex-col items-center gap-3">
            <EbookModal label={hero.cta.label} />
            <p className="text-sm text-body">{hero.microcopy}</p>
          </div>
        </Reveal>

        {/* Cifras destacadas */}
        <Reveal delay={0.24} className="mt-14 w-full">
          <dl className="mx-auto grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-subtle bg-white/[0.06] sm:grid-cols-4">
            {hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="relative flex flex-col items-center gap-1 overflow-hidden bg-base px-4 py-6"
              >
                {stat.spark && (
                  <Sparkline className="absolute inset-x-0 bottom-0 h-10 w-full opacity-60" />
                )}
                <dt className="relative font-display text-2xl font-bold tabular-nums tracking-tight text-emerald-highlight sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="relative text-xs leading-snug text-body">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Trust strip — fuentes oficiales */}
        <Reveal delay={0.3}>
          <div className="mt-8 flex items-center gap-4">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/35">
              {hero.sourcesLabel}
            </span>
            <div className="flex items-center gap-3">
              {hero.sources.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-subtle px-2.5 py-1 font-display text-xs font-semibold tracking-wide text-white/50"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
