import { request } from "../utils/request";

const aiTweet = (payload: { prompt: string }) =>
  request.post("api/tweets/ai", payload);

export { aiTweet };
