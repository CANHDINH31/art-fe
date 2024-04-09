import { typeTarget } from "../types";
import { request } from "../utils/request";

type createTargetPayload = {
  urls: string[];
  keywords: string[];
  hashtags: string[];
  profile: string;
};

type typeQueryTarget = {
  profileId?: string;
  status?: string;
};

const createTarget = async (payload: createTargetPayload) => {
  return await request.post("/api/targets", payload);
};

const getListTarget = (query?: typeQueryTarget) =>
  request.get("/api/targets?" + new URLSearchParams(query).toString());

const deleteTarget = (id: string) => request.delete("/api/targets/" + id);

const updateTarget = (id: string, payload: typeTarget) =>
  request.patch("/api/targets/" + id, payload);

export { createTarget, getListTarget, deleteTarget, updateTarget };
