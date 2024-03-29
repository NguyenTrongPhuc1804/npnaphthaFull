import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducer/UserSlice";
import loadingSlice from "./reducer/LoadingSlice";
import productSlice from "./reducer/ProductSlice";
import modalSlice from "./reducer/ModalSlice";
import dialogSlice from "./reducer/DialogSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    loadingSlice,
    productSlice,
    modalSlice,
    dialogSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
