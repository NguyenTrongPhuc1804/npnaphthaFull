import { Option, Select } from "@material-tailwind/react";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Drawer from "../Drawer/DrawerComponent";
import { useDispatch, useSelector } from "react-redux";
import { showDrawer } from "../../redux/reducer/LoadingSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpenDrawer } = useSelector((state) => state.loadingSlice);

  const [value, setValue] = useState("VN");

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
          src={require("../../assets/images/logo-cty.gif")}
        />
      </div>
      <div className="hidden sm:block ">
        <ul className="navbar-nav ">
          <li className="nav-item ">
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link inactive"
              }
            >
              Trang chủ
            </NavLink>
          </li>
          <li className="nav-item ">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link inactive"
              }
            >
              Về chúng tôi
            </NavLink>
          </li>
          <li className="nav-item ">
            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link inactive"
              }
            >
              Sản phẩm
            </NavLink>
          </li>
          <li className="nav-item ">
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link inactive"
              }
            >
              Bài viết
            </NavLink>
          </li>{" "}
          <li className="nav-item ">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link inactive"
              }
            >
              Tuyển dụng
            </NavLink>
          </li>
          <li className="nav-item ">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link inactive"
              }
            >
              Liên hệ
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="d-none d-lg-block">
        <Select
          className=""
          size="md"
          defaultValue={"VN"}
          label="Chọn ngôn ngữ"
          value={value}
          onChange={(val) => setValue(val)}
        >
          <Option value="VN" defaultValue={"VN"}>
            <div className="flex justify-start items-center">
              <img
                className="w-5 h-5 mr-2"
                src={require("../../assets/images/vietnam.png")}
                alt=""
              />
              <p className="text-sm">Việt nam</p>
            </div>
          </Option>
          <Option value="EN">
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
              value == "VN"
                ? require("../../assets/images/vietnam.png")
                : require("../../assets/images/united-states.png")
            }
            alt=""
          />
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected value="VN">
              <div className="flex justify-center items-center">
                <img
                  className="w-5 h-5 mr-2"
                  src={require("../../assets/images/vietnam.png")}
                  alt=""
                />
                <p className="text-sm">Việt nam</p>
              </div>
            </option>
            <option value="EN">
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
