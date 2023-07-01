import { request } from "../utils/request";

const registerAccount = (payload: {
  name: string;
  email: string;
  password: string;
}) => request.post("/api/auth/register", payload);

export { registerAccount };
