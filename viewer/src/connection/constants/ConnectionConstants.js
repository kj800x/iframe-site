import * as QueryParams from "../../queryParams/QueryParams";

const params = QueryParams.get();

export const HOST = params["host"] ? params["host"] : window.location.hostname;
export const PORT = parseInt(params["port"], 10) ? parseInt(params["port"], 10) : 10050;
export const DEFAULT_ROOM = params["room"] ? params["room"] : "default";
