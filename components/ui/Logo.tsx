import Image from "next/image";
import { site } from "@/config/content";

/**
 * Brand logo - logo.png (globe/network + location pin) + wordmark.
 * The PNG ships on a black background; `mix-blend-screen` drops that black
 * against the dark site background, leaving just the white mark.
 */
export default function Logo({
  className = "",
  markSize = 30,
}: {
  className?: string;
  markSize?: number;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo.png"
        alt={site.name}
        width={markSize}
        height={markSize}
        priority
        className="shrink-0 mix-blend-screen"
        style={{ width: markSize, height: markSize }}
      />
      <span className="font-display text-[1.15rem] font-bold leading-none tracking-tight text-heading">
        {site.name}
      </span>
    </span>
  );
}
