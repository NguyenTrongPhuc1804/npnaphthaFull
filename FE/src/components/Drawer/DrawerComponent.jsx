import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  useSelect,
} from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showDrawer } from "../../redux/reducer/LoadingSlice";
import { useTranslation } from "react-i18next";

export default function DrawerComponent({ open, closeDrawer }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { isOpenDrawer } = useSelector((state) => state.loadingSlice);
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
            <li
              onClick={() => dispatch(showDrawer(false))}
              className="nav-item border-b border-gray-600"
            >
              <NavLink
                to=""
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active py-3"
                    : "nav-link inactive !text-base py-3"
                }
              >
                {t("content.home")}
              </NavLink>
            </li>
            <li
              onClick={() => dispatch(showDrawer(false))}
              className="nav-item border-b border-gray-600"
            >
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link  active py-3"
                    : "nav-link inactive !text-base py-3"
                }
              >
                {t("content.about")}
              </NavLink>
            </li>
            <li
              onClick={() => dispatch(showDrawer(false))}
              className="nav-item border-b border-gray-600"
            >
              <NavLink
                to="/product"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active py-3"
                    : "nav-link inactive !text-base py-3"
                }
              >
                {t("content.product")}
              </NavLink>
            </li>
            <li
              onClick={() => dispatch(showDrawer(false))}
              className="nav-item border-b border-gray-600"
            >
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active py-3"
                    : "nav-link inactive !text-base py-3"
                }
              >
                {t("content.blog")}
              </NavLink>
            </li>
            <li
              onClick={() => dispatch(showDrawer(false))}
              className="nav-item border-b border-gray-600"
            >
              <NavLink
                to="/catalogue"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active py-3"
                    : "nav-link inactive !text-base py-3"
                }
              >
                Catalogue
              </NavLink>
            </li>
            <li
              onClick={() => dispatch(showDrawer(false))}
              className="nav-item border-b border-gray-600"
            >
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active  py-3"
                    : "nav-link inactive !text-base  py-3"
                }
              >
                {t("content.contact")}
              </NavLink>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div className="pl-6 mt-2 w-full">
          <Button
            onClick={() => {
              navigate("/contact");
              dispatch(showDrawer(false));
            }}
            className="w-full bg-colorPrimary"
          >
            {t("content.contact-now")}
          </Button>
        </div>
      </section>
    </Drawer>
  );
}
