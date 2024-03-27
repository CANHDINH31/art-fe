import { request } from "../utils/request";

type createTargetPayload = {
  keywords: string[];
  hashtags: string[];
  views: number;
  likes: number;
  shares: number;
  comments: number;
  profile: string;
};

const createTarget = async (payload: createTargetPayload) => {
  return await request.post("/api/targets", payload);
};

export { createTarget };
