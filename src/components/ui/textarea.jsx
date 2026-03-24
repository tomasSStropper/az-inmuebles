import React from "react";

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full rounded border border-[rgba(255,255,255,0.12)] bg-[#161616] px-4 py-2 text-sm text-[#F0EDE6] outline-none placeholder:text-[#888073] focus:border-[#2D5A40] focus:ring-1 focus:ring-[#1A3A2A]/30 transition-colors resize-none ${className}`}
      {...props}
    />
  );
}
