import { request } from "../utils/request";

const getListCategory = () => request.get("/api/categories");

const getDetailCategory = (id: string) => request.get("/api/categories/" + id);

const updateCategory = (payload: {
  _id: string;
  url?: string;
  description?: string;
}) => request.patch("/api/categories", { listCategories: [payload] });

export { getListCategory, getDetailCategory, updateCategory };
