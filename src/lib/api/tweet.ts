import { request } from "../utils/request";

const aiTweet = (payload: { prompt: string }) =>
  request.post("api/tweets/ai", payload);

const createTweet = async (payload: FormData) => {
  return await request.post("/api/tweets", payload);
};

export { aiTweet, createTweet };
