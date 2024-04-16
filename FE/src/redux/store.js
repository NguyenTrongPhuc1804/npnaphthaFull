import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducer/UserSlice";
import loadingSlice from "./reducer/LoadingSlice";
import productSlice from "./reducer/ProductSlice";
import modalSlice from "./reducer/ModalSlice";
import dialogSlice from "./reducer/DialogSlice";
import drawerSlice from "./reducer/DrawerSlice";
import categorySlice from "./reducer/CategorySlice";
import catalogueSlice from "./reducer/CatalogueSlice";
import BlogSlice from "./reducer/BlogSlice";
import contactSlice from "./reducer/ContactSlice";
import bannerSlice from "./reducer/BannerSlice";
import authSlice from "./reducer/AuthSlice";
import videoBannerSlice from "./reducer/VideoBannerSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    loadingSlice,
    productSlice,
    modalSlice,
    dialogSlice,
    drawerSlice,
    categorySlice,
    catalogueSlice,
    BlogSlice,
    contactSlice,
    bannerSlice,
    authSlice,
    videoBannerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
