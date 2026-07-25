import { Check } from "lucide-react";
import { pricing } from "@/config/content";
import Reveal from "@/components/ui/Reveal";

export default function Pricing() {
  return (
    <section id="precios" className="py-24">
      <div className="container-content">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{pricing.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            {pricing.title}
          </h2>
          <p className="mt-4 text-body">{pricing.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start">
          {pricing.plans.map((plan, i) => (
            <Reveal
              key={plan.name}
              delay={i * 0.08}
              className={`relative flex flex-col rounded-4xl border p-8 ${
                plan.popular
                  ? "border-emerald bg-emerald/[0.04] shadow-[0_0_60px_-20px_rgba(16,185,129,0.6)] md:-mt-4 md:mb-4"
                  : "border-subtle bg-white/[0.02]"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald px-3 py-1 text-xs font-semibold text-base">
                  Popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-heading">{plan.name}</h3>
              <p className="mt-1 text-sm text-body">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-heading">
                  {plan.price}
                </span>
                <span className="text-body">{plan.period}</span>
              </div>

              <a
                href={plan.cta.href}
                className={`mt-6 w-full ${
                  plan.popular ? "btn-primary" : "btn-secondary"
                }`}
              >
                {plan.cta.label}
              </a>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm">
                    <Check
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-highlight"
                    />
                    <span className="text-body">{feat}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
