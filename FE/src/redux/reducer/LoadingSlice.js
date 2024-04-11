import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../service/baseService";
import { notify } from "../../toolkits/help";

const initialState = {
  isLoading: false,
  isOpenDrawer: false,
  isOpenSideNav: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showDrawer: (state, action) => {
      state.isOpenDrawer = action.payload;
    },
    showSideNav: (state, action) => {
      state.isOpenSideNav = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

//login user

export const { setLoading, showDrawer, showSideNav } = loadingSlice.actions;

export default loadingSlice.reducer;
