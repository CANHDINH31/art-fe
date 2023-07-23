import { request } from "../utils/request";

const changePassword = (payload: { password: string }) =>
  request.post("api/users/change-password", payload);

export { changePassword };
