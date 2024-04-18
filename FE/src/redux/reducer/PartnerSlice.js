import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../service/baseService";
import { notify } from "../../toolkits/help";
import { closeModal } from "./ModalSlice";
import { setLoading } from "./LoadingSlice";

const initialState = {
  listAllPartner: [],
  partnerDetail: {},
};

export const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPartner.fulfilled, (state, action) => {
      state.listAllPartner = action.payload;
    });
    builder.addCase(searchPartner.fulfilled, (state, action) => {
      state.listAllPartner = action.payload;
    });
    builder.addCase(getDetailPartner.fulfilled, (state, action) => {
      state.partnerDetail = action.payload;
    });
  },
});

//get all Partner
export const getAllPartner = createAsyncThunk(
  "partner/getAllPartner",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      if (payload) {
        const data = await api.get(
          `/partner/all?page=${payload.page}&limit=${payload.limit}`
        );
        dispatch(setLoading(false));
        return data;
      }
      const data = await api.get(`/partner/all`);
      dispatch(setLoading(false));

      return data;
    } catch (error) {
      console.log(error, "error");
      dispatch(setLoading(false));
    }
  }
);
export const createPartner = createAsyncThunk(
  "partner/createPartner",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      dispatch(closeModal());
      const { data } = await api.post(`/partner/create`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notify("success", "Tạo đối tác thành công");
      dispatch(setLoading(false));
      dispatch(getAllPartner());
      return data;
    } catch (error) {
      dispatch(closeModal());
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const updatePartner = createAsyncThunk(
  "partner/updatePartner",
  async ({ id, payload }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.put(`/partner/update/${id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data, "data");
      notify("success", "Sửa partner thành công");
      dispatch(closeModal());
      dispatch(setLoading(false));
      dispatch(getAllPartner());
      return data;
    } catch (error) {
      dispatch(closeModal());
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const getDetailPartner = createAsyncThunk(
  "partner/getDetailPartner",
  async ({ id }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.get(`/partner/detail/${id}`);
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      console.log(error, "error");
      dispatch(setLoading(false));
    }
  }
);
export const deletePartner = createAsyncThunk(
  "partner/deletePartner",
  async (id, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.delete(`/partner/delete/${id}`);
      console.log(data, "data");
      notify("success", "Xóa partner thành công");
      dispatch(setLoading(false));
      dispatch(getAllPartner());
      return data;
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const deleteAllPartner = createAsyncThunk(
  "partner/deleteAllpartner",
  async (listId, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.post(`/partner/deleteAll`, {
        listDelete: listId,
      });
      notify("success", "Xóa tất cả đối tác thành công");
      dispatch(setLoading(false));
      dispatch(getAllPartner());
      return data;
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const searchPartner = createAsyncThunk(
  "partner/searchpartner",
  async ({ searchBy, searchValue }, { dispatch }) => {
    console.log(searchBy, searchValue, "search");
    dispatch(setLoading(true));
    try {
      if (searchValue.trim() == "") {
        const data = await api.get(`/partner/all`);
        dispatch(setLoading(false));
        return data;
      }
      const data = await api.get(
        `/partner/all?searchBy=${searchBy}&searchValue=${searchValue}`
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
export const {} = partnerSlice.actions;

export default partnerSlice.reducer;
