import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL ?? "",
  timeout: 20_000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Api;
