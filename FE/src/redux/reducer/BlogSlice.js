import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../service/baseService";
import { notify } from "../../toolkits/help";
import { closeModal } from "./ModalSlice";
import { setLoading } from "./LoadingSlice";

const initialState = {
  listAllBlog: [],
  blogDetail: {},
};

export const BlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBlog.fulfilled, (state, action) => {
      state.listAllBlog = action.payload;
    });
    builder.addCase(searchBlog.fulfilled, (state, action) => {
      state.listAllBlog = action.payload;
    });
    builder.addCase(getDetailBlog.fulfilled, (state, action) => {
      state.blogDetail = action.payload;
    });
  },
});

//get all Blog
export const getAllBlog = createAsyncThunk(
  "blog/getAllBlog",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      if (payload) {
        const data = await api.get(
          `/blog/all?page=${payload.page}&limit=${payload.limit}`
        );
        dispatch(setLoading(false));
        return data;
      }
      const data = await api.get(`/blog/all`);
      dispatch(setLoading(false));

      return data;
    } catch (error) {
      console.log(error, "error");
      dispatch(setLoading(false));
    }
  }
);
export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.post(`/blog/create`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notify("success", "Tạo bài viết thành công");
      dispatch(closeModal());
      dispatch(setLoading(false));
      dispatch(getAllBlog());
      return data;
    } catch (error) {
      dispatch(closeModal());
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async ({ id, payload }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.put(`/blog/update/${id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data, "data");
      notify("success", "Sửa blog thành công");
      dispatch(closeModal());
      dispatch(setLoading(false));
      dispatch(getAllBlog());
      return data;
    } catch (error) {
      dispatch(closeModal());
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const getDetailBlog = createAsyncThunk(
  "blog/getDetailBlog",
  async ({ slug }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.get(`/blog/detail/${slug}`);
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      console.log(error, "error");
      dispatch(setLoading(false));
    }
  }
);
export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (id, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.delete(`/blog/delete/${id}`);
      console.log(data, "data");
      notify("success", "Xóa blog thành công");
      dispatch(setLoading(false));
      dispatch(getAllBlog());
      return data;
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const deleteAllBlog = createAsyncThunk(
  "blog/deleteAllblog",
  async (listId, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.post(`/Blog/deleteAll`, {
        listDelete: listId,
      });
      notify("success", "Xóa tất cả blog thành công");
      dispatch(setLoading(false));
      dispatch(getAllBlog());
      return data;
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const searchBlog = createAsyncThunk(
  "blog/searchblog",
  async ({ searchBy, searchValue }, { dispatch }) => {
    console.log(searchBy, searchValue, "search");
    dispatch(setLoading(true));
    try {
      if (searchValue.trim() == "") {
        const data = await api.get(`/blog/all`);
        dispatch(setLoading(false));
        return data;
      }
      const data = await api.get(
        `/blog/all?searchBy=${searchBy}&searchValue=${searchValue}`
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
export const {} = BlogSlice.actions;

export default BlogSlice.reducer;
