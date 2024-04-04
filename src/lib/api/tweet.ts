import { request } from "../utils/request";

type typeTweetOrder = {
  page?: string;
  pageSize?: string;
  limit?: string;
  searchText?: string;
};

const aiTweet = (payload: { prompt: string }) =>
  request.post("api/tweets/ai", payload);

const createTweet = async (payload: FormData) => {
  return await request.post("/api/tweets", payload);
};

const getListTweets = (query?: typeTweetOrder) =>
  request.get("/api/tweets?" + new URLSearchParams(query).toString());

export { aiTweet, createTweet, getListTweets };
