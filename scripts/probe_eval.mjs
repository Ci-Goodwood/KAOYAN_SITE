import { PROBLEMS } from "../server/problems.js";
import { evaluate } from "../server/judge.js";

const p = PROBLEMS["综合 2.2-02"];
const src = `${p.pre}\n${p.std}\n${p.post}\n`;
const out = await evaluate(src, p.cases);
console.log(JSON.stringify(out, null, 1).slice(0, 1200));
