import { request } from "../utils/request";

export type CreateAccessType = {
  visit?: string;
};

const createAccess = async (payload: CreateAccessType) => {
  return await request.post("/api/access", payload);
};

export { createAccess };
