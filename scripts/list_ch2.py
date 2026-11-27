import json
import sys

d = json.load(open(sys.argv[1], encoding="utf-8"))
for ch in d["part1"]["chapters"]:
    if ch["id"] != "ch2":
        continue
    for sec in ch["sections"]:
        items = list(sec.get("exercises", []))
        for tp in sec["topics"]:
            items += list(tp.get("exercises", []))
        for ex in items:
            if ex["kind"] == "综合":
                codes = ex.get("code") or []
                print("%-14s code_blocks=%d | %s" % (ex["id"], len(codes), ex["stem"][:70].replace("\n", " ")))
