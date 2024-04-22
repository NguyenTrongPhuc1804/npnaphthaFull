import {
  Button,
  Collapse,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataillUser,
  logoutUser,
  setLogout,
} from "../../../redux/reducer/UserSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { showSideNav } from "../../../redux/reducer/LoadingSlice";

export default function NavBarAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const { userInfo } = useSelector((state) => state.userSlice);
  const [infoUser, setInfoUser] = React.useState("");

  const handleLogout = () => {
    dispatch(logoutUser(infoUser._id));
  };
  const showNavBar = () => {
    dispatch(showSideNav(true));
  };
  useEffect(() => {
    const id = localStorage.getItem("user_id");
    dispatch(getDataillUser({ user_id: id }));
    setInfoUser(JSON.parse(localStorage.getItem("user_info")));
  }, []);
  return (
    <header className="antialiased ">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <button
              onClick={showNavBar}
              aria-expanded="true"
              aria-controls="sidebar"
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden  hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                className="w-[18px] h-[18px]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
              <span className="sr-only">Toggle sidebar</span>
            </button>
            <NavLink to="/" className="flex mr-4">
              <img
                src="https://flowbite.s3.amazonaws.com/logo.svg"
                className="mr-3 h-8"
                alt="FlowBite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Home
              </span>
            </NavLink>
            {/* <form action="#" method="GET" className="hidden lg:block lg:pl-2">
              <label htmlFor="topbar-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1 lg:w-96">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    {" "}
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />{" "}
                  </svg>
                </div>
                <input
                  type="text"
                  name="email"
                  id="topbar-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                />
              </div>
            </form> */}
          </div>
          <div className="flex items-center lg:order-2">
            {/* <button
              onClick={() => setShowNoti(!showNoTi)}
              type="button"
              data-dropdown-toggle="notification-dropdown"
              className="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <span className="sr-only">View notifications</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 14 20"
              >
                <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
              </svg>
            </button>
            <div
              class={` ${
                showNoTi ? "block" : "hidden"
              } top-[2rem] lg:right-[2rem] right-0 absolute overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700`}
              id="notification-dropdown"
            >
              <div
                class={`hidden py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400`}
              >
                Notifications
              </div>
              <div>
                <a
                  href="#"
                  className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                >
                  <div className="flex-shrink-0">
                    <i className="fa-solid fa-inbox text-2xl"></i>
                    <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 dark:border-gray-700">
                      <svg
                        className="w-2 h-2 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 18"
                      >
                        <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z" />
                        <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="pl-3 w-full flex items-center">
                    <p>banj cos 3 tin nhan moi</p>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                >
                  <div className="flex-shrink-0">
                    <i className="fa-solid fa-address-book text-2xl"></i>
                    <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white dark:border-gray-700">
                      <svg
                        className="w-2 h-2 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="pl-3 w-full">
                    <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Jese leos
                      </span>{" "}
                      and{" "}
                      <span className="font-medium text-gray-900 dark:text-white">
                        5 others
                      </span>{" "}
                      started following you.
                    </div>
                    <div className="text-xs font-medium text-primary-700 dark:text-primary-400">
                      10 minutes ago
                    </div>
                  </div>
                </a>
              </div>
            </div> */}
            <button
              onClick={() => setShowProfile(!showProfile)}
              type="button"
              className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="dropdown"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={
                  infoUser?.avatar ??
                  require("../../../../public/fake_image.jpg")
                }
                alt="user photo"
              />
            </button>
            {/* Dropdown menu */}
            <div
              className={`${
                showProfile ? "block" : "hidden"
              } absolute top-[2rem] right-[1rem] z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
              id="dropdown"
            >
              <div className="flex items-center justify-between">
                <div className="py-3 px-4">
                  <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                    {userInfo?.name?.length > 12
                      ? `${userInfo?.name.slice(0, 12)}...`
                      : userInfo?.name}
                  </span>
                  <p className="block text-sm text-gray-500 truncate dark:text-gray-400 truncate">
                    {userInfo?.email?.length > 16
                      ? `${userInfo?.email.slice(0, 16)}...`
                      : userInfo?.email}
                  </p>
                </div>
                <div className="">
                  <Button
                    color="red"
                    onClick={() => setShowProfile(false)}
                    className="py-2 px-3 mr-4"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </Button>
                </div>
              </div>
              <ul
                className="py-1 text-gray-500 dark:text-gray-400"
                aria-labelledby="dropdown"
              >
                <li>
                  <button
                    onClick={() => navigate("/admin/my-profile")}
                    className="w-full text-left block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    Thông tin tài khoản
                  </button>
                </li>
                <li>
                  <button className="w-full text-left block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
                    Trạng thái:{" "}
                    <strong
                      className={`${
                        infoUser?.role === "ADMIN" && "text-green-400"
                      }`}
                    >
                      {infoUser?.role === "ADMIN" ? "Quản trị" : "Người dùng"}
                    </strong>
                  </button>
                </li>
                {/* <li>
                  <button
                    onClick={() => navigate("/admin/")}
                    className="w-full text-left block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    Quản lý người dùng
                  </button>
                </li> */}
              </ul>

              <ul
                className="py-1 text-gray-500 dark:text-gray-400"
                aria-labelledby="dropdown"
              >
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Đăng xuẩt
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
