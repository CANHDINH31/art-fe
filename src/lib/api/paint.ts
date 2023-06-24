import { request } from "../utils/request";

const getListPaint = (page: number, title: string) =>
  request.get("/api/paints?page=" + page + "&title=" + title);
const addNewPaint = (payload: { url: string; title: string }) =>
  request.post("/api/paints", { listPaints: [payload] });

const detelePaint = (payload: string[]) =>
  request.post("/api/paints/delete", { listIdDelete: payload });

export { getListPaint, addNewPaint, detelePaint };
