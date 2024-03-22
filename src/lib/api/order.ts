import { request } from "../utils/request";

type CreateOrderType = {
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

const createOrder = async (payload: CreateOrderType) => {
  return await request.post("/api/orders", payload);
};

export { createOrder };
