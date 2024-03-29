import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  useSelect,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DrawerComponent({ open, closeDrawer }) {
  const { isOpenDrawer } = useSelector((state) => state.loadingSlice);
  console.log(isOpenDrawer, "isOpne");
  return (
    <Drawer
      open={isOpenDrawer}
      onClose={closeDrawer}
      className="p-4 !pl-0 lg:hidden block "
    >
      {/* <div className="flex items-center justify-between pl-6">
        <Typography variant="h6" color="red">
          Danh mục
        </Typography>
        <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div> */}
      <section>
        <div className="pl-0">
          <ul className="navbar-nav ">
            <li className="nav-item border-b border-gray-600">
              <NavLink
                to=""
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active py-3"
                    : "nav-link inactive !text-base py-3"
                }
              >
                Trang chủ
              </NavLink>
            </li>
            <li className="nav-item border-b border-gray-600">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link  active py-3"
                    : "nav-link inactive !text-base py-3"
                }
              >
                Về chúng tôi
              </NavLink>
            </li>
            <li className="nav-item border-b border-gray-600">
              <NavLink
                to="/product"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active py-3"
                    : "nav-link inactive !text-base py-3"
                }
              >
                Sản phẩm
              </NavLink>
            </li>
            <li className="nav-item border-b border-gray-600">
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active py-3"
                    : "nav-link inactive !text-base py-3"
                }
              >
                Bài viết
              </NavLink>
            </li>
            <li className="nav-item border-b border-gray-600">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active  py-3"
                    : "nav-link inactive !text-base  py-3"
                }
              >
                Liên hệ
              </NavLink>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div className="pl-6 mt-2">
          <Typography variant="h6" color="red">
            Hỗ trợ
          </Typography>
        </div>
      </section>
    </Drawer>
  );
}
