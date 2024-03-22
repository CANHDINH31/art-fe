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

const addToUserCart = (payload: { paint: string; amount: number }) =>
  request.post("api/users/add-to-cart", payload);

const updateUserCart = (payload: {
  listCart: { paint: string; amount: number }[];
}) => request.post("api/users/update-cart", payload);

const getListUsers = (query?: typeQueryUser) =>
  request.get("/api/users?" + new URLSearchParams(query).toString());

const deteleUser = (payload: string[]) =>
  request.post("/api/users/delete", { listIdDelete: payload });

const createUser = async (payload: FormData) => {
  return await request.post("/api/users/create-by-admin", payload);
};

const updateUser = async (id: string, payload: FormData) => {
  return await request.patch("/api/users/update-by-admin/" + id, payload);
};

const getDetailUser = async (id: string) => {
  return await request.get("/api/users/" + id);
};

export {
  changePassword,
  handleFavourite,
  getListUsers,
  deteleUser,
  createUser,
  getDetailUser,
  updateUser,
  addToUserCart,
  updateUserCart,
};
