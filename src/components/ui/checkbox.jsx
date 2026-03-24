import React from "react";

export function Checkbox({ checked, onCheckedChange, id }) {
  return (
    <input
      id={id}
      type="checkbox"
      checked={!!checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className="h-4 w-4 rounded-sm border border-[rgba(255,255,255,0.2)] bg-[#161616] accent-[#1A3A2A] focus:ring-[#1A3A2A] focus:ring-1"
    />
  );
}
