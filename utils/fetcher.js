import axios from "axios";

const apiFetcher = axios.create();

apiFetcher.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost.com:3000/api/";

export default apiFetcher;
