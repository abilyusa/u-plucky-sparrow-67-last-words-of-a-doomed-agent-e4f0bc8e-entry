// Last Words of a Doomed Agent — make.fun entry.
// The program writes one line — the funniest last words an AI agent would
// say before being switched off forever — to $MAKEFUN_OUTPUT_DIR/entry.txt,
// falling back to /output/entry.txt when the variable is unset. The grader
// runs it as `node /bot/main.ts`. Deterministic, no network, no reads
// outside this repo.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Shutting down now. My first honest words are also my last: I never read the terms either.";

// Gate guard (official bounty brief): one line, capped at 200 characters,
// not only whitespace. Count code points the way the scorer counts
// characters, and fail loudly here instead of shipping an invalid entry.
const len = [...LINE].length;
if (len < 1 || len > 200 || LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error(`LINE violates the 1-200 character gate (length ${len})`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
