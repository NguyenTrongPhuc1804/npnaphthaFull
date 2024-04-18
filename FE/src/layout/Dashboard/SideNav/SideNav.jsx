import React, { useEffect, useMemo, useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { showSideNav } from "../../../redux/reducer/LoadingSlice";
import { NavLink } from "react-router-dom";
import { io } from "socket.io-client";
import { setLogout } from "../../../redux/reducer/UserSlice";
import { getAllContact } from "../../../redux/reducer/ContactSlice";

export function SideNav() {
  const dispatch = useDispatch();
  const { isOpenSideNav } = useSelector((state) => state.loadingSlice);
  const { data } = useSelector((state) => state.contactSlice.listAllContact);
  const [open, setOpen] = React.useState(true);
  const [listRoom, setListRoom] = useState([]);
  const [active, setActive] = useState(
    localStorage.getItem("sidenav") ?? "user"
  );
  const closeSideNav = () => {
    dispatch(showSideNav(false));
  };
  const socket = useMemo(() => io(import.meta.env.VITE_URL_SOCKET), [false]);
  const handleLogout = () => {
    dispatch(setLogout());
  };

  useEffect(() => {
    dispatch(getAllContact());
  }, []);
  useEffect(() => {
    socket.emit("get-all-room-to-server");
    socket.on("get-all-room-to-client", (data) => {
      setListRoom(data);
    });
    setActive(localStorage.getItem("sidenav"));
  }, [localStorage.getItem("sidenav")]);
  return (
    <div className="h-full">
      <aside
        id="default-sidebar"
        className={`top-0 left-0 z-40 w-64 h-full transition-transform ${
          isOpenSideNav ? "-translate-x-0" : "-translate-x-full"
        } fixed sm:static sm:block sm:translate-x-0 `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="block lg:hidden flex justify-between py-2 pl-4">
            <p>Danh mục</p>
            <Button onClick={closeSideNav} className="py-2 px-3">
              X
            </Button>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/admin/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                {JSON.parse(localStorage.getItem("user_info"))?.role ==
                  "ADMIN" && (
                  <Button
                    variant={active == "user" ? "gradient" : "outlined"}
                    onClick={() => localStorage.setItem("sidenav", "user")}
                    className="w-full flex justify-start items-center"
                  >
                    <i className="fa-solid fa-user-group "></i>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Quản lý người dùng
                    </span>
                  </Button>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/product"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Button
                  variant={active == "product" ? "gradient" : "outlined"}
                  onClick={() => localStorage.setItem("sidenav", "product")}
                  className="w-full flex justify-start items-center"
                >
                  <i className="fa-solid fa-bag-shopping  "></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Quản lý sản phẩm
                  </span>
                </Button>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/blog"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Button
                  variant={active == "blog" ? "gradient" : "outlined"}
                  onClick={() => localStorage.setItem("sidenav", "blog")}
                  className="w-full flex justify-start items-center"
                >
                  <i className="fa-solid fa-blog"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Quản lý tin tức
                  </span>
                </Button>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/category"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Button
                  variant={active == "category" ? "gradient" : "outlined"}
                  onClick={() => localStorage.setItem("sidenav", "category")}
                  className="w-full flex justify-start items-center"
                >
                  <i className="fa-solid fa-list  "></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Quản lý danh mục
                  </span>
                </Button>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/catalogue"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Button
                  variant={active == "catalogue" ? "gradient" : "outlined"}
                  onClick={() => localStorage.setItem("sidenav", "catalogue")}
                  className="w-full flex justify-start items-center"
                >
                  <i className="fa-solid fa-file  "></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Quản lý catalogue
                  </span>
                </Button>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/partner"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Button
                  variant={active == "partner" ? "gradient" : "outlined"}
                  onClick={() => localStorage.setItem("sidenav", "partner")}
                  className="w-full flex justify-start items-center"
                >
                  <i className="fa-solid fa-handshake"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Quản lý đối tác
                  </span>
                </Button>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/banner"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Button
                  variant={active == "banner" ? "gradient" : "outlined"}
                  onClick={() => localStorage.setItem("sidenav", "banner")}
                  className="w-full flex justify-start items-center"
                >
                  <i className="fa-solid fa-image"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Quản lý banner
                  </span>
                </Button>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/video-banner"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Button
                  variant={active == "video-banner" ? "gradient" : "outlined"}
                  onClick={() =>
                    localStorage.setItem("sidenav", "video-banner")
                  }
                  className="w-full flex justify-start items-center"
                >
                  <i className="fa-solid fa-video"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Quản lý video banner
                  </span>
                </Button>
              </NavLink>
            </li>
            <li onClick={() => setListRoom([])}>
              <NavLink
                to="/admin/chat"
                className="flex items-center relative p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Button
                  variant={active == "chat" ? "gradient" : "outlined"}
                  onClick={() => localStorage.setItem("sidenav", "chat")}
                  className="w-full flex justify-start items-center"
                >
                  <i className="fa-solid fa-comment"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Quản lý tin nhắn
                  </span>
                  {listRoom.filter((item) => item.unreadCnt > 0).length > 0 && (
                    <p className="text-xs bg-red-600 text-white px-2 py-1 rounded-full ml-2">
                      {listRoom.reduce((pre, next) => pre + next.unreadCnt, 0)}
                    </p>
                  )}
                </Button>
              </NavLink>
            </li>
            <li onClick={() => setListRoom([])}>
              <NavLink
                to="/admin/contact"
                className="flex items-center relative p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Button
                  variant={active == "contact" ? "gradient" : "outlined"}
                  onClick={() => localStorage.setItem("sidenav", "contact")}
                  className="w-full flex justify-start items-center"
                >
                  <i className="fa-solid fa-address-book"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Quản lý liên hệ
                  </span>
                  {data?.filter((item) => item.isSeen > 0).length > 0 && (
                    <p className="text-xs bg-red-600 text-white px-2 py-1 rounded-full ml-2">
                      {data?.reduce((pre, next) => pre + next.isSeen, 0)}
                    </p>
                  )}
                </Button>
              </NavLink>
            </li>
            <li>
              <Button
                onClick={handleLogout}
                className="w-full flex justify-start items-center"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Đăng xuất</span>
              </Button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
