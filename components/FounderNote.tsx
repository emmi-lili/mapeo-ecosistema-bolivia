/* eslint-disable @next/next/no-img-element */
import { founder } from "@/config/content";
import Reveal from "@/components/ui/Reveal";

export default function FounderNote() {
  return (
    <section className="bg-surface py-24">
      <div className="container-content">
        <Reveal className="mx-auto max-w-3xl">
          <div className="relative rounded-4xl border border-subtle bg-base p-8 sm:p-12">
            {/* Subtle glow */}
            <div
              aria-hidden
              className="emerald-glow pointer-events-none absolute -left-10 -top-10 h-48 w-48 opacity-40 blur-2xl"
            />

            <div className="relative">
              <span className="eyebrow">{founder.eyebrow}</span>

              <div className="mt-8 space-y-5 text-lg leading-relaxed text-body">
                {founder.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <img
                  src={founder.photo}
                  alt={founder.name}
                  className="h-14 w-14 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-heading">{founder.name}</p>
                  <p className="text-sm text-body">{founder.role}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
