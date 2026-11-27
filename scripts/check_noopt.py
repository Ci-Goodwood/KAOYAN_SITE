# -*- coding: utf-8 -*-
import json
import sys

data = json.load(open(sys.argv[1], encoding="utf-8"))
n = 0
for ch in data["part1"]["chapters"]:
    for sec in ch["sections"]:
        for ex in sec.get("exercises", []):
            if ex["kind"] == "单选" and not ex["options"]:
                n += 1
                print("[%s] %s" % (ch["id"], ex["id"]))
                print(repr(ex["stem"][:180]))
                print("-" * 40)
        for tp in sec["topics"]:
            for ex in tp.get("exercises", []):
                if ex["kind"] == "单选" and not ex["options"]:
                    n += 1
                    print("[%s] %s" % (ch["id"], ex["id"]))
                    print(repr(ex["stem"][:180]))
                    print("-" * 40)
print("no_options:", n)
