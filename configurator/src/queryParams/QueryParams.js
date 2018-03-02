const queryString = require('query-string');

export function get() {
  return queryString.parse(window.location.search);
}

export function upsert(newParams) {
  const oldParams = get();
  const finalParams = Object.assign(Object.assign({}, oldParams), newParams);
  window.location.search = queryString.stringify(finalParams);
}

export function set(newParams) {
  window.location.search = queryString.stringify(newParams);
}