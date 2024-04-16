import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../service/baseService";
import { notify } from "../../toolkits/help";
import { closeModal } from "./ModalSlice";
import { setLoading } from "./LoadingSlice";

const initialState = {
  currentUser: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      console.log(state.currentUser, "curntuser");
    },
  },
  extraReducers: (builder) => {},
});

//get all Banner
export const refreshToken = createAsyncThunk("user/refreshToken", async () => {
  try {
    const { data } = await api.get(`/user/refresh-token`);
    localStorage.setItem("access_token", data.access_token);
    return data;
  } catch (error) {
    console.log(error, "error");
  }
});
export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
