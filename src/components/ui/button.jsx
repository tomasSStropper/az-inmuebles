import React from "react";

export function Button({ className = "", variant = "default", size = "md", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-black text-white hover:opacity-90",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-900",
    ghost: "hover:bg-gray-100 text-gray-900",
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
