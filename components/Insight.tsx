import { Lock } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

/**
 * Bloque de insight en prosa (eyebrow + titular grande + párrafos + nota).
 * Reutilizado por "El hallazgo central" y "Más que stablecoins".
 * La `note` marca lo que se revela solo en el ebook.
 */

type InsightProps = {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  note?: string;
  surface?: boolean;
};

export default function Insight({
  id,
  eyebrow,
  title,
  paragraphs,
  note,
  surface = false,
}: InsightProps) {
  return (
    <section id={id} className={`py-24 ${surface ? "bg-surface" : ""}`}>
      <div className="container-content">
        <Reveal className="mx-auto max-w-3xl">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-heading sm:text-4xl">
            {title}
          </h2>

          <div className="mt-6 space-y-4 text-lg leading-relaxed text-body">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {note && (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-subtle bg-emerald/[0.06] px-4 py-2 text-sm text-emerald-highlight">
              <Lock size={15} />
              {note}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
