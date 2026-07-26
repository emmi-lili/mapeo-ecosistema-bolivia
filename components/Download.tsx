import { Check } from "lucide-react";
import { download } from "@/config/content";
import Reveal from "@/components/ui/Reveal";
import EbookModal from "@/components/EbookModal";

export default function Download() {
  return (
    <section id={download.id} className="relative overflow-hidden py-28">
      {/* Emerald glow */}
      <div
        aria-hidden
        className="emerald-glow pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[720px] -translate-x-1/2 -translate-y-1/2 opacity-60 blur-2xl"
      />

      <div className="container-content relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{download.eyebrow}</span>
          <h2 className="mx-auto mt-5 max-w-xl text-balance text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            {download.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-10 max-w-lg">
          <div className="rounded-4xl border border-subtle bg-white/[0.02] p-8">
            <p className="text-sm font-medium text-heading">{download.intro}</p>
            <ul className="mt-5 space-y-3">
              {download.contents.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <Check
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-highlight"
                  />
                  <span className="text-body">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col items-center gap-3">
              <EbookModal label={download.cta.label} />
              <p className="text-sm text-body">{download.microcopy}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
