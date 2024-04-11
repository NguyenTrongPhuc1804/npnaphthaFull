import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "user edit",
  showDrawer: false,
  callBack: () => {
    alert("!23");
  },
  body: "hello",
  dialogImage: "",
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openModal: (state, action) => {
      (state.showDrawer = true),
        (state.title = action.payload.title),
        (state.callBack = action.payload.callBack);
      state.body = action.payload.body;
    },
    closeDrawer: (state, action) => {
      state.showDrawer = false;
    },
    setCallBackDrawer: (state, action) => {
      state.callBack = action.payload.callBack;
    },
  },
  extraReducers: (builder) => {},
});

//login user

export const { openModal, closeDrawer, setCallBackDrawer } =
  drawerSlice.actions;

export default drawerSlice.reducer;
