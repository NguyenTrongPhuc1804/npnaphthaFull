import React from "react";

export default function BoxComponent({ children }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4  grid-cols-1 place-items-center">
      {children}
    </div>
  );
}
