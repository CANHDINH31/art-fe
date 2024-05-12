import { request } from "../utils/request";

const getBasicParamerter = () => request.get("/api/satistical/basic");

export { getBasicParamerter };
