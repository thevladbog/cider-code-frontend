import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { paths } from "./types/openapi/api";

const fetchClient = createFetchClient<paths>({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
});

console.log(import.meta.env.VITE_BACKEND_URL);

export const $api = createClient(fetchClient);
