import Image from "next/image";
import iconNavy from "../../public/brand/logo-icon-navy.png";
import iconPaper from "../../public/brand/logo-icon-paper.png";

export default function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const src = variant === "dark" ? iconNavy : iconPaper;
  const textColor = variant === "dark" ? "text-navy-950" : "text-paper";

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image src={src} alt="" className="h-full w-auto" priority />
      <span className={`font-display text-xl tracking-tight ${textColor}`}>
        GROUP
      </span>
    </span>
  );
}
