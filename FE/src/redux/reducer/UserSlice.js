import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../service/baseService";
import { notify } from "../../toolkits/help";
import { setLoading } from "./LoadingSlice";
import { closeModal } from "./ModalSlice";

const initialState = {
  userLogin: {},
  userInfo: {},
  isLogin: false,
  allUserList: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogout: (state, action) => {
      state.isLogin = false;
      state.userLogin = {};
      state.userInfo = {};
      localStorage.clear();
      notify("success", "Đăng xuất thành công");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userLogin = action.payload;
      state.isLogin = true;
    });
    builder.addCase(getDataillUser.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (action.payload._id === localStorage.getItem("user_id")) {
        state.userInfo = action.payload;
      }
    });
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.allUserList = action.payload;
    });
    builder.addCase(searchUser.fulfilled, (state, action) => {
      state.allUserList = action.payload;
    });
  },
});

//login user
export const loginUser = createAsyncThunk(
  "user/login",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.post("/user/login", payload);
      notify("success", "Đăng nhập thành công");
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user_id", data.user_id);
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      console.log(error, "error");
      notify("error", error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const getDataillUser = createAsyncThunk(
  "user/getDataillUser",
  async ({ user_id }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.get(`/user/detail/${user_id}`);
      localStorage.setItem("user_info", JSON.stringify(data));
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      console.log(error, "error");
      dispatch(setLoading(false));
    }
  }
);
export const refreshToken = createAsyncThunk("user/refreshToken", async () => {
  try {
    const { data } = await api.get(`/user/refresh-token`);
    localStorage.setItem("access_token", data.access_token);
    return data;
  } catch (error) {
    console.log(error, "error");
  }
});
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, payload }, { dispatch }) => {
    dispatch(closeModal());
    dispatch(setLoading(true));
    try {
      const { data } = await api.put(`user/${id}`, payload);
      notify("success", "Cập nhật thành công");
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      notify(
        "error",
        error.response.data.message.codeName
          ? "Email đã tồn tại"
          : error.response.data.message
      );
      console.log(error, "error");
    }
  }
);
export const getAllUser = createAsyncThunk(
  "user/getAllUser",
  async (payload, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      if (payload) {
        const data = await api.get(
          `/user/all?page=${payload.page}&limit=${payload.limit}`
        );
        dispatch(setLoading(false));
        return data;
      }
      const data = await api.get(`/user/all`);
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      console.log(error, "error");
      dispatch(setLoading(false));
    }
  }
);
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ user_id, page }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const data = await api.delete(`/user/${user_id}`);
      notify("success", "Xóa thành công");
      dispatch(getAllUser({ page, limit: 8 }));
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      console.log(error, "error");
      notify("error", error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteAllUser = createAsyncThunk(
  "user/deleteAllUser",
  async (listId, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.post(`/user/deleteAll`, {
        listDelete: listId,
      });
      notify("success", "Đã xóa tất cả người dùng được chọn");
      dispatch(setLoading(false));
      dispatch(getAllUser());
      return data;
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error, "error");
      notify("error", error.response.data.message);
    }
  }
);
export const createUser = createAsyncThunk(
  "user/createUser",
  async (payload, { dispatch }) => {
    dispatch(closeModal());
    dispatch(setLoading(true));
    try {
      const { data } = await api.post(`/user/register`, payload);
      notify("success", "Tạo tài khoản thành công");
      dispatch(getAllUser());
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      console.log(error, "error");
      notify("error", error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const searchUser = createAsyncThunk(
  "user/searchUser",
  async ({ searchBy, searchValue }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      if (searchValue.trim() == "") {
        const data = await api.get(`/user/all`);
        dispatch(setLoading(false));
        return data;
      }
      const data = await api.get(
        `/user/all?searchBy=${searchBy}&searchValue=${searchValue}`
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

export const { setLogout } = userSlice.actions;

export default userSlice.reducer;
