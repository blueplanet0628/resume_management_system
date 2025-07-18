'use client';

import Link from "next/link";

interface ButtonWithIconProps {
    label: string;
    variant: "primary" | "secondary";
    rounded: boolean;
    Icon?: React.FC;
    href?: string;
    className?: string;
    disabled?: boolean;
    isLoading?: boolean;
    onClick?: () => void;
}

export default function ButtonWithIcon({
    label,
    variant,
    rounded,
    Icon,
    href,
    disabled,
    isLoading,
    className,
    onClick,
}: ButtonWithIconProps) {
    return href ? (
        <Link
            href={href}
            className={`px-8 py-2 flex items-center justify-center gap-x-2 ${rounded ? "rounded-full" : "rounded-lg"} ${variant === "primary" ? "bg-[#FF733E] text-white" : "bg-white text-orange-deep"} shadow-md relative truncate cursor-pointer ${disabled && "opacity-50" } ${className ?? ""} hover:bg-orange-70 active:bg-orange-60 hover:text-primary-active`}
        >
            {label}
            {
                isLoading && (
                    <div className="border-gray-300 h-5 w-5 animate-spin rounded-full border-3 border-t-blue-600" />
                )
            }
            {Icon && (
                <div className="absolute right-2">
                    <Icon />
                </div>
            )}          
        </Link>
    ) : (
        <button
            className={`px-8 py-2 flex items-center justify-center gap-x-2 ${rounded ? "rounded-full" : "rounded-lg"} ${variant === "primary" ? "bg-[#FF733E] text-white" : "bg-white text-orange-deep"} shadow-md relative truncate cursor-pointer ${disabled && "bg-gray-70 text-gray-50" } hover:bg-orange-70 active:bg-orange-60 hover:text-primary-active ${className ?? ""}`}
            disabled={disabled}
            onClick={onClick}
        >   
            <span className="text-base flex flex-row gap-2 items-center">
                {label}
                {
                    isLoading && (
                        <div className="border-gray-300 h-5 w-5 animate-spin rounded-full border-4 border-t-red-70" />
                    )
                }
            </span>
            {Icon && (
                <div className="absolute right-2">
                    <Icon />
                </div>
            )}
        </button>
    )
}
