import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../service/baseService";
import { notify } from "../../toolkits/help";

const initialState = {
  listAllProduct: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      state.listAllProduct = action.payload;
    });
  },
});

//get all product
export const getAllProduct = createAsyncThunk(
  "user/getAllProduct",
  async () => {
    try {
      const { data } = await api.get(`/product/all`);
      return data;
    } catch (error) {
      console.log(error, "error");
    }
  }
);

export const { setLoading } = productSlice.actions;

export default productSlice.reducer;
