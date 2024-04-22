import React, { useState } from "react";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import ScrollTop from "../../components/ScrollToTop/ScrollTop";
import ChatPage from "../../pages/ChatPage/ChatPage";
import { Button } from "@material-tailwind/react";
import InputComponent from "../../components/Input/InputComponent";
import ChatUserComponent from "../../components/ChatHomePage/ChatUserComponent";
import FacebookWidget from "../../widget/FacebookWidget/FacebookWidget";
import ZaloWidget from "../../widget/ZaloWidget/ZaloWidget";

export default function UserTheme() {
  return (
    <div className="w-full bg-white ">
      <Header />
      <Outlet />
      <ScrollTop />
      <ChatUserComponent />
      <ZaloWidget />
      <Footer />
    </div>
  );
}
