import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer } from "react-toastify";

import Loading from "./components/Loading/Loading";
import UserTheme from "./Theme/UserTheme/UserTheme";
import HomePage from "./pages/Home/HomePage";
import AboutPage from "./pages/About/AboutPage";
import ProductPage from "./pages/Product/ProductPage";
import ProductDetailPage from "./pages/Product/ProductDetailPage/ProductDetailPage";
import BlogPage from "./pages/Blog/BlogPage";
import BlogDetail from "./pages/Blog/BlogDetail/BlogDetail";
import CataloguePage from "./pages/CataloguePage/CataloguePage";
import ContactPage from "./pages/Contact/ContactPage";

// Các trang quản trị tải theo yêu cầu để không làm nặng trang người dùng
const LoginPage = lazy(() => import("./pages/Login/LoginPage"));
const AdminTheme = lazy(() => import("./Theme/AdminTheme/AdminTheme"));
const ManagementProductPage = lazy(() =>
  import("./pages/AdminPage/ManagementProduct/ManagementProductPage")
);
const ManagementUserPage = lazy(() =>
  import("./pages/AdminPage/ManagementUserPage/ManagementUserPage")
);
const ManagementCategory = lazy(() =>
  import("./pages/AdminPage/ManagementCategory/ManagementCategoryPage")
);
const ManagementCatalogue = lazy(() =>
  import("./pages/AdminPage/ManagementCatalogue/ManagementCatalogue")
);
const ManagementBlog = lazy(() =>
  import("./pages/AdminPage/ManagementBlog/ManagementBlog")
);
const ManagementContact = lazy(() =>
  import("./pages/AdminPage/ManagementContact/ManagementContact")
);
const ManagementBanners = lazy(() =>
  import("./pages/AdminPage/ManagementBanner/ManagementBanner")
);
const ManagementVideoBanner = lazy(() =>
  import("./pages/AdminPage/ManagementVideoBanner/ManagementVideoBanner")
);
const ManagementPartner = lazy(() =>
  import("./pages/AdminPage/ManagementPartner/ManagementPartner")
);
const ChatAdmin = lazy(() => import("./pages/AdminPage/Chat/ChatAdmin"));
const ProfileUser = lazy(() =>
  import("./pages/AdminPage/ProfileUser/ProfileUser")
);
const DrawerCustomComponent = lazy(() =>
  import("./components/Drawer/DrawerCustomComponent")
);
const DialogWithImage = lazy(() =>
  import("./components/Dialog/DialogWithImage").then((m) => ({
    default: m.DialogWithImage,
  }))
);

export default function App() {
  // Đăng ký theo dõi trạng thái đăng nhập để route admin được tính lại khi đăng xuất
  useSelector((state) => state.userSlice.isLogin);

  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<UserTheme />}>
            <Route path="" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
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
            <Route path="" element={<ManagementProductPage />} />
            <Route path="user" element={<ManagementUserPage />} />
            <Route path="category" element={<ManagementCategory />} />
            <Route path="catalogue" element={<ManagementCatalogue />} />
            <Route path="blog" element={<ManagementBlog />} />
            <Route path="chat" element={<ChatAdmin />} />
            <Route path="banner" element={<ManagementBanners />} />
            <Route path="video-banner" element={<ManagementVideoBanner />} />
            <Route path="contact" element={<ManagementContact />} />
            <Route path="my-profile" element={<ProfileUser />} />
            <Route path="partner" element={<ManagementPartner />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
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
      <Suspense fallback={null}>
        <DrawerCustomComponent />
        <DialogWithImage />
      </Suspense>
    </Router>
  );
}
