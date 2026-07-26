import { site } from "@/config/content";

/**
 * Brand logo — a connected-nodes mark ("mapeo" = network/graph) + wordmark.
 * A real mark instead of a stock icon is the single biggest "pro" upgrade.
 */
export default function Logo({
  className = "",
  markSize = 26,
}: {
  className?: string;
  markSize?: number;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <g
          stroke="#10B981"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.9"
        >
          <path d="M5 8 L19 6" />
          <path d="M5 8 L12 19" />
          <path d="M19 6 L12 19" />
        </g>
        <circle cx="5" cy="8" r="2.4" fill="#34D399" />
        <circle cx="19" cy="6" r="2" fill="#10B981" />
        <circle cx="12" cy="19" r="2" fill="#10B981" />
      </svg>
      <span className="font-display text-[1.15rem] font-bold leading-none tracking-tight text-heading">
        {site.name}
      </span>
    </span>
  );
}
