import { ArrowRight } from "lucide-react";
import { finalCta } from "@/config/content";
import Reveal from "@/components/ui/Reveal";
import AvatarRow from "@/components/ui/AvatarRow";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Emerald glow */}
      <div
        aria-hidden
        className="emerald-glow pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 opacity-70 blur-2xl"
      />

      <div className="container-content relative flex flex-col items-center text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-heading sm:text-5xl">
            {finalCta.title}
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-xl text-lg text-body">
            {finalCta.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-9 flex flex-col items-center gap-3">
            <a href={finalCta.cta.href} className="btn-primary px-7 py-3 text-base">
              {finalCta.cta.label}
              <ArrowRight size={18} />
            </a>
            <p className="text-sm text-body">{finalCta.microcopy}</p>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10">
            <AvatarRow
              avatars={finalCta.avatars}
              label={finalCta.socialLabel}
              align="center"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
