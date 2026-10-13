import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "rx" | "otc" | "discount" | "success" | "neutral";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "neutral",
  size = "sm",
  className = "",
}: BadgeProps) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs font-semibold" : "px-3 py-1 text-sm font-semibold";

  const variantClasses = {
    rx: "bg-red-50 text-red-700 border border-red-200/80 shadow-sm",
    otc: "bg-brand-mint text-brand-primary border border-brand-emerald/20 shadow-sm",
    discount: "bg-amber-50 text-amber-800 border border-amber-200 font-bold",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    neutral: "bg-gray-100 text-gray-700 border border-gray-200",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full uppercase tracking-wider transition-all duration-200 ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
}
