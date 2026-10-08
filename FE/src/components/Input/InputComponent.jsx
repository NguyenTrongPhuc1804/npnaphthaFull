import { Input } from "@material-tailwind/react";
import { useState } from "react";

export default function InputComponent({
  isPassword,
  title,
  register,
  messErr,
  isNumber,
  example,
}) {
  const [showPass, setShowPass] = useState(isPassword ? true : false);
  return (
    <div className="w-full">
      <p className="mb-1.5 text-sm font-semibold text-ink">
        {title}{" "}
        {example && (
          <span className="font-normal text-ink-muted">VD: {example}</span>
        )}
      </p>
      <div className="relative w-full min-w-[200px]">
        <Input
          {...register}
          autoComplete="off"
          type={showPass ? "password" : isNumber ? "tel" : "text"}
          placeholder={title}
          className="!border !border-ink-line bg-white !text-sm text-ink placeholder:!text-slate-400 placeholder:opacity-100 focus:!border-brand-500"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          containerProps={{ className: "min-w-0" }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            aria-label={showPass ? "Hiện mật khẩu" : "Ẩn mật khẩu"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
          >
            <i
              className={showPass ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
              aria-hidden="true"
            ></i>
          </button>
        )}
      </div>
      {messErr && <p className="field-error">{messErr}</p>}
    </div>
  );
}
