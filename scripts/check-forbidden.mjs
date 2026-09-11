#!/usr/bin/env node
/**
 * Guards the repositioning: ASC creates access to an ecosystem, it does not
 * fund, incubate or accelerate startups itself.
 *
 * Fails the run if any banned phrase reappears in the copy or the data files.
 * Run with `npm run check:copy`.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const BANNED = [
  "Biz böyük startaplar qururuq",
  "kapital təqdim edirik",
  "erkən mərhələ maliyyələşməsi",
  "ilkin maliyyə",
  "Ağıllı Kapital",
  "İnkubasiya",
  "Akselerasiya",
  "3 Aylıq",
  "3 aylıq",
  "6 Aylıq",
  "6 aylıq",
  "Rezident Sahibkar",
  "əlavə investisiya",
  "Daha Ətraflı",
  "İndi Müraciət Et",
  "Qeydiyyat",
  "Səyahətə Başla",
  "Proqramları Kəşf Et",
];

/** "Qeydiyyatdan Keç" is the modal's sign-up link and is allowed to stay. */
const ALLOWED_SUBSTRINGS = ["Qeydiyyatdan Keç"];

const ROOTS = ["locales", "data", "components", "app"];

function collect(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      collect(path, files);
    } else if (/\.(ts|tsx)$/.test(path)) {
      files.push(path);
    }
  }
  return files;
}

let failures = 0;

for (const root of ROOTS) {
  for (const file of collect(root)) {
    // The checker lists the banned phrases itself — don't scan it.
    if (file.includes("check-forbidden")) continue;

    const lines = readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, index) => {
      let haystack = line;
      for (const allowed of ALLOWED_SUBSTRINGS) {
        haystack = haystack.split(allowed).join("");
      }
      for (const phrase of BANNED) {
        if (haystack.includes(phrase)) {
          console.error(
            `${file}:${index + 1}  banned phrase "${phrase}"\n    ${line.trim()}`,
          );
          failures += 1;
        }
      }
    });
  }
}

if (failures > 0) {
  console.error(`\n${failures} banned phrase(s) found.`);
  process.exit(1);
}

console.log("Copy check passed — no banned phrases found.");
