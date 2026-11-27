// 把原文里的一行行文本整理成可渲染的块，**加粗**、表格、公式、项目符号都保留原样
import { splitFences } from "./highlight.js";

export function escHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function inline(text) {
  let out = escHtml(text);
  out = out.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  out = out.replace(/`([^`]+?)`/g, "<code>$1</code>");
  return out;
}

const PAGE_NO = /^\*?原书第\s*\d+\s*页\*?$/;

export function toBlocks(raw) {
  const blocks = [];
  for (const part of splitFences(raw)) {
    if (part.type === "code") {
      blocks.push({ t: "code", body: part.body });
      continue;
    }
    const lines = part.body
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !PAGE_NO.test(l));

    let i = 0;
    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith("|")) {
        const rows = [];
        while (i < lines.length && lines[i].startsWith("|")) {
          rows.push(lines[i]);
          i += 1;
        }
        blocks.push({
          t: "table",
          rows: rows.filter((r) => !/^\|[\s\-:|]+\|$/.test(r)),
        });
        continue;
      }

      if (/^\*\*[^*]+\*\*$/.test(line) || /^【[^】]{1,12}】$/.test(line)) {
        blocks.push({ t: "sub", text: line.replace(/\*\*/g, "") });
        i += 1;
        continue;
      }

      if (/^[・•·]\s?/.test(line)) {
        blocks.push({ t: "bullet", text: line.replace(/^[・•·]\s?/, "") });
        i += 1;
        continue;
      }

      if (
        !/[\u4e00-\u9fa5]/.test(line) &&
        /[=→≤≥<>]/.test(line) &&
        line.length < 90
      ) {
        blocks.push({ t: "formula", text: line });
        i += 1;
        continue;
      }

      blocks.push({ t: "p", text: line });
      i += 1;
    }
  }
  return blocks;
}

export function renderTableRow(row) {
  return row
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());
}
