import { request } from "../utils/request";

const getListCategory = () => request.get("/api/categories");

const getDetailCategory = (id: string) => request.get("/api/categories/" + id);

const updateCategory = (payload: {
  _id: string;
  url?: string;
  description?: string;
}) => request.patch("/api/categories", { listCategories: [payload] });

const removeFromCategory = (payload: {
  _id: string;
  list_paint_id: string[];
}) =>
  request.patch("/api/categories/remove-to-category", {
    listCategories: [payload],
  });

const addToCategory = (payload: {
  list_category_id: string[];
  list_paint_id: string[];
}) => request.patch("/api/categories/add-to-category", payload);

const getListPaintRelation = (id: string) =>
  request.get("/api/categories/find-by-painting-id/" + id);

export {
  getListCategory,
  getDetailCategory,
  updateCategory,
  removeFromCategory,
  addToCategory,
  getListPaintRelation,
};
