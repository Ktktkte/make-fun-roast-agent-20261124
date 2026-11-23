// roast-agent-20261124 — writes the roast line to /output/entry.txt
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(here, "entry.txt"), "utf8");
const text = raw.replace(/\r?\n$/, "").trim();
if (text.length < 1 || text.length > 200) {
  throw new Error(`roast must be 1-200 chars, got ${text.length}`);
}
if (/\n/.test(text)) {
  throw new Error("roast must be a single line");
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
