import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../service/baseService";
import { notify } from "../../toolkits/help";
import { closeModal } from "./ModalSlice";
import { setLoading } from "./LoadingSlice";

const initialState = {
  listAllProduct: [],
  productDetail: {},
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      state.listAllProduct = action.payload;
    });
    builder.addCase(searchProduct.fulfilled, (state, action) => {
      state.listAllProduct = action.payload;
    });
    builder.addCase(getDetailProduct.fulfilled, (state, action) => {
      state.productDetail = action.payload;
    });
  },
});

//get all product
export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      if (payload) {
        const data = await api.get(
          `/product/all?page=${payload.page}&limit=${payload.limit}`
        );
        dispatch(setLoading(false));
        return data;
      }
      const data = await api.get(`/product/all`);
      dispatch(setLoading(false));

      return data;
    } catch (error) {
      console.log(error, "error");
      dispatch(setLoading(false));
    }
  }
);
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      dispatch(closeModal());
      const { data } = await api.post(`/product/create`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data, "data");
      notify("success", "Tạo sản phẩm thành công");
      dispatch(setLoading(false));
      dispatch(getAllProduct());
      return data;
    } catch (error) {
      dispatch(closeModal());
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, payload }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      dispatch(closeModal());
      const { data } = await api.put(`/product/update/${id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data, "data");
      notify("success", "Sửa sản phẩm thành công");
      dispatch(setLoading(false));
      dispatch(getAllProduct());
      return data;
    } catch (error) {
      dispatch(closeModal());
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const getDetailProduct = createAsyncThunk(
  "product/getDetailProduct",
  async ({ slug }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.get(`/product/detail/${slug}`);
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      console.log(error, "error");
      dispatch(setLoading(false));
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.delete(`/product/delete/${id}`);
      console.log(data, "data");
      notify("success", "Xóa sản phẩm thành công");
      dispatch(setLoading(false));
      dispatch(getAllProduct());
      return data;
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const deleteAllProduct = createAsyncThunk(
  "product/deleteAllProduct",
  async (listId, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.post(`/product/deleteAll`, {
        listDelete: listId,
      });
      notify("success", "Xóa tất cả sản phẩm thành công");
      dispatch(setLoading(false));
      dispatch(getAllProduct());
      return data;
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const searchProduct = createAsyncThunk(
  "product/searchProduct",
  async ({ searchBy, searchValue }, { dispatch }) => {
    console.log(searchBy, searchValue, "search");
    dispatch(setLoading(true));
    try {
      if (searchValue.trim() == "") {
        const data = await api.get(`/product/all`);
        dispatch(setLoading(false));
        return data;
      }
      const data = await api.get(
        `/product/all?searchBy=${searchBy}&searchValue=${searchValue}`
      );
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      console.log(error, "error");
      notify("error", error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const {} = productSlice.actions;

export default productSlice.reducer;
[{ name: "phuc" }, { name: "nguyen" }, { name: "long" }];
