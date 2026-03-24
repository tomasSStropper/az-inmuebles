import React from "react";

export function Badge({ className = "", variant = "default", ...props }) {
  const variants = {
    default: "bg-[#C8A96E] text-[#0D0D0D]",
    secondary: "bg-[#1C1C1C] text-[#F0EDE6] border border-[rgba(255,255,255,0.07)]",
    outline: "border border-[rgba(255,255,255,0.12)] bg-transparent text-[#888073]",
  };
  const v = variants[variant] ?? variants.default;
  return (
    <span
      className={`inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${v} ${className}`}
      {...props}
    />
  );
}
