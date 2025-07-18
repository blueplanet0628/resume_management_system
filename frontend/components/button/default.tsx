'use client';

import Link from "next/link";

interface DefaultButtonProps {
    label: string;
    variant: "primary" | "secondary";
    rounded: boolean;
    href?: string;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export default function DefaultButton({
    label,
    variant,
    rounded,
    href,
    className,
    onClick,
    disabled,
}: DefaultButtonProps) {
    return href ? (
        <Link
            href={href}
            className={`px-8 py-2 flex items-center justify-center gap-x-2 ${rounded ? "rounded-full" : "rounded-lg"} ${variant === "primary" ? "bg-[#FF733E] text-white" : "border-border-gray border border-solid bg-white text-black"} relative ${className ?? ""} hover:bg-orange-70 active:bg-orange-60 hover:text-primary-active`}
        >
            {label}
        </Link>
    ) : (
        <button
            disabled={disabled}
            className={`px-8 py-2 flex items-center justify-center gap-x-2 ${rounded ? "rounded-full" : "rounded-lg"} ${variant === "primary" ? "bg-[#FF733E] text-white" : "border-border-gray border border-solid bg-white text-black"} relative ${className ?? ""} hover:bg-orange-70 active:bg-orange-60 hover:text-primary-active`}
            onClick={onClick}
        >
            {label}
        </button>
    )
}
