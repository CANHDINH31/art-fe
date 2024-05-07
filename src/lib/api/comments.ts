import { request } from "../utils/request";

const getCommentByPaintId = (id: string) =>
  request.get("/api/comments/find-many-by-paint-id/" + id);

const createComment = (payload: {
  visit?: string;
  paint_id: string;
  content: string;
}) => request.post("/api/comments", payload);

const deleteComment = (id: string) => request.delete("/api/comments/" + id);

const updateComment = (id: string, payload: { content: string }) =>
  request.put("/api/comments/" + id, payload);

export { getCommentByPaintId, createComment, deleteComment, updateComment };
