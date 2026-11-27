// 轻量 C 语法高亮：类型关键字、控制关键字、预处理、函数名、字符串、数字、注释各用一色。
// 不引第三方依赖，手机上也不掉帧。

const TYPES = new Set([
  "auto", "bool", "char", "const", "double", "enum", "extern", "float",
  "inline", "int", "long", "register", "short", "signed", "sizeof", "static",
  "struct", "typedef", "union", "unsigned", "void", "volatile", "_Bool",
]);

const CTRL = new Set([
  "break", "case", "continue", "default", "do", "else", "for", "goto",
  "if", "return", "switch", "while",
]);

const LIB = new Set([
  "printf", "scanf", "malloc", "calloc", "realloc", "free", "NULL", "EOF",
  "fopen", "fclose", "fgets", "puts", "putchar", "getchar", "exit", "main",
]);

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function highlightC(src) {
  const text = String(src || "");
  const n = text.length;
  let out = "";
  let i = 0;

  const isStart = (c) => /[A-Za-z_]/.test(c);
  const isPart = (c) => /[A-Za-z0-9_]/.test(c);

  while (i < n) {
    const c = text[i];

    // 预处理指令：行首（允许缩进）的 #
    if (c === "#") {
      const lineStart = text.lastIndexOf("\n", i - 1) + 1;
      if (text.slice(lineStart, i).trim() === "") {
        let j = i;
        let continued = true;
        while (j < n && continued) {
          let eol = text.indexOf("\n", j);
          if (eol < 0) eol = n;
          const line = text.slice(j, eol);
          continued = /\\\s*$/.test(line);
          j = eol < n ? eol + 1 : n;
        }
        out += `<span class="tok-pre">${esc(text.slice(i, j))}</span>`;
        i = j;
        continue;
      }
    }

    // 行注释
    if (c === "/" && text[i + 1] === "/") {
      let j = text.indexOf("\n", i);
      if (j < 0) j = n;
      out += `<span class="tok-com">${esc(text.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // 块注释
    if (c === "/" && text[i + 1] === "*") {
      const end = text.indexOf("*/", i + 2);
      const j = end < 0 ? n : end + 2;
      out += `<span class="tok-com">${esc(text.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // 字符串与字符常量
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < n) {
        if (text[j] === "\\") {
          j += 2;
          continue;
        }
        if (text[j] === c) {
          j += 1;
          break;
        }
        if (text[j] === "\n") break;
        j += 1;
      }
      out += `<span class="tok-str">${esc(text.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // 数字
    if (/[0-9]/.test(c)) {
      let j = i;
      while (j < n && /[0-9a-fA-FxX.]/.test(text[j])) j += 1;
      out += `<span class="tok-num">${esc(text.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // 标识符
    if (isStart(c)) {
      let j = i;
      while (j < n && isPart(text[j])) j += 1;
      const word = text.slice(i, j);
      let cls = "";
      if (TYPES.has(word)) cls = "tok-type";
      else if (CTRL.has(word)) cls = "tok-ctrl";
      else if (LIB.has(word)) cls = "tok-fn";
      else {
        let k = j;
        while (k < n && /\s/.test(text[k])) k += 1;
        if (text[k] === "(") cls = "tok-fn";
      }
      out += cls ? `<span class="${cls}">${esc(word)}</span>` : esc(word);
      i = j;
      continue;
    }

    out += esc(c);
    i += 1;
  }

  return out;
}

// 把正文里 ``` 围起来的代码块拆出来，其余按段落返回
export function splitFences(raw) {
  const text = String(raw || "");
  const parts = [];
  const re = /```[^\n]*\n([\s\S]*?)```/g;
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    const before = text.slice(last, m.index);
    if (before.trim()) parts.push({ type: "text", body: before });
    parts.push({ type: "code", body: m[1] });
    last = re.lastIndex;
  }
  const rest = text.slice(last);
  if (rest.trim()) parts.push({ type: "text", body: rest });
  return parts;
}

// 段落切分：空行分段，行内 **加粗** 与 `代码` 简单处理
export function paragraphs(raw) {
  return String(raw || "")
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter(Boolean);
}
