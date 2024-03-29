import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const api = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  headers: { "X-Custom-Header": "foobar" },
});

// Add a request interceptor
api.interceptors.request.use(
  async function (config) {
    let token = `Bearer ${localStorage.getItem("access_token")}`;

    // Do something before request is sent
    config.headers.authorization = token;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
