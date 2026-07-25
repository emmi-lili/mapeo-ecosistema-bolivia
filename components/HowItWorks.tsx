import { howItWorks } from "@/config/content";
import Reveal from "@/components/ui/Reveal";

/**
 * Three alternating image/text blocks.
 * Replace the placeholder panel in each step with a real screenshot/illustration.
 */
export default function HowItWorks() {
  return (
    <section className="bg-surface py-24">
      <div className="container-content">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{howItWorks.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            {howItWorks.title}
          </h2>
          <p className="mt-4 text-body">{howItWorks.subtitle}</p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-16 sm:gap-24">
          {howItWorks.steps.map((step, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal
                key={step.number}
                className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                {/* Text */}
                <div className={reversed ? "lg:order-2" : ""}>
                  <span className="text-5xl font-bold text-emerald/30">
                    {step.number}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold text-heading">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-md text-body">{step.description}</p>
                </div>

                {/* Placeholder panel — replace with an image */}
                <div
                  className={`relative ${reversed ? "lg:order-1" : ""}`}
                >
                  <div
                    aria-hidden
                    className="emerald-glow pointer-events-none absolute inset-0 opacity-40 blur-2xl"
                  />
                  <div className="relative flex aspect-[4/3] items-center justify-center rounded-2xl border border-subtle bg-base">
                    <span className="text-sm text-body">
                      {/* TODO: imagen del paso {step.number} */}
                      Imagen paso {step.number}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
