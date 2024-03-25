import { request } from "../utils/request";

export type CreateProfileType = {
  appKey: string;
  appSecret: string;
  accessToken: string;
  accessSecret: string;
};

const createProfile = async (payload: CreateProfileType) => {
  return await request.post("/api/profiles", payload);
};

const getListProfile = () => request.get("/api/profiles");

export { createProfile, getListProfile };
