import React from "react";

export function Button({ className = "", variant = "default", size = "md", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B07D3A]/40 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-[#B07D3A] text-white hover:bg-[#8F6530] shadow-sm hover:shadow-md",
    outline:
      "border-2 border-[#B07D3A] bg-transparent text-[#B07D3A] hover:bg-[rgba(176,125,58,0.07)]",
    ghost: "hover:bg-[var(--bg-elev2)] text-[var(--text)]",
  };
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10",
  };
  const v = variants[variant] ?? variants.default;
  const s = sizes[size] ?? sizes.md;
  return <button className={`${base} ${v} ${s} ${className}`} {...props} />;
}
