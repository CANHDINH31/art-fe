import { request } from "../utils/request";

const getByTweet = async (id: string) => {
  return await request.get("/api/replies/find-by-tweet/" + id);
};

export { getByTweet };
