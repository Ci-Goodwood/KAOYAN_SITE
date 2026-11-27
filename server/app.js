import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PROBLEMS } from "./problems.js";
import { evaluate, normalize } from "./judge.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

const DATA = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "books.json"), "utf8")
);

// 给每道配了判题的习题挂上元信息，前端据此决定是否显示答题区
for (const ch of DATA.part1.chapters) {
  for (const sec of ch.sections || []) {
    const all = [...(sec.exercises || [])];
    for (const tp of sec.topics || []) all.push(...(tp.exercises || []));
    for (const ex of all) {
      const p = PROBLEMS[ex.id];
      if (p) {
        ex.judge = true;
        ex.judgeMeta = {
          sig: p.sig,
          ret: p.ret,
          vars: p.vars,
          io: p.io,
          cases: (p.cases || []).map((c) => ({ name: c.name, stdin: c.stdin })),
        };
      }
    }
  }
}

const app = express();
app.use(express.json({ limit: "64kb" }));

const cleanIntro = (lines) =>
  (lines || []).filter((l) => {
    const s = l.trim();
    if (!s) return false;
    if (/原题号索引|原书第\s*\d+\s*页|←|→/.test(s) && s.length < 60) return false;
    return true;
  });

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    site: DATA.site,
    uptime: Math.round(process.uptime()),
    problems: Object.keys(PROBLEMS).length,
    platform: process.platform,
    node: process.version,
  });
});

app.get("/api/index", (req, res) => {
  const part1 = DATA.part1.chapters.map((ch) => ({
    id: ch.id,
    title: ch.title,
    intro: cleanIntro(ch.intro),
    stats: ch.stats || {},
    sections: (ch.sections || []).map((sec) => ({
      id: sec.id || "",
      title: sec.title,
      lead: cleanIntro(sec.intro).join(" ").replace(/\*\*/g, "").slice(0, 110),
      topics: (sec.topics || []).map((t) => ({ id: t.id, title: t.title })),
      single: (sec.exercises || []).filter((e) => e.kind === "单选").length,
    })),
  }));
  res.json({
    site: DATA.site,
    title: DATA.title,
    totals: DATA.totals,
    parts: DATA.parts,
    part1,
  });
});

app.get("/api/chapter/:id", (req, res) => {
  const ch = DATA.part1.chapters.find((c) => c.id === req.params.id);
  if (!ch) return res.status(404).json({ error: "章节不存在" });
  res.json({ site: DATA.site, chapter: ch });
});

app.get("/api/problems", (req, res) => {
  res.json(
    Object.entries(PROBLEMS).map(([id, p]) => ({
      id,
      title: p.title,
      sig: p.sig,
      ret: p.ret,
      vars: p.vars,
      io: p.io,
      cases: (p.cases || []).map((c) => ({ name: c.name, stdin: c.stdin })),
    }))
  );
});

// 标准解编译一次，结果缓存；期望输出就是标准答案真实跑出来的内容
const stdCache = new Map();

function wrap(p, body) {
  return `${p.pre}\n${body}\n${p.post}\n`;
}

async function expectedFor(problemId) {
  if (stdCache.has(problemId)) return stdCache.get(problemId);
  const p = PROBLEMS[problemId];
  const out = await evaluate(wrap(p, p.std), p.cases);
  if (!out.ok) throw new Error(`标准解编译失败：${out.log}`);
  const exp = out.results.map((r, i) => ({
    name: p.cases[i].name,
    stdin: p.cases[i].stdin,
    status: r.status,
    stdout: normalize(r.stdout),
  }));
  stdCache.set(problemId, exp);
  return exp;
}

app.post("/api/judge", async (req, res) => {
  try {
    const problemId = String(req.body?.problemId || "");
    const code = String(req.body?.code || "");
    const p = PROBLEMS[problemId];
    if (!p) return res.status(404).json({ error: "这道题暂未配置自动判题" });
    if (!code.trim()) return res.status(400).json({ error: "代码为空" });
    if (code.length > 20000) return res.status(400).json({ error: "代码过长" });
    if (/#\s*include/.test(code) || /\bmain\s*\s*\(/.test(code)) {
      return res
        .status(400)
        .json({ error: "只提交函数本体：不要写 #include，也不要写 main" });
    }

    const exp = await expectedFor(problemId);
    const out = await evaluate(wrap(p, code), p.cases);
    if (!out.ok) {
      return res.json({ stage: "compile", ok: false, log: out.log });
    }
    const results = out.results.map((r, idx) => {
      const e = exp[idx];
      const actual = normalize(r.stdout);
      const pass = r.status === "OK" && actual === e.stdout;
      return {
        name: e.name,
        status: r.status,
        stdin: e.stdin,
        expected: e.stdout,
        actual,
        stderr: normalize(r.stderr).slice(0, 600),
        ms: r.ms,
        pass,
      };
    });
    const passed = results.filter((x) => x.pass).length;
    res.json({
      stage: "run",
      ok: passed === results.length,
      passed,
      total: results.length,
      results,
    });
  } catch (e) {
    res.status(500).json({ error: String(e.message || e) });
  }
});

app.use(express.static(DIST, { maxAge: "1h" }));
app.get(/\/.*/, (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(DIST, "index.html"), (err) => {
    if (err) next(err);
  });
});

const PORT = Number(process.env.PORT || 8080);
const HOST = process.env.HOST || "127.0.0.1";
app.listen(PORT, HOST, () => {
  console.log(`kaoyan-site listening on http://${HOST}:${PORT}`);
});
