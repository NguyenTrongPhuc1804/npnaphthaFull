import React from "react";

export default function FacebookWidget() {
  return (
    <div className="fixed lg:w-[60px] w-[50px] lg:h-[60px] h-[50px] bottom-28 right-[1rem] z-10 bg-white rounded-full overflow-hidden cursor-pointer">
      <img
        className="w-full h-full "
        src={require("../../assets/images/facebook1.svg")}
      />
    </div>
  );
}
