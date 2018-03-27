const queryString = require('query-string');

export default function buildScaledEmoji(url, scaleFactor) {
  const parsed = queryString.parse(url.split("?").slice(1).join("?"));
  parsed["IFRAME_SCALE"] = scaleFactor;
  const base = url.split("?")[0];
  return base + "?" + queryString.stringify(parsed);
}