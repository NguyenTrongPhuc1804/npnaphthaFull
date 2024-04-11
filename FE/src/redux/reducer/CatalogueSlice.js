import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../service/baseService";
import { notify } from "../../toolkits/help";
import { closeModal } from "./ModalSlice";
import { setLoading } from "./LoadingSlice";

const initialState = {
  listAllCatalogue: [],
};

export const catalogueSlice = createSlice({
  name: "Catalogue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCatalogue.fulfilled, (state, action) => {
      state.listAllCatalogue = action.payload;
    });
    builder.addCase(searchCatalogue.fulfilled, (state, action) => {
      state.listAllCatalogue = action.payload;
    });
  },
});

//get all Catalogue
export const getAllCatalogue = createAsyncThunk(
  "catalogue/getAllCatalogue",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      if (payload) {
        const data = await api.get(
          `/catalogue/all?page=${payload.page}&limit=${payload.limit}`
        );
        dispatch(setLoading(false));
        return data;
      }
      const data = await api.get(`/catalogue/all`);
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      console.log(error, "error");
      dispatch(setLoading(true));
    }
  }
);
export const getDetailCatalogue = createAsyncThunk(
  "catalogue/getDetailCatalogue",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const data = await api.get(`/Catalogue/detail/${payload}`);
      dispatch(setLoading(false));

      dispatch(setLoading(false));

      return data;
    } catch (error) {
      console.log(error, "error");
      dispatch(setLoading(false));
    }
  }
);
export const createCatalogue = createAsyncThunk(
  "catalogue/createCatalogue",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      dispatch(closeModal());
      const data = await api.post(`/catalogue/create`, payload);
      notify("success", data.message);
      dispatch(setLoading(false));
      dispatch(getAllCatalogue());
      return data;
    } catch (error) {
      dispatch(closeModal());
      dispatch(setLoading(false));
      notify("error", error.response.data.message);
      console.log(error, "error");
    }
  }
);
export const updateCatalogue = createAsyncThunk(
  "catalogue/updateCatalogue",
  async ({ id, payload }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const data = await api.put(`/catalogue/update/${id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notify("success", data.message);
      dispatch(closeModal());
      dispatch(setLoading(false));
      dispatch(getAllCatalogue());
      return data;
    } catch (error) {
      dispatch(closeModal());
      dispatch(setLoading(false));
      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const updateCatalogueImage = createAsyncThunk(
  "catalogue/updateCatalogueImage",
  async ({ id, payload }, { dispatch }) => {
    try {
      const data = await api.put(`/catalogue/update/image/${id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // notify("success", data.message);
      // dispatch(closeModal());
      // dispatch(getAllCatalogue());
      return data;
    } catch (error) {
      dispatch(closeModal());
      console.log(error, "error");
      // notify("error", error.response.data.message);
    }
  }
);
export const deleteCatalogue = createAsyncThunk(
  "catalogue/deleteCatalogue",
  async (id, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const data = await api.delete(`/catalogue/delete/${id}`);
      notify("success", data.message);
      dispatch(setLoading(false));
      dispatch(getAllCatalogue());
      return data;
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const deleteAllCatalogue = createAsyncThunk(
  "catalogue/deleteAllCatalogue",
  async (listId, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.post(`/catalogue/deleteAll`, {
        listDelete: listId,
      });
      notify("success", "Xóa thành công");
      dispatch(setLoading(false));
      dispatch(getAllCatalogue());
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const searchCatalogue = createAsyncThunk(
  "catalogue/searchCatalogue",
  async ({ searchBy, searchValue }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      if (searchValue.trim() == "") {
        const data = await api.get(`/catalogue/all`);
        dispatch(setLoading(false));
        return data;
      }
      const data = await api.get(
        `/catalogue/all?searchBy=${searchBy}&searchValue=${searchValue}`
      );
      console.log(data, "datasearch");
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      console.log(error, "error");
      notify("error", error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const {} = catalogueSlice.actions;

export default catalogueSlice.reducer;
