import { Button } from "@material-tailwind/react";
import React from "react";

export default function ScrollTop() {
  return (
    <div className=" z-10 bottom-10 left-5 fixed">
      <Button onClick={() => window.scrollTo(0, 0)} color="blue" size="lg">
        <i className="fa-solid fa-arrow-up"></i>
      </Button>
    </div>
  );
}
