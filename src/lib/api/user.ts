import { request } from "../utils/request";

const changePassword = (payload: { password: string }) =>
  request.post("api/users/change-password", payload);

const handleFavourite = (id: string) =>
  request.get("api/users/favourite/" + id);

export { changePassword, handleFavourite };
