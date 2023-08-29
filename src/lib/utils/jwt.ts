import jwtDecode from "jwt-decode";
import { request } from "./request";

const setToken = (accessToken: string | null) => {
  if (accessToken) {
    window.localStorage.setItem("access_token", accessToken);
    request.defaults.headers.common.authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("access_token");
    delete request.defaults.headers.common.authorization;
  }
};

const clearToken = () => {
  setToken("");
  setRefreshToken("");
};

const setRefreshToken = (refreshToken: string | null) => {
  if (refreshToken) {
    window.localStorage.setItem("refresh_token", refreshToken);
  } else {
    window.localStorage.removeItem("refresh_token");
  }
};

const isValidToken = (token: string | null) => {
  if (!token) return false;
  const decoded: any = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

export { setToken, setRefreshToken, isValidToken, clearToken };
