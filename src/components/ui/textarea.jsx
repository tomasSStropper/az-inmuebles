import React from "react";

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elev)] px-4 py-2 text-sm text-[var(--text)] outline-none focus:ring-2 focus:ring-[#C46542]/40 ${className}`}
      {...props}
    />
  );
}
