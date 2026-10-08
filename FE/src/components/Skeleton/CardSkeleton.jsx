import React from "react";

export default function CardSkeleton({ count = 8 }) {
  return Array.from({ length: count }).map((_, idx) => (
    <div
      key={idx}
      className="overflow-hidden rounded-2xl border border-ink-line bg-white"
      aria-hidden="true"
    >
      <div className="skeleton aspect-[4/3] !rounded-none" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-4 w-4/5" />
        <div className="skeleton h-4 w-2/5" />
      </div>
    </div>
  ));
}
