import React from "react";

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#C46542]/40 ${className}`}
      {...props}
    />
  );
}
