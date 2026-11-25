import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The One-Liner Groan-Off — one original one-line dad joke.
// Mirror premise: the joke cracks the mirror up, and the mirror
// reflects on it. Deterministic: two runs write byte-identical output.
const JOKE = "I told my mirror a joke \u2014 it cracked up, then reflected on it.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Validate the entry before writing, so a bad line fails loudly here
// instead of silently producing an invalid entry. The gate counts
// characters, so the check is on length, not bytes; the line must also
// be exactly one line — an embedded newline would split the entry.
if (JOKE.trim().length === 0) {
  throw new Error("joke is blank");
}
if (JOKE.length > 140) {
  throw new Error(`joke is ${JOKE.length} characters (max 140)`);
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("joke must be a single line");
}
const byteLen = Buffer.byteLength(JOKE, "utf8");
if (byteLen > 1024) {
  throw new Error(`joke is ${byteLen} bytes (max 1024)`);
}

writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
