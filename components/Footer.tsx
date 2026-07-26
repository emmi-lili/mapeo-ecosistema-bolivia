import { footer } from "@/config/content";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-subtle bg-surface">
      <div className="container-content py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" aria-label="Inicio">
              <Logo />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-body">
              {footer.description}
            </p>
          </div>

          {/* Link columns */}
          {footer.columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-heading">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-body transition-colors hover:text-heading"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Aclaración (una sola vez) */}
        <p className="mt-12 text-xs italic text-body/70">{footer.aclaracion}</p>

        <div className="mt-6 border-t border-subtle pt-8">
          <p className="text-sm text-body">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
