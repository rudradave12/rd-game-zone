import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const clientDir = resolve(process.cwd(), "build", "client");
const indexPath = resolve(clientDir, "index.html");
const headersPath = resolve(clientDir, "_headers");
let index = await readFile(indexPath, "utf8");
const headers = await readFile(headersPath, "utf8");

// The static SPA shell is also returned for deep links. Resolve route-module
// hints into the path-aware early script so only the route being opened is
// fetched; the homepage should not compete with game-detail chunks.
const clientAssets = await readdir(resolve(clientDir, "assets"));
const routeModules = clientAssets
  .filter((file) => /^games\._(?:index|slug)-[\w-]+\.js$/.test(file))
  .sort();
const gamesIndexModule = routeModules.find((file) => file.startsWith("games._index-"));
const gamesSlugModule = routeModules.find((file) => file.startsWith("games._slug-"));
if (!gamesIndexModule || !gamesSlugModule) {
  throw new Error("Could not resolve the game library and detail route modules.");
}
index = index
  .replaceAll("__RD_GAMES_INDEX_MODULE__", `/assets/${gamesIndexModule}`)
  .replaceAll("__RD_GAMES_SLUG_MODULE__", `/assets/${gamesSlugModule}`);
await writeFile(indexPath, index, "utf8");

const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const stylePattern = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
const hashes = new Set();
const styleHashes = new Set();

for (const match of index.matchAll(scriptPattern)) {
  const [, attributes, source] = match;

  // Structured data is inert JSON, not a JavaScript execution sink.
  if (/type\s*=\s*["']application\/ld\+json["']/i.test(attributes)) continue;
  if (/\bsrc\s*=/i.test(attributes)) continue;

  const hash = createHash("sha256").update(source).digest("base64");
  hashes.add(`'sha256-${hash}'`);
}

for (const match of index.matchAll(stylePattern)) {
  const hash = createHash("sha256").update(match[1]).digest("base64");
  styleHashes.add(`'sha256-${hash}'`);
}

if (hashes.size === 0) {
  throw new Error("No inline executable scripts were found for the Content-Security-Policy.");
}
if (styleHashes.size === 0) {
  throw new Error("No critical inline styles were found for the Content-Security-Policy.");
}

const output = headers
  .replace("__CSP_SCRIPT_HASHES__", [...hashes].join(" "))
  .replace("__CSP_STYLE_HASHES__", [...styleHashes].join(" "));
if (output === headers || output.includes("__CSP_")) {
  throw new Error("A CSP hash placeholder was not found in build/client/_headers.");
}

await writeFile(headersPath, output, "utf8");
console.log(`Generated ${hashes.size} script and ${styleHashes.size} style CSP hash(es).`);
