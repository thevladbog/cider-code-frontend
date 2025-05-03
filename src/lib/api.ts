import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { paths } from "./types/openapi/api";
import { BACKEND_URL } from "./const/env";

const fetchClient = createFetchClient<paths>({
  baseUrl: BACKEND_URL,
});

export const $api = createClient(fetchClient);
