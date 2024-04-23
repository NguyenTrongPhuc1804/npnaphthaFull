import { Option, Select } from "@material-tailwind/react";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Drawer from "../Drawer/DrawerComponent";
import { useDispatch, useSelector } from "react-redux";
import { showDrawer } from "../../redux/reducer/LoadingSlice";
import { useTranslation } from "react-i18next";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { isOpenDrawer } = useSelector((state) => state.loadingSlice);
  const [value, setValue] = useState(localStorage.getItem("lng") ?? "vi");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setValue(lng);
    localStorage.setItem("lng", lng);
  };
  const closeDrawer = () => {
    dispatch(showDrawer(false));
  };
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-lg fixed w-screen z-10 top-0 justify-between items-center px-[8%]">
      <div
        onClick={() => navigate("/")}
        className="sm:w-[120px] w-[100px] cursor-pointer"
        href="index.html"
      >
        <img
          className="sm:w-[90px] sm:h-[90px] h-[70px] w-[70px] block object-cover"
          src={require("../../assets/images/logo-cty.jpg")}
        />
      </div>
      <div className="hidden sm:block ">
        <ul className="navbar-nav ">
          <li className="nav-item uppercase ">
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link inactive"
              }
            >
              {t("content.home")}
            </NavLink>
          </li>
          <li className="nav-item uppercase ">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link inactive"
              }
            >
              {t("content.about")}
            </NavLink>
          </li>
          <li className="nav-item uppercase ">
            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link inactive"
              }
            >
              {t("content.product")}
            </NavLink>
          </li>
          <li className="nav-item uppercase ">
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link inactive"
              }
            >
              {t("content.blog")}
            </NavLink>
          </li>{" "}
          <li className="nav-item uppercase ">
            <NavLink
              to="/catalogue"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link inactive"
              }
            >
              catalogue
            </NavLink>
          </li>
          <li className="nav-item uppercase ">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link inactive"
              }
            >
              {t("content.contact")}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="d-none d-lg-block">
        <Select
          className=""
          size="md"
          defaultValue={"VN"}
          label=""
          value={value}
          onChange={(val) => changeLanguage(val)}
        >
          <Option value="vi" defaultValue={"vi"}>
            <div className="flex justify-start items-center">
              <img
                className="w-5 h-5 mr-2"
                src={require("../../assets/images/vietnam.png")}
                alt=""
              />
              <p className="text-sm">Việt nam</p>
            </div>
          </Option>
          <Option value="en">
            <div className="flex justify-start items-center">
              <img
                className="w-5 h-5 mr-2"
                src={require("../../assets/images/united-states.png")}
                alt=""
              />
              <p className="text-sm">English</p>
            </div>
          </Option>
        </Select>

        {/* <button
            type="button"
            className="custom-btn btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#BookingModal"
          >
            Reservation
          </button> */}
      </div>
      <div className="flex">
        <div className="d-lg-none flex items-center">
          <img
            className="w-[25px] h-[25px]  mr-2"
            src={
              value == "vi"
                ? require("../../assets/images/vietnam.png")
                : require("../../assets/images/united-states.png")
            }
            alt=""
          />
          <select
            value={value}
            onChange={(e) => changeLanguage(e.target.value)}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected value="vi">
              <div className="flex justify-center items-center">
                <img
                  className="w-5 h-5 mr-2"
                  src={require("../../assets/images/vietnam.png")}
                  alt=""
                />
                <p className="text-sm">Việt nam</p>
              </div>
            </option>
            <option value="en">
              <div className="flex justify-center items-center">
                <img
                  className="w-5 h-5 mr-2"
                  src={require("../../assets/images/vietnam.png")}
                  alt=""
                />
                <p className="text-sm">English</p>
              </div>
            </option>
          </select>
        </div>
        <button
          onClick={() => {
            dispatch(showDrawer(true));
          }}
          className="navbar-toggler"
          type="button"
        >
          <i
            className={`fa-solid ${
              !isOpenDrawer ? "fa-bars" : "fa-xmark"
            } text-2xl`}
          ></i>
        </button>
      </div>
      <Drawer closeDrawer={closeDrawer} />
    </nav>
  );
}
