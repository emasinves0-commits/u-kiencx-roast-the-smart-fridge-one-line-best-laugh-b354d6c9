// The Vending Machine Fridge - dependency-free Node script (built-ins only).
// Writes the entry to output/entry.txt after validating it against a rule table.
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const ENTRY =
  "The fridge dispenses my food back like a vending machine: insert leftovers, select B4, receive the same leftovers in a colder mood.";

export const MAX_CHARS = 160;

type Rule = { name: string; ok: (s: string) => boolean };

export const RULES: Rule[] = [
  { name: "not-blank", ok: (s) => s.trim().length > 0 },
  { name: "max-160-chars", ok: (s) => [...s].length <= MAX_CHARS },
  { name: "single-line", ok: (s) => !/[\r\n]/.test(s) },
  { name: "single-sentence", ok: (s) => (s.match(/\./g) ?? []).length <= 1 },
];

export function validate(s: string): void {
  for (const rule of RULES) {
    if (!rule.ok(s)) throw new Error(`entry rejected by rule: ${rule.name}`);
  }
}

export function writeEntry(dir: string, s: string): string {
  validate(s);
  mkdirSync(dir, { recursive: true });
  const file = join(dir, "entry.txt");
  writeFileSync(file, s); // no trailing newline
  const back = readFileSync(file);
  if (!back.equals(Buffer.from(s, "utf8"))) {
    throw new Error("read-back mismatch: bytes differ from entry");
  }
  return file;
}

function selfTest(): void {
  const bad: Array<[string, string, string]> = [
    ["empty string", "", "not-blank"],
    ["whitespace only", "   \t ", "not-blank"],
    ["161 chars", "a".repeat(MAX_CHARS + 1), "max-160-chars"],
    ["contains LF", "line one\nline two", "single-line"],
    ["contains CR", "line one\rline two", "single-line"],
    ["two sentences", "First sentence. Second sentence.", "single-sentence"],
  ];
  for (const [label, input, rule] of bad) {
    let msg = "";
    try {
      validate(input);
    } catch (e) {
      msg = (e as Error).message;
    }
    if (!msg.includes(rule)) {
      throw new Error(`self-test: "${label}" expected rejection by ${rule}, got: ${msg || "accepted"}`);
    }
    console.log(`ok  rejected ${label} -> ${rule}`);
  }

  validate("a".repeat(MAX_CHARS));
  console.log(`ok  accepted ${MAX_CHARS}-char entry`);

  const dir = mkdtempSync(join(tmpdir(), "fridge-vending-"));
  try {
    const file = writeEntry(dir, ENTRY);
    if (!readFileSync(file).equals(Buffer.from(ENTRY, "utf8"))) {
      throw new Error("self-test: round-trip bytes differ");
    }
    console.log(`ok  real entry round-trips byte-identical (${Buffer.byteLength(ENTRY)} bytes)`);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
  console.log("self-test passed");
}

function main(): void {
  if (process.argv.includes("--self-test")) {
    selfTest();
    return;
  }
  // The grader runs the program with its output directory on the path;
  // OUTPUT_DIR lets a caller point at /output explicitly without changing
  // the default that the local run and the self-test rely on.
  const outDir = process.env.OUTPUT_DIR ?? "output";
  const file = writeEntry(outDir, ENTRY);
  console.log(`wrote ${file} (${[...ENTRY].length} chars, ${Buffer.byteLength(ENTRY)} bytes)`);
}

main();
