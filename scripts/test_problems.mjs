import { PROBLEMS } from "../server/problems.js";
import { evaluate, normalize } from "../server/judge.js";

let fail = 0;

for (const [id, p] of Object.entries(PROBLEMS)) {
  const src = `${p.pre}\n${p.std}\n${p.post}\n`;
  const out = await evaluate(src, p.cases);
  if (!out.ok) {
    fail += 1;
    console.log(`[${id}] COMPILE FAIL: ${out.log.slice(0, 300)}`);
    continue;
  }
  const bad = out.results.filter((r) => r.status !== "OK");
  console.log(`[${id}] ${out.results.length} cases ${bad.length ? "RUN ISSUE" : "ok"}`);
  for (const r of out.results) {
    console.log(`    ${r.name} <- ${JSON.stringify(normalize(r.stdout))}`);
  }
}

console.log(fail ? `FAILED ${fail}` : "ALL COMPILED");
