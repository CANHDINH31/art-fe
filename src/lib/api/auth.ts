import { typeRefreshToken } from "../types";
import { request } from "../utils/request";

const registerAccount = (payload: {
  name: string;
  email: string;
  password: string;
}) => request.post("/api/auth/register", payload);

const signInAccount = (payload: { email: string; password: string }) =>
  request.post("/api/auth/sign-in", payload);

const getRefreshToken = (args: typeRefreshToken) =>
  request.post("/api/auth/refresh", args);

const getMe = () => request.get("/api/auth/me");

const loginByPlatform = (method: string, token: string) =>
  request.post("api/auth/" + method, { token });

export {
  registerAccount,
  signInAccount,
  getRefreshToken,
  getMe,
  loginByPlatform,
};
