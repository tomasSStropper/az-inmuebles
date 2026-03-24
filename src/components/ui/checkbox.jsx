import React from "react";

export function Checkbox({ checked, onCheckedChange, id }) {
  return (
    <input
      id={id}
      type="checkbox"
      checked={!!checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className="h-4 w-4 rounded-sm border border-[rgba(255,255,255,0.2)] bg-[#161616] text-[#C8A96E] focus:ring-[#C8A96E] focus:ring-1 accent-[#C8A96E]"
    />
  );
}
