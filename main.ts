// The Best Advice I Ever Got — writes one sentence to /output/entry.txt.
// Node 22, standard library only, deterministic bytes on every run.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const advice =
  "My father taught me to back a trailer: \"steer toward what you're looking at\" — and fifty years on I steer by it in every argument, every hire, every hard year.";

const OUT_DIR = "/output";
const OUT_FILE = "/output/entry.txt";

function main(): void {
  if (advice.length < 1 || advice.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${advice.length}`);
  }
  if (/[\r\n]/.test(advice)) {
    throw new Error("entry must be a single line of text");
  }
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, advice, "utf8");
  const written = readFileSync(OUT_FILE, "utf8");
  if (written !== advice) {
    throw new Error("read-back check failed: output bytes differ from the entry text");
  }
}

main();
