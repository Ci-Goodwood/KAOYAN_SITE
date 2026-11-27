import json
import sys

d = json.load(open(sys.argv[1], encoding="utf-8"))
n = 0
for ch in d["part1"]["chapters"]:
    if ch["id"] != "ch2":
        continue
    for sec in ch["sections"]:
        items = list(sec.get("exercises", []))
        for tp in sec["topics"]:
            items += list(tp.get("exercises", []))
        for ex in items:
            if ex["kind"] == "综合" and n < 3:
                n += 1
                print("ID:", ex["id"], "| ans_len:", len(ex.get("answer", "")))
                print("STEM:", ex["stem"][:300].replace("\n", " / "))
                print("ANS:", ex["answer"][:300].replace("\n", " / "))
                print("=" * 40)
