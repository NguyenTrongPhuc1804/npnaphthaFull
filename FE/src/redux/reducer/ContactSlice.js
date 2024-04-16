import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../service/baseService";
import { notify } from "../../toolkits/help";
import { closeModal } from "./ModalSlice";
import { setLoading } from "./LoadingSlice";

const initialState = {
  listAllContact: [],
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllContact.fulfilled, (state, action) => {
      state.listAllContact = action.payload;
    });
    builder.addCase(searchContact.fulfilled, (state, action) => {
      state.listAllContact = action.payload;
    });
  },
});

//get all Contact
export const getAllContact = createAsyncThunk(
  "user/getAllContact",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      if (payload) {
        const data = await api.get(
          `/contact/all?page=${payload.page}&limit=${payload.limit}`
        );
        dispatch(setLoading(false));
        return data;
      }
      const data = await api.get(`/contact/all`);
      dispatch(setLoading(false));

      return data;
    } catch (error) {
      console.log(error, "error");
      dispatch(setLoading(true));
    }
  }
);
export const getDetailContact = createAsyncThunk(
  "user/getDetailContact",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const data = await api.get(`/contact/detail/${payload}`);
      dispatch(setLoading(false));

      dispatch(setLoading(false));

      return data;
    } catch (error) {
      console.log(error, "error");
      dispatch(setLoading(false));
    }
  }
);
export const createContact = createAsyncThunk(
  "user/createContact",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const data = await api.post(`/contact/create`, payload);
      notify("success", data.message);
      dispatch(closeModal());
      dispatch(setLoading(false));
      // dispatch(getAllContact());
      return data;
    } catch (error) {
      dispatch(closeModal());
      dispatch(setLoading(false));
      notify("error", error.response.data.message);
    }
  }
);
export const updateContact = createAsyncThunk(
  "user/updateContact",
  async ({ id, isSeen }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const data = await api.put(`/contact/update/${id}`, { isSeen });
      dispatch(setLoading(false));
      dispatch(getAllContact());
      return data;
    } catch (error) {
      dispatch(closeModal());
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "user/deleteContact",
  async (id, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const data = await api.delete(`/contact/delete/${id}`);
      notify("success", data.message);
      dispatch(setLoading(false));
      dispatch(getAllContact());
      return data;
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const deleteAllContact = createAsyncThunk(
  "contact/deleteAllContact",
  async (listId, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.post(`/contact/deleteAll`, {
        listDelete: listId,
      });
      notify("success", "Xóa tất cả liên hệ thành công");
      dispatch(setLoading(false));
      dispatch(getAllContact());
      return data;
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const searchContact = createAsyncThunk(
  "user/searchContact",
  async ({ searchBy, searchValue }, { dispatch }) => {
    console.log(searchBy, searchValue, "search");
    dispatch(setLoading(true));
    try {
      if (searchValue.trim() == "") {
        const data = await api.get(`/contact/all`);
        dispatch(setLoading(false));
        return data;
      }
      const data = await api.get(
        `/contact/all?searchBy=${searchBy}&searchValue=${searchValue}`
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
export const {} = contactSlice.actions;

export default contactSlice.reducer;
