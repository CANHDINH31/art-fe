import axios, { AxiosRequestConfig } from "axios";
let baseURL;

if (process.env.NODE_ENV === "production") {
  baseURL = process.env.NEXT_PUBLIC_DOMAIN;
} else {
  baseURL = process.env.NEXT_PUBLIC_DOMAIN_LOCAL;
}

function authRequestInterceptor(config: AxiosRequestConfig) {
  const _token = localStorage.getItem("access_token");

  if (_token && _token !== "undefined" && config.headers) {
    config.headers.authorization = _token;
  }

  return config;
}

export const request = axios.create({
  baseURL,
});

//@ts-ignore
request.interceptors.request.use(authRequestInterceptor);
