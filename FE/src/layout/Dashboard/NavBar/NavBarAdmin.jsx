import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getDataillUser,
  logoutUser,
} from "../../../redux/reducer/UserSlice";
import { showSideNav } from "../../../redux/reducer/LoadingSlice";
import { ADMIN_TITLES } from "../menu";
import fakeImage from "../../../../public/fake_image.jpg";

export default function NavBarAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { userInfo } = useSelector((state) => state.userSlice);
  const [showProfile, setShowProfile] = useState(false);
  const [infoUser, setInfoUser] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    dispatch(getDataillUser({ user_id: id }));
    try {
      setInfoUser(JSON.parse(localStorage.getItem("user_info")));
    } catch {
      setInfoUser(null);
    }
  }, []);

  // đóng menu tài khoản khi bấm ra ngoài hoặc đổi trang
  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  useEffect(() => setShowProfile(false), [pathname]);

  const title = ADMIN_TITLES[pathname.replace(/\/$/, "")] || "Quản trị";
  const roleLabel = infoUser?.role === "ADMIN" ? "Quản trị viên" : "Người dùng";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-ink-line bg-white/90 px-4 backdrop-blur lg:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={() => dispatch(showSideNav(true))}
          aria-label="Mở menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink-line text-ink hover:bg-brand-50 lg:hidden"
        >
          <i className="fa-solid fa-bars" />
        </button>
        <h1 className="truncate text-lg font-bold text-ink sm:text-xl">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          target="_blank"
          className="hidden items-center gap-2 rounded-xl border border-ink-line px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-brand-400 hover:text-brand-700 sm:inline-flex"
        >
          <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
          Xem website
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setShowProfile((v) => !v)}
            aria-expanded={showProfile}
            aria-haspopup="menu"
            className="flex items-center gap-2 rounded-full border border-ink-line bg-white py-1 pl-1 pr-3 transition-colors hover:bg-brand-50"
          >
            <img
              className="h-8 w-8 rounded-full object-cover"
              src={userInfo?.avatar || fakeImage}
              alt=""
            />
            <span className="hidden max-w-[120px] truncate text-sm font-semibold text-ink sm:block">
              {userInfo?.name || "Tài khoản"}
            </span>
            <i
              className="fa-solid fa-chevron-down text-[10px] text-ink-muted"
              aria-hidden="true"
            />
          </button>

          {showProfile && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-ink-line bg-white shadow-card-hover"
            >
              <div className="border-b border-ink-line px-4 py-3">
                <p className="truncate text-sm font-semibold text-ink">
                  {userInfo?.name}
                </p>
                <p className="truncate text-xs text-ink-muted">
                  {userInfo?.email}
                </p>
                <span className="mt-2 inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                  {roleLabel}
                </span>
              </div>
              <div className="p-1.5">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => navigate("/admin/my-profile")}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-ink hover:bg-ink-soft"
                >
                  <i className="fa-regular fa-user w-4 text-center" />
                  Thông tin tài khoản
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => dispatch(logoutUser(infoUser?._id))}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  <i className="fa-solid fa-right-from-bracket w-4 text-center" />
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
