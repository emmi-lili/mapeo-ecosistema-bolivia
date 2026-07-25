/* eslint-disable @next/next/no-img-element */

/**
 * Overlapping circular avatars + social-proof label.
 * Used in the hero and the final CTA. Swap the avatar URLs in config/content.ts.
 */

type AvatarRowProps = {
  avatars: string[];
  label: string;
  align?: "left" | "center";
};

export default function AvatarRow({
  avatars,
  label,
  align = "left",
}: AvatarRowProps) {
  return (
    <div
      className={`flex items-center gap-3 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <div className="flex -space-x-3">
        {avatars.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-9 w-9 rounded-full border-2 border-base object-cover"
            loading="lazy"
          />
        ))}
      </div>
      <p className="text-sm text-body">{label}</p>
    </div>
  );
}
