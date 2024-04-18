import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../service/baseService";
import { notify } from "../../toolkits/help";
import { closeModal } from "./ModalSlice";
import { setLoading } from "./LoadingSlice";

const initialState = {
  listAllVideo: [],
  videoDetail: {},
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllVideoBanner.fulfilled, (state, action) => {
      state.listAllVideo = action.payload;
    });
    builder.addCase(searchVideo.fulfilled, (state, action) => {
      state.listAllVideo = action.payload;
    });
    builder.addCase(getDetailVideo.fulfilled, (state, action) => {
      state.videoDetail = action.payload;
    });
  },
});

//get all Video
export const getAllVideoBanner = createAsyncThunk(
  "video/getAllVideoBanner",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      if (payload) {
        const data = await api.get(
          `/video-banner/all?page=${payload.page}&limit=${payload.limit}`
        );
        dispatch(setLoading(false));
        return data;
      }
      const data = await api.get(`/video-banner/all`);
      dispatch(setLoading(false));

      return data;
    } catch (error) {
      console.log(error, "error");
      dispatch(setLoading(false));
    }
  }
);
export const createVideo = createAsyncThunk(
  "video/createVideo",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.post(`/video/create`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notify("success", "Tạo bài viết thành công");
      dispatch(closeModal());
      dispatch(setLoading(false));
      dispatch(getAllVideo());
      return data;
    } catch (error) {
      dispatch(closeModal());
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const updateVideoBanner = createAsyncThunk(
  "video/updateVideoBanner",
  async ({ id, payload }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      dispatch(closeModal());
      const { data } = await api.put(`/video-banner/update/${id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data, "data");
      notify("success", "Sửa video thành công");
      dispatch(setLoading(false));
      dispatch(getAllVideoBanner());
      return data;
    } catch (error) {
      dispatch(closeModal());
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const getDetailVideo = createAsyncThunk(
  "video/getDetailVideo",
  async ({ id }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.get(`/video/detail/${id}`);
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      console.log(error, "error");
      dispatch(setLoading(false));
    }
  }
);
export const deleteVideo = createAsyncThunk(
  "video/deleteVideo",
  async (id, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.delete(`/video/delete/${id}`);
      console.log(data, "data");
      notify("success", "Xóa video thành công");
      dispatch(setLoading(false));
      dispatch(getAllVideo());
      return data;
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const deleteAllVideo = createAsyncThunk(
  "video/deleteAllvideo",
  async (listId, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.post(`/video/deleteAll`, {
        listDelete: listId,
      });
      notify("success", "Xóa tất cả video thành công");
      dispatch(setLoading(false));
      dispatch(getAllVideo());
      return data;
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const searchVideo = createAsyncThunk(
  "video/searchvideo",
  async ({ searchBy, searchValue }, { dispatch }) => {
    console.log(searchBy, searchValue, "search");
    dispatch(setLoading(true));
    try {
      if (searchValue.trim() == "") {
        const data = await api.get(`/video/all`);
        dispatch(setLoading(false));
        return data;
      }
      const data = await api.get(
        `/video/all?searchBy=${searchBy}&searchValue=${searchValue}`
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
export const {} = videoSlice.actions;

export default videoSlice.reducer;
