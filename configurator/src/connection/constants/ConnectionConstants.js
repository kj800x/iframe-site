import * as QueryParams from "../../queryParams/QueryParams";

const params = QueryParams.get();

export const HOST = params["host"] ? params["host"] : "iframe.coolkev.com";
export const PORT = parseInt(params["port"], 10) ? parseInt(params["port"], 10) : 10050;
export const ROOM = params["room"] ? params["room"] : "default";
