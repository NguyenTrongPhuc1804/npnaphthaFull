import { useEffect, useState } from "react";

import "./App.css";
import "./assets/css/bootstrap-icons.css";

import HomePage from "./pages/Home/HomePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AboutPage from "./pages/About/AboutPage";
import ProductPage from "./pages/Product/ProductPage";
import BlogPage from "./pages/Blog/BlogPage";
import ContactPage from "./pages/Contact/ContactPage";
import LoginPage from "./pages/Login/LoginPage";
import UserTheme from "./Theme/UserTheme/UserTheme";
import Loading from "./components/Loading/Loading";
import AdminTheme from "./Theme/AdminTheme/AdminTheme";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import ManagementUserPage from "./pages/AdminPage/ManagementUserPage/ManagementUserPage";
import { DialogWithImage } from "./components/Dialog/DialogWithImage";
import ProfileUser from "./pages/AdminPage/ProfileUser/ProfileUser";
import ManagementProductPage from "./pages/AdminPage/ManagementProduct/ManagementProductPage";
import DrawerCustomComponent from "./components/Drawer/DrawerCustomComponent";
import ManagementCategory from "./pages/AdminPage/ManagementCategory/ManagementCategoryPage";
import ProductDetailPage from "./pages/Product/ProductDetailPage/ProductDetailPage";
import BlogDetail from "./pages/Blog/BlogDetail/BlogDetail";
import CataloguePage from "./pages/CataloguePage/CataloguePage";
import ManagementCatalogue from "./pages/AdminPage/ManagementCatalogue/ManagementCatalogue";
import ChatAdmin from "./pages/AdminPage/Chat/ChatAdmin";
import { Toaster, toast } from "sonner";
import ManagementBlog from "./pages/AdminPage/ManagementBlog/ManagementBlog";
export default function App() {
  const { isLogin } = useSelector((state) => state.userSlice);
  useEffect(() => {}, [isLogin]);
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<UserTheme />}>
              <Route path="" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/product" element={<ProductPage />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog-detail" element={<BlogDetail />} />
              <Route path="/catalogue" element={<CataloguePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/admin"
              element={
                localStorage.getItem("access_token") ? (
                  <AdminTheme />
                ) : (
                  <Navigate to="/login" />
                )
              }
            >
              <Route path="" element={<ManagementUserPage />} />
              <Route path="product" element={<ManagementProductPage />} />
              <Route path="category" element={<ManagementCategory />} />
              <Route path="catalogue" element={<ManagementCatalogue />} />
              <Route path="blog" element={<ManagementBlog />} />
              <Route path="chat" element={<ChatAdmin />} />
              <Route path="my-profile" element={<ProfileUser />} />
            </Route>
            {/* <Route path="/register" element={<RegisterPage />} /> */}
          </Routes>
          <Loading />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
          <Toaster position="top-right" />
          <DrawerCustomComponent />
          <DialogWithImage />
        </Router>
      </div>
    </>
  );
}
