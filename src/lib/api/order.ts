import { request } from "../utils/request";

type CreateOrderType = {
  visit?: string;
  name: string;
  phone: string;
  address: string;
  note?: string;
  user: string;
  cart: CartType[];
};

type CartType = {
  paint: string;
  amount: number;
};

type typeQueryOrder = {
  page?: string;
  pageSize?: string;
  limit?: string;
  searchText?: string;
  userId?: string;
};

const createOrder = async (payload: CreateOrderType) => {
  return await request.post("/api/orders", payload);
};

const getListOrders = (query?: typeQueryOrder) =>
  request.get("/api/orders?" + new URLSearchParams(query).toString());

export { createOrder, getListOrders };
