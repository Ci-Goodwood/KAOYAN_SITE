import { readFileSync, writeFileSync } from "node:fs";

const target = process.argv[2];
const blockFile = process.argv[3];
const file = readFileSync(target, "utf8");
const block = readFileSync(blockFile, "utf8");
const idx = file.lastIndexOf("\n};");
if (idx < 0) throw new Error("找不到 PROBLEMS 结尾");
const out = file.slice(0, idx + 1) + "\n" + block + file.slice(idx + 1);
writeFileSync(target, out, "utf8");
console.log("inserted", block.split("\n").length, "lines");
