import jwtDecode from "jwt-decode";
import { request } from "./request";
import { getRefreshToken } from "../api";

const handleTokenExpired = (exp: number) => {
  let expiredTimer;
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;
  clearTimeout(expiredTimer);
  expiredTimer = setTimeout(() => {
    handleRefreshToken();
  }, timeLeft);
};

const handleRefreshToken = async () => {
  try {
    const refreshToken = await localStorage.getItem("refresh_token");
    if (!refreshToken) return;
    const { data } = await getRefreshToken({ refreshToken });
    const { access_token, refresh_token } = data || {};
    setToken(access_token);
    setRefreshToken(refresh_token);
  } catch (error) {}
};

const setToken = (accessToken: string | null) => {
  if (accessToken) {
    window.localStorage.setItem("access_token", accessToken);
    request.defaults.headers.common.authorization = `Bearer ${accessToken}`;
    const { exp }: { exp: number } = jwtDecode(accessToken);
    handleTokenExpired(exp);
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
