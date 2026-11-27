  "综合 5.3-21": {
    title: "判定顺序存储的二叉树是否为二叉搜索树",
    sig: "bool judgeBST(SqBiTree bt)",
    ret: "是二叉搜索树返回 true，否则返回 false（用 1/0 输出）。",
    vars: [
      "bt.SqBiTNode：按完全二叉树的下标存放结点值，下标 0 是根，i 的左孩子是 2i+1、右孩子是 2i+2。",
      "bt.ElemNum：数组实际占用的元素个数，越界的下标视为空。",
      "-1 表示该位置没有结点。",
    ],
    io: "第一行 ElemNum，第二行 ElemNum 个整数（-1 表示空位）；输出 1 表示是 BST，0 表示不是。",
    pre: SQBIT_PRE,
    post: `int main(void) {
    SqBiTree bt;
    int n = 0, i;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAX_SIZE) n = MAX_SIZE;
    bt.ElemNum = n;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &bt.SqBiTNode[i]) != 1) return 0;
    }
    printf("%d\\n", judgeBST(bt) ? 1 : 0);
    return 0;
}`,
    std: `static bool checkInOrder(SqBiTree bt, int k, int *prev) {
    if (k >= bt.ElemNum || bt.SqBiTNode[k] == -1) return true;
    if (!checkInOrder(bt, 2 * k + 1, prev)) return false;
    if (bt.SqBiTNode[k] <= *prev) return false;
    *prev = bt.SqBiTNode[k];
    if (!checkInOrder(bt, 2 * k + 2, prev)) return false;
    return true;
}

bool judgeBST(SqBiTree bt) {
    int prev = -2147483647;
    return checkInOrder(bt, 0, &prev);
}`,
    cases: [
      { name: "合法 BST", stdin: "10\n40 25 60 -1 30 -1 80 -1 -1 27\n" },
      { name: "非法 BST", stdin: "11\n40 50 60 -1 30 -1 -1 -1 -1 -1 35\n" },
      { name: "单结点", stdin: "1\n50\n" },
      { name: "空树", stdin: "0\n" },
      { name: "右斜", stdin: "3\n10 20 30\n" },
    ],
  },

  "综合 5.4-06": {
    title: "由层次序列和各结点度数构造孩子兄弟链表",
    sig: "void CreateCSTree(CSNode **T, char e[], int degree[], int n)",
    ret: "无返回值。通过 *T 返回建好的孩子兄弟链表的根结点。",
    vars: [
      "e：树的层次遍历序列，e[0] 是根，按层次从前往后给出。",
      "degree：每个结点的度，与 e 一一对应。",
      "pointer：按层次序先建好 n 个孤立结点，再按度数把子女依次挂成 firstchild + nextsibling 链。",
      "k：按层次序推进的子女结点下标，每分配一个子女就加 1。",
    ],
    io: "第一行 n；第二行 n 个字符（层次序列）；第三行 n 个整数（各结点度数）；输出孩子兄弟表示下的先序序列（结点后跟一个空格）。",
    pre: CST_PRE,
    post: `static void preCS(CSNode *t) {
    if (t == NULL) return;
    printf("%c ", t->data);
    preCS(t->firstchild);
    preCS(t->nextsibling);
}

int main(void) {
    char e[64];
    int degree[64];
    int n = 0, i;
    CSNode *T = NULL;
    if (scanf("%d", &n) != 1) return 0;
    if (n > 64) n = 64;
    for (i = 0; i < n; ++i) {
        if (scanf(" %c", &e[i]) != 1) return 0;
    }
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &degree[i]) != 1) return 0;
    }
    CreateCSTree(&T, e, degree, n);
    preCS(T);
    printf("\\n");
    return 0;
}`,
    std: `void CreateCSTree(CSNode **T, char e[], int degree[], int n) {
    CSNode *pointer[128];
    int i, j, k = 0, d;
    for (i = 0; i < n; ++i) {
        pointer[i] = (CSNode *)malloc(sizeof(CSNode));
        pointer[i]->data = e[i];
        pointer[i]->firstchild = NULL;
        pointer[i]->nextsibling = NULL;
    }
    for (i = 0; i < n; ++i) {
        d = degree[i];
        if (d > 0) {
            ++k;
            pointer[i]->firstchild = pointer[k];
            for (j = 2; j <= d; ++j) {
                ++k;
                pointer[k - 1]->nextsibling = pointer[k];
            }
        }
    }
    *T = n > 0 ? pointer[0] : NULL;
}`,
    cases: [
      { name: "三层树", stdin: "9\nABCDEFGHI\n3 2 0 0 0 2 0 0 0\n" },
      { name: "单结点", stdin: "1\nA\n0\n" },
      { name: "链状", stdin: "3\nABC\n1 1 0\n" },
      { name: "根三子女", stdin: "4\nABCD\n3 0 0 0\n" },
    ],
  },

  "综合 5.3-18": {
    title: "中序线索二叉树中求后序前驱",
    sig: "BiThrTree PostPre(BiThrTree p)",
    ret: "返回结点 p 在后序序列中的前驱结点指针；不存在时返回 NULL。",
    vars: [
      "p：中序线索二叉树中的某个结点，ltag = 1 表示 lchild 是前驱线索，rtag = 1 表示 rchild 是后继线索。",
      "若 p 有右孩子（rtag == 0），右孩子就是它的后序前驱；只有左孩子时，左孩子是后序前驱。",
      "两孩子都没有时，顺着左线索往上找祖先，取那个祖先的左孩子。",
    ],
    io: "第一行扩展先序序列（# 为空）；第二行一个结点值；输出该结点在后序下的前驱值，没有则输出 -1。",
    pre: THR_PRE,
    post: `static BiThrTree findThr(BiThrTree t, char c) {
    BiThrTree r;
    if (t == NULL) return NULL;
    if (t->data == c) return t;
    if (t->ltag == 0) {
        r = findThr(t->lchild, c);
        if (r != NULL) return r;
    }
    if (t->rtag == 0) {
        r = findThr(t->rchild, c);
        if (r != NULL) return r;
    }
    return NULL;
}

int main(void) {
    BiThrTree T, p, q;
    char c = 0;
    T = BuildThrTree();
    CreateInThread(T);
    if (scanf(" %c", &c) != 1) return 0;
    p = findThr(T, c);
    if (p == NULL) {
        printf("-1\\n");
        return 0;
    }
    q = PostPre(p);
    printf("%c\\n", q == NULL ? '-' : q->data);
    return 0;
}`,
    std: `BiThrTree PostPre(BiThrTree p) {
    BiThrTree q;
    if (p->rtag == 0) {
        q = p->rchild;
    } else if (p->ltag == 0) {
        q = p->lchild;
    } else if (p->lchild == NULL) {
        q = NULL;
    } else {
        while (p->ltag == 1 && p->lchild != NULL) p = p->lchild;
        if (p->ltag == 0) q = p->lchild;
        else q = NULL;
    }
    return q;
}`,
    cases: [
      { name: "叶子结点", stdin: "ABD##E##C#F##\nD\n" },
      { name: "有右孩子", stdin: "ABD##E##C#F##\nB\n" },
      { name: "根结点", stdin: "ABD##E##C#F##\nA\n" },
      { name: "左叶", stdin: "AB##C##\nB\n" },
    ],
  },

  "综合 6.2-06": {
    title: "判断无向图是否存在 EL 路径",
    sig: "int IsExistEL(MGraph G)",
    ret: "存在 EL 路径返回 1，否则返回 0。判据是度为奇数的顶点个数为 0 或 2。",
    vars: [
      "G.vexnum：顶点数，编号 1..vexnum；G.arcs[i][j] 为 0 表示无边（对角线恒为 0），INF 表示不连通。",
      "degree：当前顶点 i 的度，等于与它相邻的顶点个数。",
      "count：度为奇数的顶点个数，只可能是 0 或 2 时图才存在欧拉路径。",
    ],
    io: "第一行 n m（顶点数与边数），随后 m 行 `u v w` 给出无向边；输出 1 或 0。",
    pre: MG_PRE,
    post: `int main(void) {
    MGraph G = BuildMG(0);
    printf("%d\\n", IsExistEL(G));
    return 0;
}`,
    std: `int IsExistEL(MGraph G) {
    int i, j, deg, count = 0;
    for (i = 1; i <= G.vexnum; ++i) {
        deg = 0;
        for (j = 1; j <= G.vexnum; ++j) {
            if (i != j && G.arcs[i][j] != INF) ++deg;
        }
        if (deg % 2 == 1) ++count;
    }
    return (count == 0 || count == 2) ? 1 : 0;
}`,
    cases: [
      { name: "三角形回路", stdin: "3 3\n1 2 1\n2 3 1\n3 1 1\n" },
      { name: "一条链", stdin: "3 2\n1 2 1\n2 3 1\n" },
      { name: "星形四边", stdin: "5 4\n1 2 1\n1 3 1\n1 4 1\n1 5 1\n" },
      { name: "孤立顶点", stdin: "1 0\n" },
    ],
  },

  "综合 6.3-04": {
    title: "DFS 与 BFS 判断有向图两点间是否存在路径",
    sig: "int DFSPath(ALGraph G, int i, int j) / int BFSPath(ALGraph G, int i, int j)",
    ret: "存在从 i 到 j 的路径返回 1，否则返回 0；i 与 j 相同时视为存在（长度为 0 的路径）。",
    vars: [
      "G：邻接表存储的有向图，顶点编号 1..vexnum，firstarc 是第一条出边，nextarc 指向下一条。",
      "visited：访问标记数组，两个函数各自独立，不能共用。",
      "DFS 递归往下探，BFS 用数组当队列逐层扩展，二者都只沿出边方向走。",
    ],
    io: "第一行 n m（顶点数与弧数），随后 m 行 `u v` 给出有向边 u→v；最后一行两个顶点 i j；输出 `dfs=… bfs=…`。",
    pre: AL_PRE,
    post: `int main(void) {
    ALGraph G = BuildALG(1);
    int i = 0, j = 0;
    if (scanf("%d %d", &i, &j) != 2) return 0;
    printf("dfs=%d bfs=%d\\n", DFSPath(G, i, j), BFSPath(G, i, j));
    return 0;
}`,
    std: `static int dfsReach(ALGraph *G, int u, int j, int *vis) {
    ArcNode *p;
    if (u == j) return 1;
    vis[u] = 1;
    for (p = G->vertices[u].firstarc; p != NULL; p = p->nextarc) {
        if (!vis[p->adjvex] && dfsReach(G, p->adjvex, j, vis)) return 1;
    }
    return 0;
}

int DFSPath(ALGraph G, int i, int j) {
    int vis[MAXV + 1];
    int k;
    for (k = 0; k <= G.vexnum; ++k) vis[k] = 0;
    return dfsReach(&G, i, j, vis);
}

int BFSPath(ALGraph G, int i, int j) {
    int vis[MAXV + 1], q[MAXV * 2], head = 0, tail = 0, u, k;
    ArcNode *p;
    for (k = 0; k <= G.vexnum; ++k) vis[k] = 0;
    if (i == j) return 1;
    vis[i] = 1;
    q[tail++] = i;
    while (head < tail) {
        u = q[head++];
        for (p = G.vertices[u].firstarc; p != NULL; p = p->nextarc) {
            if (p->adjvex == j) return 1;
            if (!vis[p->adjvex]) {
                vis[p->adjvex] = 1;
                q[tail++] = p->adjvex;
            }
        }
    }
    return 0;
}`,
    cases: [
      { name: "可达", stdin: "4 3\n1 2\n2 3\n3 4\n1 4\n" },
      { name: "不可达", stdin: "3 2\n1 2\n2 3\n3 1\n" },
      { name: "自身", stdin: "3 1\n1 2\n2 2\n" },
      { name: "有环可达", stdin: "3 3\n1 2\n2 3\n3 2\n1 3\n" },
    ],
  },

  "综合 6.3-05": {
    title: "输出有向图两点之间的所有简单路径",
    sig: "void FindPath(ALGraph *G, int u, int v, int path[], int d)",
    ret: "无返回值。每找到一条简单路径就打印一行，顶点之间用空格分隔。",
    vars: [
      "u：当前所在顶点；v：目标顶点；d：当前路径长度，进入函数后先自增再写入 path[d]。",
      "path：保存当前路径上的顶点序列；visited：已在本条路径上的顶点，回溯时要清 0。",
      "G 走邻接表，头插法建表会让同一层的邻接点按倒序排列，输出顺序随之如此。",
    ],
    io: "第一行 n m，随后 m 行 `u v` 有向边；最后一行起点与终点；输出所有简单路径，每条一行。",
    pre: AL_PRE,
    post: `int visited[MAXV + 1];

int main(void) {
    ALGraph G = BuildALG(1);
    int path[MAXV + 1];
    int s = 0, t = 0, i;
    if (scanf("%d %d", &s, &t) != 2) return 0;
    for (i = 0; i <= G.vexnum; ++i) visited[i] = 0;
    FindPath(&G, s, t, path, -1);
    return 0;
}`,
    std: `extern int visited[];

void FindPath(ALGraph *G, int u, int v, int path[], int d) {
    int w, i;
    ArcNode *p;
    ++d;
    path[d] = u;
    visited[u] = 1;
    if (u == v) {
        for (i = 0; i <= d; ++i) printf("%d ", path[i]);
        printf("\\n");
    }
    for (p = G->vertices[u].firstarc; p != NULL; p = p->nextarc) {
        w = p->adjvex;
        if (!visited[w]) FindPath(G, w, v, path, d);
    }
    visited[u] = 0;
}`,
    cases: [
      { name: "两条路径", stdin: "4 4\n1 2\n1 3\n2 4\n3 4\n1 4\n" },
      { name: "无路径", stdin: "3 2\n1 2\n2 3\n3 1\n" },
      { name: "直达", stdin: "2 1\n1 2\n1 2\n" },
      { name: "含环", stdin: "3 3\n1 2\n2 1\n2 3\n1 3\n" },
    ],
  },
