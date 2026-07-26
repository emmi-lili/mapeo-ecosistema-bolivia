import { Mail } from "lucide-react";
import { contact } from "@/config/content";
import Reveal from "@/components/ui/Reveal";

export default function Contact() {
  return (
    <section id={contact.id} className="bg-surface pb-20 pt-4">
      <div className="container-content">
        <Reveal className="mx-auto max-w-lg">
          <div className="rounded-2xl border border-subtle bg-base px-6 py-7 sm:px-8">
            <p className="section-label">
              <span className="section-label__num">05</span>
              <span className="h-px w-6 bg-white/15" />
              {contact.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-xl font-semibold tracking-tight text-heading">
              {contact.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-body">
              {contact.body}
            </p>
            <a
              href={contact.cta.href}
              className="btn-secondary mt-5 inline-flex"
            >
              <Mail size={16} />
              {contact.cta.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
