import { Zap, ShieldCheck, LineChart, Bell, type LucideIcon } from "lucide-react";
import { features } from "@/config/content";
import Reveal from "@/components/ui/Reveal";

// Map string names from the config to lucide icons.
const icons: Record<string, LucideIcon> = {
  Zap,
  ShieldCheck,
  LineChart,
  Bell,
};

export default function Features() {
  return (
    <section className="bg-surface py-24">
      <div className="container-content">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{features.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            {features.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.items.map((f, i) => {
            const Icon = icons[f.icon] ?? Zap;
            return (
              <Reveal key={f.title} delay={i * 0.06} className="card">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-subtle bg-emerald/10 text-emerald-highlight">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-heading">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  {f.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
