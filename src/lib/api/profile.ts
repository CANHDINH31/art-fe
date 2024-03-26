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

const getDetailProfile = async (id: string) => {
  return await request.get("/api/profiles/" + id);
};

const getListProfile = () => request.get("/api/profiles");

export { createProfile, getListProfile, getDetailProfile };
