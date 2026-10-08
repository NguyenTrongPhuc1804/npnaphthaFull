import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { io } from "socket.io-client";
import { showSideNav } from "../../../redux/reducer/LoadingSlice";
import { setLogout } from "../../../redux/reducer/UserSlice";
import { getAllContact } from "../../../redux/reducer/ContactSlice";
import { ADMIN_MENU } from "../menu";
import logo from "../../../assets/images/logo-cty.jpg";

export function SideNav() {
  const dispatch = useDispatch();
  const { isOpenSideNav } = useSelector((state) => state.loadingSlice);
  const { data } = useSelector((state) => state.contactSlice.listAllContact);
  const { userInfo } = useSelector((state) => state.userSlice);
  const [listRoom, setListRoom] = useState([]);

  const closeSideNav = () => dispatch(showSideNav(false));
  const handleLogout = () => dispatch(setLogout());

  useEffect(() => {
    dispatch(getAllContact());
  }, []);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_URL_SOCKET);
    socket.emit("get-all-room-to-server");
    socket.on("get-all-room-to-client", (rooms) => setListRoom(rooms));
    return () => {
      socket.disconnect();
    };
  }, []);

  const badges = {
    chat: listRoom.reduce((pre, next) => pre + (next.unreadCnt || 0), 0),
    contact: data?.reduce((pre, next) => pre + (next.isSeen || 0), 0) || 0,
  };

  return (
    <>
      {isOpenSideNav && (
        <div
          onClick={closeSideNav}
          aria-hidden="true"
          className="fixed inset-0 z-30 bg-ink/50 backdrop-blur-sm lg:hidden"
        />
      )}
      <aside
        aria-label="Sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-brand-950 text-slate-300 transition-transform duration-200 lg:translate-x-0 ${
          isOpenSideNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <NavLink to="/admin" className="flex items-center gap-3">
            <img
              src={logo}
              alt="NP NAPHTHA"
              className="h-9 w-9 rounded-lg object-cover"
            />
            <span className="text-base font-bold text-white">NP NAPHTHA</span>
          </NavLink>
          <button
            type="button"
            onClick={closeSideNav}
            aria-label="Đóng menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 hover:bg-white/10 lg:hidden"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {ADMIN_MENU.map((section) => {
            const items = section.items.filter(
              (item) => !item.adminOnly || userInfo?.role === "ADMIN"
            );
            if (items.length === 0) return null;
            return (
              <div key={section.group} className="mb-5">
                <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {section.group}
                </p>
                <ul className="space-y-1">
                  {items.map((item) => {
                    const count = item.badge ? badges[item.badge] : 0;
                    return (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          end={item.end}
                          onClick={() => {
                            closeSideNav();
                            if (item.badge === "chat") setListRoom([]);
                          }}
                          className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                              isActive
                                ? "bg-brand-500 text-white shadow-sm"
                                : "hover:bg-white/10 hover:text-white"
                            }`
                          }
                        >
                          <i
                            className={`fa-solid ${item.icon} w-4 text-center`}
                            aria-hidden="true"
                          />
                          <span className="flex-1">{item.label}</span>
                          {count > 0 && (
                            <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
                              {count}
                            </span>
                          )}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-white/10 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white"
          >
            <i
              className="fa-solid fa-right-from-bracket w-4 text-center"
              aria-hidden="true"
            />
            Đăng xuất
          </button>
        </div>
      </aside>
    </>
  );
}
