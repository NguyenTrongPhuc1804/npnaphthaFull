import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataillUser, setLogout } from "../../../redux/reducer/UserSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { showSideNav } from "../../../redux/reducer/LoadingSlice";

export default function NavBarAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const [showNoTi, setShowNoti] = useState(false);
  const { userInfo } = useSelector((state) => state.userSlice);

  const handleLogout = () => {
    dispatch(setLogout());
  };
  const showNavBar = () => {
    dispatch(showSideNav(true));
  };
  useEffect(() => {
    const id = localStorage.getItem("user_id");
    dispatch(getDataillUser({ user_id: id }));
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
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
                Dashboard
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
            <button
              type="button"
              className="hidden sm:inline-flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              <svg
                aria-hidden="true"
                className="mr-1 -ml-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>{" "}
              New Widget
            </button>

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
                  userInfo.avatar
                    ? userInfo.avatar
                    : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
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
                  <button
                    onClick={() => navigate("/admin/user")}
                    className="w-full text-left block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    Quản lý người dùng
                  </button>
                </li>
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
