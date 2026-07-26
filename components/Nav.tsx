"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { nav } from "@/config/content";
import Logo from "@/components/ui/Logo";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-subtle bg-base/70 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        className={`container-content flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        {/* Logo + edition chip */}
        <div className="flex items-center gap-3">
          <a href="#" aria-label={`${nav.cta.label}, inicio`}>
            <Logo markSize={scrolled ? 26 : 32} />
          </a>
          <span className="hidden items-center gap-3 lg:flex">
            <span className="h-4 w-px bg-white/10" />
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
              {nav.edition}
            </span>
          </span>
        </div>

        {/* Right group: links · divider · CTA */}
        <div className="hidden items-center gap-7 md:flex">
          {nav.links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <span className="h-5 w-px bg-white/10" />
          <a href={nav.cta.href} className="btn-primary">
            {nav.cta.label}
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-heading md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Reading-progress hairline */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-accent"
      />

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-subtle bg-base/95 backdrop-blur-xl md:hidden">
          <div className="container-content flex flex-col gap-4 py-6">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base text-body transition-colors hover:text-heading"
              >
                {link.label}
              </a>
            ))}
            <a
              href={nav.cta.href}
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full"
            >
              {nav.cta.label}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
