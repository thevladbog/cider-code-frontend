import createClient from "openapi-fetch";
import { paths } from "./types/openapi/api";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

if (!baseUrl) {
  throw new Error("VITE_BACKEND_URL environment variable is not defined");
}

export const $api = createClient<paths>({
  baseUrl,
  credentials: "include",
});
