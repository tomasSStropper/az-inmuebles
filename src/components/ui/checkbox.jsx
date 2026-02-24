import React from "react";

export function Checkbox({ checked, onCheckedChange, id }) {
  return (
    <input
      id={id}
      type="checkbox"
      checked={!!checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className="h-5 w-5 rounded border-gray-300 text-[#C46542] focus:ring-[#C46542]"
    />
  );
}
