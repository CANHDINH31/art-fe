import axios from "axios";
let baseURL;

if (process.env.NODE_ENV === "production") {
  baseURL = process.env.NEXT_PUBLIC_DOMAIN;
} else {
  baseURL = process.env.NEXT_PUBLIC_DOMAIN_LOCAL;
}

export const request = axios.create({
  baseURL,
});
