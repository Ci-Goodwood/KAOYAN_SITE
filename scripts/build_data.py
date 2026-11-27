# -*- coding: utf-8 -*-
"""把 DSA-KAOYAN 的章节 Markdown 与答案解析成结构化 JSON。原文不做任何改写。"""
import json
import os
import re
import sys

SRC = sys.argv[1]
OUT = sys.argv[2]

CHAPTERS = [
    ("ch1", "01-introduction.md", "第1章 绪论"),
    ("ch2", "02-linear-lists.md", "第2章 线性表"),
    ("ch3", "03-stacks-queues-arrays.md", "第3章 栈、队列和数组"),
    ("ch4", "04-strings.md", "第4章 串"),
    ("ch5", "05-trees.md", "第5章 树与二叉树"),
    ("ch6", "06-graphs.md", "第6章 图"),
    ("ch7", "07-searching.md", "第7章 查找"),
    ("ch8", "08-sorting.md", "第8章 排序"),
]

EX_KINDS = ("单选", "综合", "拓展")


def read_lines(path):
    with open(path, encoding="utf-8") as f:
        return f.read().replace("\r\n", "\n").split("\n")


def parse_answers(path):
    lines = read_lines(path)
    blocks = {}
    cur = None
    buf = []
    for ln in lines:
        m = re.match(r"^###\s+(单选|综合|拓展)\s+(\S+)\s*$", ln.strip())
        if m:
            if cur:
                blocks[cur] = "\n".join(buf).strip()
            cur = m.group(1) + " " + m.group(2)
            buf = []
            continue
        if ln.startswith("### ") and cur:
            blocks[cur] = "\n".join(buf).strip()
            cur = None
            buf = []
            continue
        if ln.startswith("## ") and cur:
            blocks[cur] = "\n".join(buf).strip()
            cur = None
            buf = []
            continue
        if cur is not None:
            buf.append(ln)
    if cur:
        blocks[cur] = "\n".join(buf).strip()
    return blocks


def extract_code(text):
    return re.findall(r"```[^\n]*\n(.*?)```", text, re.S)


def parse_answer(raw, kind):
    if not raw:
        return {"answer": "", "explain": "", "code": [], "matched": False}
    lines = [l for l in raw.split("\n")]
    body = []
    for l in lines:
        st = l.strip()
        if re.match(r"^原书第.*页\s*·", st) or re.match(r"^原书第.*页$", st):
            continue
        body.append(l)
    text = "\n".join(body).strip()
    code_blocks = extract_code(text)

    if kind == "单选":
        cleaned = text.strip()
        ans = ""
        rest = cleaned
        m = re.match(r"^([A-Da-d])(?:[\s\.．、•·。:：,，]+|$)", cleaned)
        if m:
            ans = m.group(1).upper()
            rest = cleaned[m.end():].strip()
        if not ans:
            m = re.search(r"(?:答案|参考答案)\s*[:：]?\s*([A-D])", cleaned)
            if m:
                ans = m.group(1)
        return {
            "answer": ans,
            "explain": rest.strip(),
            "code": code_blocks,
            "matched": True,
        }
    if kind == "综合":
        rest = re.sub(r"^【解答】\s*", "", text)
        return {"answer": "", "explain": rest.strip(), "code": code_blocks, "matched": True}
    return {"answer": "", "explain": text, "code": code_blocks, "matched": True}


def split_options(text):
    """从题干里切出 A/B/C/D 四个选项。OCR 有错标点、顺序颠倒、大小写混用，这里放宽匹配。"""
    marks = list(re.finditer(r"(?:^|[\s\n　])([A-Da-d])[\.．、,，]\s*", text))
    if len(marks) < 4:
        return [], text

    best = None
    for i in range(len(marks)):
        seen = {}
        for j in range(i, min(i + 8, len(marks))):
            letter = marks[j].group(1).upper()
            if letter in seen:
                continue
            seen[letter] = j
            if len(seen) == 4:
                best = (i, seen)
                break
        if best:
            break
    if not best:
        return [], text

    si, seen = best
    start = marks[si].start()
    ordered = sorted(seen.items(), key=lambda kv: kv[0])
    opts = []
    for letter, mi in ordered:
        s = marks[mi].end()
        later = [m.start() for m in marks if m.start() > s]
        e = min(later) if later else len(text)
        opts.append(text[s:e].strip().replace("\n", " "))
    return opts, text[:start].strip()


def parse_chapter(path, cid, fallback_title):
    lines = read_lines(path)
    ch = {"id": cid, "title": fallback_title, "intro": [], "sections": []}
    cur_sec = None
    cur_topic = None
    ex = None

    for ln in lines:
        s = ln.rstrip()
        st = s.strip()

        if s.startswith("# ") and not s.startswith("## "):
            ch["title"] = s[2:].strip()
            continue

        if s.startswith("## "):
            title = s[3:].strip()
            cur_sec = {
                "id": "",
                "title": title,
                "intro": [],
                "topics": [],
                "exercises": [],
            }
            ch["sections"].append(cur_sec)
            cur_topic = None
            ex = None
            continue

        if s.startswith("### "):
            title = s[4:].strip()
            if re.match(r"^(单选|综合|拓展)\s", title):
                ex = {"id": title, "kind": title.split()[0], "body": []}
                if cur_topic is not None:
                    cur_topic["exercises"].append(ex)
                elif cur_sec is not None:
                    cur_sec["exercises"].append(ex)
                cur_topic = None
            else:
                cur_topic = {"id": title, "title": title, "content": [], "exercises": []}
                if cur_sec is not None:
                    cur_sec["topics"].append(cur_topic)
                else:
                    ch["intro"].append(title)
                ex = None
            continue

        if s.startswith("#### "):
            if s[5:].strip().startswith("随堂练习"):
                ex = None
            continue

        if s.startswith("##### "):
            idt = s[6:].strip()
            ex = {"id": idt, "kind": idt.split()[0], "body": []}
            if cur_topic is not None:
                cur_topic["exercises"].append(ex)
            elif cur_sec is not None:
                cur_sec["exercises"].append(ex)
            continue

        if ex is not None:
            if st.startswith("[核对本题答案]"):
                ex = None
                continue
            ex["body"].append(ln)
        elif cur_topic is not None:
            cur_topic["content"].append(ln)
        elif cur_sec is not None:
            cur_sec["intro"].append(ln)
        else:
            ch["intro"].append(ln)

    # 清掉尾部空白，避免 JSON 过长
    def trim(arr):
        while arr and not arr[-1].strip():
            arr.pop()
        while arr and not arr[0].strip():
            arr.pop(0)
        return arr

    ch["intro"] = trim(ch["intro"])
    for sec in ch["sections"]:
        sec["intro"] = trim(sec["intro"])
        for tp in sec["topics"]:
            tp["content"] = trim(tp["content"])
    return ch


def build_exercises(ch, answers):
    stats = {"single": 0, "code": 0, "essay": 0, "unmatched": 0, "no_options": 0}
    seen = set()

    def handle(ex):
        raw = [l for l in ex["body"]]
        text = "\n".join(raw).strip()
        stem_lines = []
        for l in raw:
            st = l.strip()
            if re.match(r"^原书第.*页$", st):
                continue
            if st.startswith("[核对本题答案]"):
                continue
            stem_lines.append(l)
        stem = "\n".join(stem_lines).strip()
        eid = ex["id"]
        kind = ex["kind"]
        ans = answers.get(eid)
        parsed = parse_answer(ans, kind)
        if ans is None:
            stats["unmatched"] += 1

        item = {
            "id": eid,
            "kind": kind,
            "stem": stem,
            "options": [],
            "answer": "",
            "explain": "",
            "code": [],
            "mode": "single",
        }
        if kind == "单选":
            stats["single"] += 1
            opts, head = split_options(stem)
            if opts:
                item["options"] = opts
                item["stem"] = head
            else:
                stats["no_options"] += 1
            item["answer"] = parsed["answer"]
            item["explain"] = parsed["explain"]
        else:
            if parsed["code"]:
                stats["code"] += 1
                item["mode"] = "code"
            else:
                stats["essay"] += 1
                item["mode"] = "essay"
            item["explain"] = parsed["explain"]
            item["code"] = parsed["code"]
        seen.add(eid)
        return item

    for sec in ch["sections"]:
        ex_list = []
        for e in sec.get("exercises", []):
            ex_list.append(handle(e))
        sec["exercises"] = ex_list
        for tp in sec["topics"]:
            tp["exercises"] = [handle(e) for e in tp["exercises"]]
    return stats


def main():
    books = []
    total = {"single": 0, "code": 0, "essay": 0, "unmatched": 0, "no_options": 0}
    all_answers = {}
    for cid, fname, title in CHAPTERS:
        cpath = os.path.join(SRC, "chapters", fname)
        apath = os.path.join(SRC, "answers", fname)
        answers = parse_answers(apath) if os.path.exists(apath) else {}
        for k, v in answers.items():
            all_answers[k] = v
        ch = parse_chapter(cpath, cid, title)
        st = build_exercises(ch, answers)
        for k in total:
            total[k] += st[k]
        ch["stats"] = st
        books.append(ch)
        print("%s %s  sections=%d topics=%d single=%d code=%d essay=%d unmatched=%d noopt=%d" % (
            cid, ch["title"],
            len(ch["sections"]),
            sum(len(s["topics"]) for s in ch["sections"]),
            st["single"], st["code"], st["essay"], st["unmatched"], st["no_options"]))

    payload = {
        "site": "端wood赐",
        "title": "端wood赐 · 考研站",
        "part1": {
            "id": "part1",
            "title": "第一部分 数据结构与算法",
            "chapters": books,
        },
        "parts": [
            {"id": "part1", "title": "第一部分 数据结构与算法", "ready": True},
            {"id": "part2", "title": "第二部分 计算机组成原理", "ready": False},
            {"id": "part3", "title": "第三部分 操作系统", "ready": False},
            {"id": "part4", "title": "第四部分 计算机网络", "ready": False},
            {"id": "part5", "title": "第五部分 高数（上）", "ready": False},
            {"id": "part6", "title": "第六部分 高数（下）", "ready": False},
            {"id": "part7", "title": "第七部分 线性代数", "ready": False},
            {"id": "part8", "title": "第八部分 概率论与数理统计", "ready": False},
        ],
        "totals": total,
    }

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, separators=(",", ":"))
    print("TOTAL", total)
    print("OUT bytes", os.path.getsize(OUT))


if __name__ == "__main__":
    main()
