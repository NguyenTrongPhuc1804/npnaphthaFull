import React, { useState } from "react";
import Header from "../../components/Header/Header";
import { Outlet, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import ScrollTop from "../../components/ScrollToTop/ScrollTop";
import ChatPage from "../../pages/ChatPage/ChatPage";
import { Button } from "@material-tailwind/react";
import InputComponent from "../../components/Input/InputComponent";
import ChatUserComponent from "../../components/ChatHomePage/ChatUserComponent";

export default function UserTheme() {
  const data = useParams();

  return (
    <div className="w-full bg-white ">
      <Header />
      <Outlet />
      <ScrollTop />
      <ChatUserComponent />
      <Footer />
    </div>
  );
}
