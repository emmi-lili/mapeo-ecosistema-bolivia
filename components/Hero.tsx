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
          <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-heading sm:text-6xl">
            {hero.titleLine1}
            <br className="hidden sm:block" />{" "}
            <span className="text-emerald-highlight">{hero.titleLine2}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-body">
            {hero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-9 flex flex-col items-center gap-3">
            <EbookModal label={hero.cta.label} />
            <p className="text-sm text-body">{hero.microcopy}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
