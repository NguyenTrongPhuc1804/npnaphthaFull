import React from "react";

export default function ZaloWidget() {
  return (
    <a
      href="https://zalo.me/0965383579"
      target="_blank"
      className="fixed lg:w-[60px] w-[50px] lg:h-[60px] h-[50px] bottom-28 right-[1rem] z-10 bg-white rounded-full overflow-hidden cursor-pointer"
    >
      <img
        className="w-full h-full scale-125"
        src={require("../../assets/images/zalo.png")}
      />
    </a>
  );
}
