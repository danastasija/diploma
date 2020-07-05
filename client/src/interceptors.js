import axios from "axios";
import authService from "./services/authService";
import router from "./routes";

axios.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

axios.interceptors.response.use((config) => {
  if (config.status === 401) {
    router.push("/login");
  }
  return config;
});
