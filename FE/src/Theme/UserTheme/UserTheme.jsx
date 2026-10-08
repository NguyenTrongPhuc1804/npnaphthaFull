import React from "react";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import ScrollTop from "../../components/ScrollToTop/ScrollTop";
import ChatUserComponent from "../../components/ChatHomePage/ChatUserComponent";
import ZaloWidget from "../../widget/ZaloWidget/ZaloWidget";

export default function UserTheme() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        <Outlet />
      </main>
      <ScrollTop />
      <ChatUserComponent />
      <ZaloWidget />
      <Footer />
    </div>
  );
}
