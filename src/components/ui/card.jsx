import React from "react";

export function Card({ className = "", ...props }) {
  return (
    <div
      className={`rounded bg-[#1C1C1C] border border-[rgba(255,255,255,0.07)] ${className}`}
      {...props}
    />
  );
}
export function CardHeader({ className = "", ...props }) {
  return <div className={`p-6 pb-3 ${className}`} {...props} />;
}
export function CardTitle({ className = "", ...props }) {
  return (
    <h3
      className={`text-base font-medium text-[#F0EDE6] ${className}`}
      {...props}
    />
  );
}
export function CardContent({ className = "", ...props }) {
  return <div className={`p-6 pt-2 ${className}`} {...props} />;
}
export function CardFooter({ className = "", ...props }) {
  return <div className={`p-6 pt-0 ${className}`} {...props} />;
}
