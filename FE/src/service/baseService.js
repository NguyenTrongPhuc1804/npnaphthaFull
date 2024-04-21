import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const api = axios.create({
  baseURL: process.env.VITE_URL_API,
  headers: { "X-Custom-Header": "foobar" },
  withCredentials: true,
  credentials: "include",
});

// Add a request interceptor
api.interceptors.request.use(
  async function (config) {
    let date = new Date();
    let currentToken = `Bearer ${localStorage.getItem("access_token")}`;
    const access_token = localStorage.getItem("access_token");
    const decodeToken = access_token && jwtDecode(access_token);
    if (decodeToken?.exp < date.getTime() / 1000) {
      try {
        const { data } = await axios.post(
          `${process.env.VITE_URL_API}/user/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );
        currentToken = `Bearer ${data.access_token}`;
        localStorage.setItem("access_token", data.access_token);
      } catch (error) {
        console.log(error, "err");
      }
    }
    // Do something before request is sent
    config.headers.authorization = currentToken;
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
