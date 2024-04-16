import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../service/baseService";
import { notify } from "../../toolkits/help";
import { closeModal } from "./ModalSlice";
import { setLoading } from "./LoadingSlice";

const initialState = {
  listAllCategory: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.listAllCategory = action.payload;
    });
    builder.addCase(searchCategory.fulfilled, (state, action) => {
      state.listAllCategory = action.payload;
    });
  },
});

//get all Category
export const getAllCategory = createAsyncThunk(
  "category/getAllCategory",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      if (payload) {
        const data = await api.get(
          `/category/all?page=${payload.page}&limit=${payload.limit}`
        );
        dispatch(setLoading(false));
        return data;
      }
      const data = await api.get(`/category/all`);
      dispatch(setLoading(false));

      return data;
    } catch (error) {
      console.log(error, "error");
      dispatch(setLoading(true));
    }
  }
);
export const getDetailCategory = createAsyncThunk(
  "category/getDetailCategory",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const data = await api.get(`/category/detail/${payload}`);
      dispatch(setLoading(false));

      dispatch(setLoading(false));

      return data;
    } catch (error) {
      console.log(error, "error");
      dispatch(setLoading(false));
    }
  }
);
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const data = await api.post(`/category/create`, payload);
      notify("success", data.message);
      dispatch(closeModal());
      dispatch(setLoading(false));
      dispatch(getAllCategory());
      return data;
    } catch (error) {
      dispatch(closeModal());
      dispatch(setLoading(false));
      notify("error", error.response.data.message);
    }
  }
);
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, payload }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const data = await api.put(`/category/update/${id}`, payload);
      notify("success", data.message);
      dispatch(closeModal());
      dispatch(setLoading(false));
      dispatch(getAllCategory());
      return data;
    } catch (error) {
      dispatch(closeModal());
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const data = await api.delete(`/category/delete/${id}`);
      notify("success", data.message);
      dispatch(setLoading(false));
      dispatch(getAllCategory());
      return data;
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const deleteAllCategory = createAsyncThunk(
  "category/deleteAllCategory",
  async (listId, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.post(`/category/deleteAll`, {
        listDelete: listId,
      });
      notify("success", "Xóa tất cả danh mục thành công");
      dispatch(setLoading(false));
      dispatch(getAllCategory());
      return data;
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const searchCategory = createAsyncThunk(
  "category/searchCategory",
  async ({ searchBy, searchValue }, { dispatch }) => {
    console.log(searchBy, searchValue, "search");
    dispatch(setLoading(true));
    try {
      if (searchValue.trim() == "") {
        const data = await api.get(`/category/all`);
        dispatch(setLoading(false));
        return data;
      }
      const data = await api.get(
        `/category/all?searchBy=${searchBy}&searchValue=${searchValue}`
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
export const {} = categorySlice.actions;

export default categorySlice.reducer;
