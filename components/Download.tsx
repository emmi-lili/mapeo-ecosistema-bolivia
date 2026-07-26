import { Check } from "lucide-react";
import { download } from "@/config/content";
import Reveal from "@/components/ui/Reveal";
import EbookModal from "@/components/EbookModal";

export default function Download() {
  return (
    <section id={download.id} className="py-28">
      <div className="container-content">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="section-label">
            <span className="section-label__num">04</span>
            <span className="h-px w-6 bg-white/15" />
            {download.eyebrow}
          </p>
          <h2 className="mx-auto mt-5 max-w-xl text-balance font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl">
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
