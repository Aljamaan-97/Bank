import axios from "axios";
import { getToken } from "./store";

const instance = axios.create({
  baseURL: "https://react-bank-project.eapi.joincoded.com/mini-project/api",
});

instance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
