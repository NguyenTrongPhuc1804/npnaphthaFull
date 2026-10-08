import React from "react";
import zaloIcon from "../../assets/images/zalo.png";

export default function ZaloWidget() {
  return (
    <a
      href="https://zalo.me/0965383579"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Zalo"
      className="fixed bottom-[5.25rem] right-4 z-20 h-12 w-12 overflow-hidden rounded-full bg-white shadow-card ring-1 ring-ink-line transition-transform hover:scale-105 lg:h-14 lg:w-14"
    >
      <img className="h-full w-full scale-125" src={zaloIcon} alt="" />
    </a>
  );
}
