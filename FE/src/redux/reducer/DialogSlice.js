import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  showDialog: false,
  dialogImage: "",
};

export const dialogSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openDialog: (state, action) => {
      state.showDialog = true;
      state.dialogImage = action.payload;
    },
    closeDialog: (state, action) => {
      state.showDialog = false;
      state.dialogImage = "";
    },
  },
  extraReducers: (builder) => {},
});

//login user

export const { openDialog, closeDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
