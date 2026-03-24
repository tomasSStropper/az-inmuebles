import React from "react";

export function Button({ className = "", variant = "default", size = "md", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded font-medium transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-[#C8A96E]/50 disabled:opacity-40 disabled:pointer-events-none";
  const variants = {
    default: "bg-[#C8A96E] text-[#0D0D0D] hover:bg-[#A88848]",
    outline:
      "border border-[rgba(255,255,255,0.15)] bg-transparent text-[#F0EDE6] hover:border-[#C8A96E] hover:text-[#C8A96E]",
    ghost: "hover:bg-[#1C1C1C] text-[#F0EDE6]",
  };
  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-9 px-4 text-sm",
    lg: "h-11 px-6 text-sm",
    icon: "h-9 w-9",
  };
  const v = variants[variant] ?? variants.default;
  const s = sizes[size] ?? sizes.md;
  return <button className={`${base} ${v} ${s} ${className}`} {...props} />;
}
