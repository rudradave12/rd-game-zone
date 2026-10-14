import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const clientDir = resolve(process.cwd(), "build", "client");
const indexPath = resolve(clientDir, "index.html");
const headersPath = resolve(clientDir, "_headers");
const index = await readFile(indexPath, "utf8");
const headers = await readFile(headersPath, "utf8");

const scriptPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const hashes = new Set();

for (const match of index.matchAll(scriptPattern)) {
  const [, attributes, source] = match;

  // Structured data is inert JSON, not a JavaScript execution sink.
  if (/type\s*=\s*["']application\/ld\+json["']/i.test(attributes)) continue;
  if (/\bsrc\s*=/i.test(attributes)) continue;

  const hash = createHash("sha256").update(source).digest("base64");
  hashes.add(`'sha256-${hash}'`);
}

if (hashes.size === 0) {
  throw new Error("No inline executable scripts were found for the Content-Security-Policy.");
}

const output = headers.replace("__CSP_SCRIPT_HASHES__", [...hashes].join(" "));
if (output === headers) {
  throw new Error("The CSP hash placeholder was not found in build/client/_headers.");
}

await writeFile(headersPath, output, "utf8");
console.log(`Generated ${hashes.size} CSP script hash${hashes.size === 1 ? "" : "es"}.`);
