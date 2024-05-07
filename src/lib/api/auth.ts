import { request } from "../utils/request";

const registerAccount = (payload: {
  name: string;
  visit?: string;
  email: string;
  password: string;
}) => request.post("/api/auth/register", payload);

const signInAccount = (payload: { email: string; password: string }) =>
  request.post("/api/auth/sign-in", payload);

const getRefreshToken = (payload: { refreshToken: string }) =>
  request.post("/api/auth/refresh", payload);

const getMe = () => request.get("/api/auth/me");

const loginByPlatform = (method: string, token: string) =>
  request.post("api/auth/" + method, { token });

const sendEmail = (payload: { email: string }) =>
  request.post("api/auth/forgot-password", payload);

const resetPassword = (payload: { token: string; password: string }) =>
  request.post("api/auth/reset-password", payload);

export {
  registerAccount,
  signInAccount,
  getRefreshToken,
  getMe,
  loginByPlatform,
  sendEmail,
  resetPassword,
};
