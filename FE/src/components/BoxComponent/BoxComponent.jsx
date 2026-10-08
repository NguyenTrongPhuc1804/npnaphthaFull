import React from "react";

export default function BoxComponent({ children, className = "" }) {
  return (
    <div
      className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 ${className}`}
    >
      {children}
    </div>
  );
}
