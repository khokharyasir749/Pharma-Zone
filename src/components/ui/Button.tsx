import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs font-semibold rounded-lg",
    md: "px-4 py-2.5 text-sm font-semibold rounded-xl",
    lg: "px-6 py-3.5 text-base font-bold rounded-2xl",
  }[size];

  const variantClasses = {
    primary:
      "bg-brand-primary text-white hover:bg-brand-dark active:scale-[0.98] shadow-md shadow-brand-primary/20",
    secondary:
      "bg-brand-mint text-brand-primary hover:bg-brand-mint/80 active:scale-[0.98]",
    outline:
      "border-2 border-brand-primary text-brand-primary hover:bg-brand-mint/50 active:scale-[0.98]",
    ghost:
      "text-slate-600 hover:text-brand-primary hover:bg-slate-100 active:scale-[0.98]",
    accent:
      "bg-brand-accent text-white hover:bg-brand-emerald active:scale-[0.98] shadow-md shadow-brand-accent/25",
  }[variant];

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
