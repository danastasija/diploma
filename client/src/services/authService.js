import Axios from "axios";
import jwt_decode from "jwt-decode";

export default {
  tokenProperty: "accessToken",
  setToken(token) {
    token
      ? localStorage.setItem(this.tokenProperty, `Bearer ${token}`)
      : localStorage.removeItem(this.tokenProperty);
  },
  getToken() {
    return localStorage.getItem(this.tokenProperty);
  },
  decodeUser() {
    return jwt_decode(this.getToken());
  },
  login(login, password) {
    return Axios.post("/auth/login", { login, password })
      .then((res) => {
        return res.data.accessToken;
      })
      .catch((err) => {
        throw err.response.data;
      });
  },
  getProfile() {
    return Axios.get("/users/profile").then((res) => res.data);
  },
  getPermissions() {
    return Axios.get("/auth/permissions").then((res) => res.data);
  },
  verify() {
    return Axios.get("/auth/verify");
  },
  logOut() {
    this.setToken(null);
  },
};
