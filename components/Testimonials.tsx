/* eslint-disable @next/next/no-img-element */
import { Quote } from "lucide-react";
import { testimonials } from "@/config/content";
import Reveal from "@/components/ui/Reveal";

export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="container-content">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{testimonials.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            {testimonials.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <Reveal key={t.handle} delay={i * 0.08} className="card flex flex-col">
              <Quote size={24} className="text-emerald" />
              <p className="mt-4 flex-1 text-body">“{t.quote}”</p>
              <div className="mt-6 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="text-sm font-medium text-heading">{t.name}</p>
                  <p className="text-sm text-body">{t.handle}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
