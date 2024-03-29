import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
export default function InputComponent({
  isPassword,
  title,
  register,
  messErr,
  isNumber,
}) {
  const [showPass, setShowPass] = useState(isPassword ? true : false);
  return (
    <div className="">
      <p className="text-base">{title}</p>
      <div className="relative w-full min-w-[200px] h-10">
        <Input
          {...register}
          autoComplete="name"
          type={showPass ? "password" : isNumber ? "tel" : "text"}
          placeholder={title}
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 flex justify-center items-center"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        {isPassword ? (
          <div
            onClick={() => setShowPass(!showPass)}
            className="cursor-pointer absolute grid w-5 h-5 place-items-center  text-blue-gray-500  top-[30%] right-3 "
          >
            <i
              className={showPass ? `fa-solid fa-eye` : "fa-solid fa-eye-slash"}
              aria-hidden="true"
            ></i>
          </div>
        ) : (
          ""
        )}
        {messErr && <p className="text-base text-red-400">{messErr}</p>}
      </div>
    </div>
  );
}
