import axios from "axios";

const apiFetcher = axios.create();

apiFetcher.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000/api";

apiFetcher.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err.response.data);
    return Promise.reject(err);
  }
);

export default apiFetcher;
