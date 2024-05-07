import { request } from "../utils/request";

const handleRate = (payload: {
  value: number;
  paint_id: string;
  visit?: string;
}) => request.post("/api/rate", payload);

const findOneRateById = (id: string) =>
  request.get("/api/rate/find-one-by-id/" + id);

const findManyRateById = (id: string) =>
  request.get("/api/rate/find-many-by-id/" + id);

export { handleRate, findOneRateById, findManyRateById };
