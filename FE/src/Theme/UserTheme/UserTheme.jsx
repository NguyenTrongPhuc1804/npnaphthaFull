import React from "react";
import Header from "../../components/Header/Header";
import { Outlet, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import ScrollTop from "../../components/ScrollToTop/ScrollTop";

export default function UserTheme() {
  const data = useParams();
  return (
    <div className="w-full ">
      <Header />
      <Outlet />
      <ScrollTop />
      <Footer />
    </div>
  );
}
