  "综合 6.2-05": {
    title: "邻接矩阵平方中长度为 2 的路径条数",
    sig: "int CountTwoStepPaths(MGraph G, int v, int u)",
    ret: "返回 A² 中第 v 行第 u 列的元素值，也就是从 v 到 u 恰好经过两条边的路径条数。",
    vars: [
      "G：无向图，顶点编号 1..vexnum，G.arcs[i][j] 为 0 表示无边（对角线恒为 0），INF 表示不通。",
      "(A²)[v][u] = Σ A[v][k]·A[k][u]，遍历所有中间顶点 k 就能数出长度为 2 的路径条数。",
      "若 u、v 之间有边，它不会贡献到 A²，因为 k 取 u 或 v 时对应的对角元为 0。",
    ],
    io: "第一行 n m（顶点数与边数），随后 m 行 `u v w` 给出无向边，最后一行 v u；输出长度为 2 的路径条数。",
    pre: MG_PRE,
    post: `int main(void) {
    MGraph G = BuildMG(0);
    int v = 0, u = 0;
    if (scanf("%d %d", &v, &u) != 2) return 0;
    printf("%d\\n", CountTwoStepPaths(G, v, u));
    return 0;
}`,
    std: `int CountTwoStepPaths(MGraph G, int v, int u) {
    int k, cnt = 0;
    for (k = 1; k <= G.vexnum; ++k) {
        if (G.arcs[v][k] != INF && G.arcs[k][u] != INF) ++cnt;
    }
    return cnt;
}`,
    cases: [
      { name: "教材五顶点图", stdin: "5 7\n1 2 1\n1 3 1\n1 5 1\n2 4 1\n2 5 1\n3 4 1\n4 5 1\n1 4\n" },
      { name: "相邻顶点", stdin: "5 7\n1 2 1\n1 3 1\n1 5 1\n2 4 1\n2 5 1\n3 4 1\n4 5 1\n1 2\n" },
      { name: "无二跳路径", stdin: "4 2\n1 2 1\n3 4 1\n1 4\n" },
      { name: "自身", stdin: "3 3\n1 2 1\n2 3 1\n3 1 1\n1 1\n" },
    ],
  },

  "综合 6.4-02": {
    title: "有向图强连通分量的数目",
    sig: "int CountSCC(MGraph G)",
    ret: "返回有向图强连通分量的个数。",
    vars: [
      "G：有向图，顶点编号 1..vexnum，arcs[i][j] 非 INF 表示 i→j 有弧。",
      "reach[i][j]：i 能否到达 j，用 Floyd 在可达矩阵上传递闭包。",
      "i 与 j 互相可达时它们属于同一个强连通分量，统计一次就把整组标记掉，避免重复计数。",
    ],
    io: "第一行 n m（顶点数与弧数），随后 m 行 `u v w` 给出 u→v 的弧；输出强连通分量个数。",
    pre: MG_PRE,
    post: `int main(void) {
    MGraph G = BuildMG(1);
    printf("%d\\n", CountSCC(G));
    return 0;
}`,
    std: `int CountSCC(MGraph G) {
    int reach[MAXV + 1][MAXV + 1], mark[MAXV + 1];
    int i, j, k, cnt = 0;
    for (i = 1; i <= G.vexnum; ++i) {
        mark[i] = 0;
        for (j = 1; j <= G.vexnum; ++j) {
            reach[i][j] = (i == j) || (G.arcs[i][j] != INF);
        }
    }
    for (k = 1; k <= G.vexnum; ++k) {
        for (i = 1; i <= G.vexnum; ++i) {
            for (j = 1; j <= G.vexnum; ++j) {
                if (reach[i][k] && reach[k][j]) reach[i][j] = 1;
            }
        }
    }
    for (i = 1; i <= G.vexnum; ++i) {
        if (mark[i]) continue;
        mark[i] = 1;
        ++cnt;
        for (j = i + 1; j <= G.vexnum; ++j) {
            if (reach[i][j] && reach[j][i]) mark[j] = 1;
        }
    }
    return cnt;
}`,
    cases: [
      { name: "教材七顶点图", stdin: "7 10\n1 2 3\n1 3 3\n1 4 6\n2 3 4\n2 5 5\n3 5 4\n4 6 5\n6 3 3\n5 7 3\n6 7 7\n" },
      { name: "一个环", stdin: "3 3\n1 2 1\n2 3 1\n3 1 1\n" },
      { name: "一条链", stdin: "3 2\n1 2 1\n2 3 1\n" },
      { name: "两个环", stdin: "4 4\n1 2 1\n2 1 1\n3 4 1\n4 3 1\n" },
    ],
  },
