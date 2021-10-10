import axios from "axios";

const api = axios.create();

api.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000/api";

api.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default api;
