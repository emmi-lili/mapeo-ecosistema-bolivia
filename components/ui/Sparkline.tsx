/**
 * Tiny inline sparkline (SVG) — an upward-trending line with a soft area fill.
 * Reads far more credible than a fake bar chart for a data report.
 */
export default function Sparkline({ className = "" }: { className?: string }) {
  // Normalised points (0–100 viewBox), gently accelerating upward.
  const line = "M0,34 L12,32 L24,30 L36,26 L48,24 L60,18 L72,14 L84,7 L100,2";
  const area = `${line} L100,40 L0,40 Z`;

  return (
    <svg
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spark-fill)" />
      <path
        d={line}
        fill="none"
        stroke="#34D399"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
