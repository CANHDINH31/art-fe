import jwtDecode from "jwt-decode";
import { request } from "./request";
import { getRefreshToken } from "../api";
import Cookies from "js-cookie";

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
    const refreshToken = await Cookies.get("refresh_token");
    if (!refreshToken) return;
    const { data } = await getRefreshToken({ refreshToken });
    const { access_token, refresh_token } = data || {};
    setToken(access_token);
    setRefreshToken(refresh_token);
  } catch (error) {}
};

const setToken = (accessToken: string | null) => {
  if (accessToken) {
    Cookies.set("access_token", accessToken);
    request.defaults.headers.common.authorization = `Bearer ${accessToken}`;
    const { exp }: { exp: number } = jwtDecode(accessToken);
    handleTokenExpired(exp);
  } else {
    Cookies.remove("access_token");
    delete request.defaults.headers.common.authorization;
  }
};

const setRefreshToken = (refreshToken: string | null) => {
  if (refreshToken) {
    Cookies.set("refresh_token", refreshToken);
  } else {
    Cookies.remove("refresh_token");
  }
};

const isValidToken = (accessToken: string | null) => {
  if (!accessToken) return false;
  const decoded: any = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

export { setToken, setRefreshToken, isValidToken };
