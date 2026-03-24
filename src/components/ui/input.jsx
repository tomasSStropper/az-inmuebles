import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-xl border border-[var(--border-strong)] bg-white px-4 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:ring-2 focus:ring-[#B07D3A]/30 focus:border-[#B07D3A] transition-colors ${className}`}
      {...props}
    />
  );
}
