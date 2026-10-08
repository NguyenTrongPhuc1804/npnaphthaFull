import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/reducer/UserSlice";
import logo from "../../assets/images/logo-cty.jpg";
import cover from "../../assets/images/image-nph.jpg";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Không được để trống mục này"),
    password: yup
      .string()
      .required("Không được để trống mục này")
      .test(
        "len",
        "Mật khẩu phải lớn hơn 5 kí tự",
        (val) => (val || "").length >= 5
      ),
  })
  .required();

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const value = await dispatch(loginUser(data));
      if (value.payload) navigate("/admin");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="mb-10 inline-flex items-center gap-3">
            <img
              src={logo}
              alt="NP NAPHTHA"
              className="h-12 w-12 rounded-xl object-cover"
            />
            <span className="text-lg font-bold text-ink">NP NAPHTHA</span>
          </Link>

          <h1 className="text-3xl font-bold text-ink">Đăng nhập</h1>
          <p className="mt-2 text-ink-muted">
            Vui lòng nhập email và mật khẩu để vào trang quản trị
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-8 space-y-5"
          >
            <div>
              <label htmlFor="login-email" className="field-label">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                className="field-input"
                {...register("email")}
              />
              {errors.email?.message && (
                <p role="alert" className="field-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="login-password" className="field-label">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  className="field-input !pr-12"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label={showPass ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
                >
                  <i
                    className={`fa-solid ${showPass ? "fa-eye" : "fa-eye-slash"}`}
                  />
                </button>
              </div>
              {errors.password?.message && (
                <p role="alert" className="field-error">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-brand-700"
          >
            <i className="fa-solid fa-arrow-left text-xs" />
            Về trang chủ
          </Link>
        </div>
      </section>

      <aside className="relative hidden overflow-hidden bg-brand-950 lg:block">
        <img
          src={cover}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/90 via-brand-900/80 to-brand-600/60" />
        <div className="relative flex h-full flex-col justify-end p-14">
          <h2 className="max-w-md text-4xl font-bold leading-tight text-white">
            Quản lý nội dung website NP NAPHTHA
          </h2>
          <p className="mt-4 max-w-md text-brand-100">
            Sản phẩm, tin tức, catalogue, banner và liên hệ khách hàng tại một nơi.
          </p>
        </div>
      </aside>
    </main>
  );
}

export default LoginPage;
