import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../service/baseService";
import { notify } from "../../toolkits/help";
import { closeModal } from "./ModalSlice";
import { setLoading } from "./LoadingSlice";

const initialState = {
  listAllBanner: [],
  bannerDetail: {},
};

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBanner.fulfilled, (state, action) => {
      state.listAllBanner = action.payload;
    });
    builder.addCase(searchBanner.fulfilled, (state, action) => {
      state.listAllBanner = action.payload;
    });
    builder.addCase(getDetailBanner.fulfilled, (state, action) => {
      state.bannerDetail = action.payload;
    });
  },
});

//get all Banner
export const getAllBanner = createAsyncThunk(
  "banner/getAllBanner",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      if (payload) {
        const data = await api.get(
          `/banner/all?page=${payload.page}&limit=${payload.limit}`
        );
        dispatch(setLoading(false));
        return data;
      }
      const data = await api.get(`/banner/all`);
      dispatch(setLoading(false));

      return data;
    } catch (error) {
      console.log(error, "error");
      dispatch(setLoading(false));
    }
  }
);
export const createBanner = createAsyncThunk(
  "banner/createBanner",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.post(`/banner/create`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notify("success", "Tạo bài viết thành công");
      dispatch(closeModal());
      dispatch(setLoading(false));
      dispatch(getAllBanner());
      return data;
    } catch (error) {
      dispatch(closeModal());
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const updateBanner = createAsyncThunk(
  "banner/updateBanner",
  async ({ id, payload }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.put(`/banner/update/${id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data, "data");
      notify("success", "Sửa banner thành công");
      dispatch(closeModal());
      dispatch(setLoading(false));
      dispatch(getAllBanner());
      return data;
    } catch (error) {
      dispatch(closeModal());
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const getDetailBanner = createAsyncThunk(
  "banner/getDetailBanner",
  async ({ id }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.get(`/banner/detail/${id}`);
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      console.log(error, "error");
      dispatch(setLoading(false));
    }
  }
);
export const deleteBanner = createAsyncThunk(
  "banner/deleteBanner",
  async (id, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.delete(`/banner/delete/${id}`);
      console.log(data, "data");
      notify("success", "Xóa banner thành công");
      dispatch(setLoading(false));
      dispatch(getAllBanner());
      return data;
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const deleteAllBanner = createAsyncThunk(
  "banner/deleteAllbanner",
  async (listId, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.post(`/banner/deleteAll`, {
        listDelete: listId,
      });
      notify("success", "Xóa tất cả banner thành công");
      dispatch(setLoading(false));
      dispatch(getAllBanner());
      return data;
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const searchBanner = createAsyncThunk(
  "banner/searchbanner",
  async ({ searchBy, searchValue }, { dispatch }) => {
    console.log(searchBy, searchValue, "search");
    dispatch(setLoading(true));
    try {
      if (searchValue.trim() == "") {
        const data = await api.get(`/banner/all`);
        dispatch(setLoading(false));
        return data;
      }
      const data = await api.get(
        `/banner/all?searchBy=${searchBy}&searchValue=${searchValue}`
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
export const {} = bannerSlice.actions;

export default bannerSlice.reducer;
