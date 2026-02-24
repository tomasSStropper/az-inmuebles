import React from "react";

export function Badge({ className = "", variant = "default", ...props }) {
  const variants = {
    default: "bg-black text-white",
    secondary: "bg-gray-100 text-gray-900",
    outline: "border border-gray-300 bg-white text-gray-900",
  };
  const v = variants[variant] ?? variants.default;
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${v} ${className}`}
      {...props}
    />
  );
}
