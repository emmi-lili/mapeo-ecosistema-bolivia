"use client";

import { useEffect, useState } from "react";
import { Menu, X, Activity } from "lucide-react";
import { nav, site } from "@/config/content";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-subtle bg-base/70 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="container-content flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald text-base">
            <Activity size={18} strokeWidth={2.5} />
          </span>
          <span className="text-lg font-semibold tracking-tight text-heading">
            {site.name}
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-body transition-colors hover:text-heading"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a href={nav.cta.href} className="btn-primary">
            {nav.cta.label}
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
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
