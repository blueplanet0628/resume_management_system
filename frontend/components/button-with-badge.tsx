'use client';

import Link from "next/link";

interface ButtonWithBadgeProps {
  label: string;
  variant: "primary" | "secondary";
  rounded: boolean;
  badge: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export default function ButtonWithBadge({
  label,
  variant,
  rounded,
  badge,
  href,
  className,
  onClick,
}: ButtonWithBadgeProps) {
  const baseStyle = `px-8 py-2 flex items-center justify-center gap-x-2 shadow-xl relative cursor-pointer`;
  const radiusStyle = rounded ? "rounded-full" : "rounded-lg";
  const primaryStyle = "bg-[#FF8659] text-white hover:bg-orange-70 active:bg-orange-60";
  const secondaryStyle = "bg-white text-[#FF733E] hover:bg-orange-70 active:bg-orange-60";

  const finalStyle = `${baseStyle} ${radiusStyle} ${variant === "primary" ? primaryStyle : secondaryStyle} ${className ?? ""}`;

  const badgeEl = (
    <div className="absolute -top-4 px-6 py-1 rounded-full bg-black text-white text-xs">
      {badge}
    </div>
  );

  return href ? (
    <Link href={href} className={finalStyle}>
      {label}
      {badgeEl}
    </Link>
  ) : (
    <button className={finalStyle} onClick={onClick}>
      {label}
      {badgeEl}
    </button>
  );
}
