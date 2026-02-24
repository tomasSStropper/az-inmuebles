import React from "react";

export function Badge({ className = "", variant = "default", ...props }) {
  const variants = {
    default: "bg-black text-white",
    secondary: "bg-[var(--bg-elev2)] text-[var(--text)]",
    outline: "border border-[var(--border-strong)] bg-[var(--bg-elev)] text-[var(--text)]",
  };
  const v = variants[variant] ?? variants.default;
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${v} ${className}`}
      {...props}
    />
  );
}
