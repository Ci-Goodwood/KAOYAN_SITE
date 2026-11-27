# 端wood赐 · 考研站

Vue 3 + Node.js（Express）的考研学习站，部署在 `code.goodwood-ci.asia`（一台跑 Termux 的旧手机）。
第一部分「数据结构与算法」已上线，第二到第八部分留了骨架。

## 站点结构

```
web/                 Vue 3 源码
  src/App.vue        导航与 hash 路由
  src/views/         首页 / 学习板块 / 课程页 / 关于
  src/components/    代码块、单选、算法题、块渲染
  src/lib/           接口请求、C 语法高亮、文本块整理
  public/images/     logo、横幅、主视觉
server/
  app.js             Express 入口：静态托管 + 数据接口 + 判题接口
  judge.js           编译、运行、限流与判定
  problems.js        判题题库（标准解、输入输出骨架、测例）
  data/books.json    由原书 Markdown 解析出的全部内容
scripts/
  build_data.py      原文 + 答案 → books.json
```

## 内容与规则

原文按原书章节原样呈现，一字未改。习题本来就在原文里按知识点分段给出，所以直接沿用「知识点讲完→随堂练习」的顺序，没有把题目挪到章末。

- 8 章、48 节、513 道单选、113 道带代码的综合题、71 道无代码问答题。
- 单选点选项即判对错并展开解析。
- 综合题都能「查看标准答案」。
- 算法题只提交函数本体，后端把题目自带的输入输出骨架拼在你函数前后，再用标准解现场跑出期望输出逐组比对。

## 判题接口

```
POST /api/judge
Content-Type: application/json

{ "problemId": "综合 2.2-02", "code": "void Reverse(SqList *L) { ... }" }
```

返回：

```json
{
  "stage": "run",
  "ok": false,
  "passed": 2,
  "total": 4,
  "results": [
    { "name": "样例", "status": "OK", "expected": "5\n5 4 3 2 1", "actual": "5\n5 4 3 2 1", "pass": true }
  ]
}
```

`status` 取值：`OK`（已运行，但输出与标准答案不同才会 pass=false）、`TLE`（超时）、`RE`（运行错误）、`OLE`（输出过多）、`SKIP`（前面的用例已超时或崩溃，未运行）。

编译错误时返回 `{"stage":"compile","ok":false,"log":"..."}`。

## 资源限制

运行在手机上，必须防超时与内存爆炸：

- 编译：`prlimit --cpu=15 --as=2G --nproc=512 --nofile=512 --fsize=64M`，20 秒墙钟兜底。
- 运行：`prlimit --cpu=2 --as=512M --nproc=256 --nofile=64 --fsize=16M`，5 秒墙钟兜底。
- 进程用 `detached` 起在独立进程组里，超时对整组发 SIGKILL，避免子进程变孤儿拖着管道。

`prlimit` 的 `--nproc` 按同一 UID 统计全部进程，设太小会导致编译器自己 fork 失败，因此编译侧留到 512。

## 本地开发

```bash
npm install
npm run dev        # 前端开发服务器
npm run build      # 产物到 dist/
npm start          # 起后端，默认 127.0.0.1:8080
```

判题依赖本机有 C 编译器。Linux 上默认 `clang`，可用 `CC` 环境变量换；非 Linux 会跳过 `prlimit`，适合本地粗测。

## 部署到 Termux

1. `npm run build`。
2. 打一个只带运行所需文件的包：

```bash
# 在一个空目录里
npm install --omit=dev --registry=https://registry.npmmirror.com
tar -czf kaoyan-site.tar.gz dist server package.json node_modules
```

3. `scp` 到手机，`tar -xzf kaoyan-site.tar.gz -C ~/kaoyan-site`。
4. 起服务：

```bash
cd ~/kaoyan-site
setsid node server/app.js </dev/null > server.log 2>&1 &
```

5. 隧道指向 `http://127.0.0.1:8080`（本项目用的是 `cloudflared` 隧道 `oj`，域名 `code.goodwood-ci.asia`）。

重启前先按工作目录精确定位进程，不要 `pkill -f node`，同一台手机上还跑着别的服务：

```bash
for p in $(pgrep node); do echo $p $(readlink /proc/$p/cwd); done
```

## 当前进度

- 判题只配了 6 道（第 2 章顺序表 2.2-02 / 03 / 04 / 06，链表 2.3-05 / 02），其余 107 道综合题可以看标准答案、可以自己写，但还没有自动判题。
- 原书答案里的代码是扫描件 OCR 文本，语法破损不能直接编译，标准解是按题意重写的。
- 31 道选择题的选项在 OCR 里切分不干净，已尽量修补，仍有 3 道切不出选项（页面上直接显示解析，不显示选项）。

## 数据来源

第一部分内容整理自《数据结构与算法》原书（`Ci-Goodwood/DSA-KAOYAN` 仓库的 Markdown 版本），视觉风格与 `gczyws.xyz` 保持一致。
