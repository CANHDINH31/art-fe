import { request } from "../utils/request";

type typeTweetOrder = {
  page?: string;
  pageSize?: string;
  limit?: string;
  searchText?: string;
  status?: string;
};

const aiTweet = (payload: { prompt: string }) =>
  request.post("api/tweets/ai", payload);

const createTweet = async (payload: FormData) => {
  return await request.post("/api/tweets", payload);
};

const getListTweets = (query?: typeTweetOrder) =>
  request.get("/api/tweets?" + new URLSearchParams(query).toString());

const getExportCsv = (query?: typeTweetOrder) =>
  request.get(
    "/api/tweets/export-csv?" + new URLSearchParams(query).toString()
  );

const getDetailTweet = async (id: string) => {
  return await request.get("/api/tweets/" + id);
};

export { aiTweet, createTweet, getListTweets, getDetailTweet, getExportCsv };
