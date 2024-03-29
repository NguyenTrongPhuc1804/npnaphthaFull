import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "user edit",
  showModal: false,
  callBack: () => {
    alert("!23");
  },
  body: "hello",
  dialogImage: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      (state.showModal = true),
        (state.title = action.payload.title),
        (state.callBack = action.payload.callBack);
      state.body = action.payload.body;
    },
    closeModal: (state, action) => {
      state.showModal = false;
    },
    setCallBack: (state, action) => {
      state.callBack = action.payload.callBack;
    },
    setDialogImage: (state, action) => {
      state.dialogImage = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

//login user

export const { openModal, closeModal, setCallBack } = modalSlice.actions;

export default modalSlice.reducer;
