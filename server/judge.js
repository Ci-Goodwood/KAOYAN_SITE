import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const CC = process.env.CC || "clang";
const USE_PR = process.platform === "linux";
const EXE = process.platform === "win32" ? "a.exe" : "a.out";

// prlimit 按 UID 统计进程，nproc 太小会让编译器自己都 fork 不出来，这里留足余量
const COMPILE_LIMITS = [
  "--cpu=15",
  "--as=2147483648",
  "--nproc=512",
  "--nofile=512",
  "--fsize=67108864",
];
const RUN_LIMITS = [
  "--cpu=2",
  "--as=536870912",
  "--nproc=256",
  "--nofile=64",
  "--fsize=16777216",
];

// 自己建进程组并计时：超时直接对整组发 SIGKILL，子进程不会变成孤儿拖着管道不放
function spawnFile(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    const started = Date.now();
    const child = spawn(cmd, args, {
      cwd: opts.cwd,
      detached: true,
      stdio: ["pipe", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
      try {
        process.kill(-child.pid, "SIGKILL");
      } catch (_) {
        try {
          child.kill("SIGKILL");
        } catch (__) {
          /* ignore */
        }
      }
    }, opts.timeout || 15000);

    child.stdout.on("data", (d) => {
      if (stdout.length < 8 * 1024 * 1024) stdout += d.toString("utf8");
    });
    child.stderr.on("data", (d) => {
      if (stderr.length < 64 * 1024) stderr += d.toString("utf8");
    });

    const finish = (code, signal, extraErr) => {
      clearTimeout(timer);
      resolve({
        code,
        signal,
        stdout,
        stderr: extraErr ? stderr + extraErr : stderr,
        ms: Date.now() - started,
        timedOut,
      });
    };

    child.on("error", (err) => finish(-1, null, String(err)));
    child.on("close", (code, signal) => finish(code, signal, ""));
    child.stdin.on("error", () => {
      /* 程序先退出时写 stdin 会 EPIPE，忽略 */
    });
    child.stdin.end(opts.input == null ? "" : opts.input);
  });
}

function classify(res) {
  if (res.timedOut) return { status: "TLE", ms: res.ms, stdout: res.stdout, stderr: res.stderr };
  if (res.signal === "SIGXCPU") return { status: "TLE", ms: res.ms, stdout: res.stdout, stderr: res.stderr };
  if (res.signal === "SIGSEGV") return { status: "RE", ms: res.ms, stdout: res.stdout, stderr: res.stderr };
  if (res.code === 0) return { status: "OK", ms: res.ms, stdout: res.stdout, stderr: res.stderr };
  if (res.code === 137 || res.code === 143 || res.code === 124) {
    return { status: "TLE", ms: res.ms, stdout: res.stdout, stderr: res.stderr };
  }
  if (res.ms >= 4800) return { status: "TLE", ms: res.ms, stdout: res.stdout, stderr: res.stderr };
  return { status: "RE", ms: res.ms, stdout: res.stdout, stderr: res.stderr };
}

async function compile(dir, source) {
  await fs.writeFile(path.join(dir, "main.c"), source, "utf8");
  const compileArgs = ["-O1", "-w", "-std=gnu11", "-o", EXE, "main.c", "-lm"];
  let cmd;
  let args;
  if (USE_PR) {
    cmd = "prlimit";
    args = [...COMPILE_LIMITS, "--", CC, ...compileArgs];
  } else {
    cmd = CC;
    args = compileArgs;
  }
  const res = await spawnFile(cmd, args, { cwd: dir, timeout: 20000 });
  return {
    ok: res.code === 0 && !res.timedOut,
    log: res.stderr || res.stdout,
  };
}

async function runProgram(dir, stdin) {
  let cmd;
  let args;
  if (USE_PR) {
    cmd = "prlimit";
    args = [...RUN_LIMITS, "--", "./a.out"];
  } else {
    cmd = `./${EXE}`;
    args = [];
  }
  const res = await spawnFile(cmd, args, {
    cwd: dir,
    input: stdin,
    timeout: 5000,
  });
  return classify(res);
}

export function normalize(text) {
  return (text || "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n+$/g, "");
}

export async function evaluate(source, cases) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "ojudge-"));
  try {
    const c = await compile(dir, source);
    if (!c.ok) {
      return {
        stage: "compile",
        ok: false,
        log: normalize(c.log).slice(0, 3000),
      };
    }
    const results = [];
    for (const item of cases) {
      const r = await runProgram(dir, item.stdin);
      results.push({ name: item.name, stdin: item.stdin, ...r });
      // 超时或崩溃后不必再等后面的用例
      if (r.status === "TLE" || r.status === "RE" || r.status === "OLE") break;
    }
    while (results.length < cases.length) {
      const item = cases[results.length];
      results.push({
        name: item.name,
        stdin: item.stdin,
        status: "SKIP",
        ms: 0,
        stdout: "",
        stderr: "",
      });
    }
    return { stage: "run", ok: true, results };
  } finally {
    await fs.rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}
