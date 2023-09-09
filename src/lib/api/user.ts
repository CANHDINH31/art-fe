import { request } from "../utils/request";

type typeQueryUser = {
  page?: string;
  pageSize?: string;
  limit?: string;
  searchText?: string;
  provider?: string;
  role?: string;
};

const changePassword = (payload: { password: string }) =>
  request.post("api/users/change-password", payload);

const handleFavourite = (id: string) =>
  request.get("api/users/favourite/" + id);

const getListUsers = (query?: typeQueryUser) =>
  request.get("/api/users?" + new URLSearchParams(query).toString());

const deteleUser = (payload: string[]) =>
  request.post("/api/users/delete", { listIdDelete: payload });

const createUser = async (payload: FormData) => {
  return await request.post("/api/users/create-by-admin", payload);
};

export {
  changePassword,
  handleFavourite,
  getListUsers,
  deteleUser,
  createUser,
};
