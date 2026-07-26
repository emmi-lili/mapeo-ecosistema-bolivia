import { hero } from "@/config/content";
import Reveal from "@/components/ui/Reveal";
import { Ripple } from "@/components/ui/Ripple";
import EbookModal from "@/components/EbookModal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24">
      {/* Subtle emerald glow behind the hero */}
      <div
        aria-hidden
        className="emerald-glow pointer-events-none absolute left-1/2 top-0 h-[560px] w-[860px] -translate-x-1/2 -translate-y-1/4 opacity-70 blur-2xl"
      />
      {/* Animated ripple — sits above the glow, behind the content */}
      <Ripple
        className="opacity-90"
        mainCircleSize={240}
        mainCircleOpacity={0.5}
        numCircles={9}
      />

      <div className="container-content relative flex flex-col items-center text-center">
        <Reveal>
          <h1 className="mx-auto max-w-4xl text-balance text-3xl font-bold leading-[1.12] tracking-tight text-heading sm:text-5xl">
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
                className="flex flex-col items-center gap-1 bg-base px-4 py-6"
              >
                <dt className="text-2xl font-bold tracking-tight text-emerald-highlight sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="text-xs leading-snug text-body">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
