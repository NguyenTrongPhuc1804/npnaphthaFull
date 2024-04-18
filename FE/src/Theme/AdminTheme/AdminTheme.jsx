import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import { Outlet, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { SideNav } from "../../layout/Dashboard/SideNav/SideNav";
import NavBarAdmin from "../../layout/Dashboard/NavBar/NavBarAdmin";
import BlogPage from "../../pages/Blog/BlogPage";
import ModalComponent from "../../components/Modal/ModalComponent";
import { useSelector } from "react-redux";

export default function AdminTheme() {
  return (
    <div className="w-full">
      <NavBarAdmin />
      <div className="flex">
        <div className="lg:w-[17%] ">
          <SideNav />
        </div>
        <div className="lg:w-[80%] w-full">
          <Outlet />
        </div>
      </div>
      <ModalComponent />
    </div>
  );
}
