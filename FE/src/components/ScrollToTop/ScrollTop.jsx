import { Button } from "@material-tailwind/react";
import React from "react";

export default function ScrollTop() {
  return (
    <div className=" z-50 bottom-10 right-10 fixed">
      <Button onClick={() => window.scrollTo(0, 0)} color="red" size="lg">
        <i className="fa-solid fa-arrow-up"></i>
      </Button>
    </div>
  );
}
