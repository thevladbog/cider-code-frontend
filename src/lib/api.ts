import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { paths } from "./types/openapi/api";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

if (!baseUrl) {
  throw new Error("VITE_BACKEND_URL environment variable is not defined");
}

const fetchClient = createFetchClient<paths>({
  baseUrl,
});

export const $api = createClient(fetchClient);
