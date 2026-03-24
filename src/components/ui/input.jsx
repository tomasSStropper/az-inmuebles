import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded border border-[rgba(255,255,255,0.12)] bg-[#161616] px-4 py-2 text-sm text-[#F0EDE6] outline-none placeholder:text-[#888073] focus:border-[#C8A96E] focus:ring-1 focus:ring-[#C8A96E]/30 transition-colors ${className}`}
      {...props}
    />
  );
}
