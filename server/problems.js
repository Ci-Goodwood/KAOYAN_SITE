// 判题题库：student 只写函数本体，pre + 函数 + post 拼成完整程序。
// std 为标准解，用来现场生成期望输出，所以期望值永远等于标准答案跑出来的结果。

const SQLIST_PRE = `#include <stdio.h>
#include <stdlib.h>
#define MAXSIZE 1000
typedef int ElemType;
typedef struct {
    ElemType data[MAXSIZE];
    int length;
} SqList;
`;

const LIST_PRE = `#include <stdio.h>
#include <stdlib.h>
typedef int ElemType;
typedef struct LNode {
    ElemType data;
    struct LNode *next;
} LNode, *LinkList;
`;

const TREE_PRE = `#include <stdio.h>
#include <stdlib.h>
typedef struct BiTNode {
    char data;
    struct BiTNode *lchild, *rchild;
} BiTNode, *BiTree;

BiTree BuildTree(void) {
    char c;
    if (scanf(" %c", &c) != 1) return NULL;
    if (c == '#') return NULL;
    BiTNode *p = (BiTNode *)malloc(sizeof(BiTNode));
    p->data = c;
    p->lchild = BuildTree();
    p->rchild = BuildTree();
    return p;
}

void PrintPre(BiTree T) {
    if (T == NULL) return;
    printf("%c", T->data);
    PrintPre(T->lchild);
    PrintPre(T->rchild);
}
`;

const STR_PRE = `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
`;

const MG_PRE = `#include <stdio.h>
#define MAXV 100
#define INF 999999

typedef struct {
    int arcs[MAXV + 1][MAXV + 1];
    int vexnum, arcnum;
} MGraph;

MGraph BuildMG(int directed) {
    MGraph G;
    int n = 0, m = 0, i, j, u, v, w;
    G.vexnum = 0;
    G.arcnum = 0;
    if (scanf("%d %d", &n, &m) != 2) return G;
    G.vexnum = n;
    G.arcnum = m;
    for (i = 1; i <= n; ++i) {
        for (j = 1; j <= n; ++j) G.arcs[i][j] = (i == j) ? 0 : INF;
    }
    for (i = 0; i < m; ++i) {
        if (scanf("%d %d %d", &u, &v, &w) != 3) break;
        G.arcs[u][v] = w;
        if (directed == 0) G.arcs[v][u] = w;
    }
    return G;
}
`;

const AL_PRE = `#include <stdio.h>
#include <stdlib.h>
#define MAXV 100

typedef struct ArcNode {
    int adjvex;
    struct ArcNode *nextarc;
} ArcNode;

typedef struct VNode {
    int data;
    ArcNode *firstarc;
} VNode, AdjList[MAXV + 1];

typedef struct {
    AdjList vertices;
    int vexnum, arcnum;
} ALGraph;

void AddArc(ALGraph *G, int u, int v) {
    ArcNode *p = (ArcNode *)malloc(sizeof(ArcNode));
    p->adjvex = v;
    p->nextarc = G->vertices[u].firstarc;
    G->vertices[u].firstarc = p;
}

ALGraph BuildALG(int directed) {
    ALGraph G;
    int n = 0, m = 0, i, u, v;
    G.vexnum = 0;
    G.arcnum = 0;
    if (scanf("%d %d", &n, &m) != 2) return G;
    G.vexnum = n;
    G.arcnum = m;
    for (i = 1; i <= n; ++i) {
        G.vertices[i].data = i;
        G.vertices[i].firstarc = NULL;
    }
    for (i = 0; i < m; ++i) {
        if (scanf("%d %d", &u, &v) != 2) break;
        AddArc(&G, u, v);
        if (directed == 0) AddArc(&G, v, u);
    }
    return G;
}
`;

const ARR_PRE = `#include <stdio.h>
#include <stdlib.h>
#define MAXN 1000
typedef int ElemType;
`;

const BST_PRE = `#include <stdio.h>
#include <stdlib.h>
typedef struct BSTNode {
    int key;
    struct BSTNode *lchild, *rchild;
} BSTNode, *BSTree;

BSTree BSTInsert(BSTree T, int k) {
    if (T == NULL) {
        T = (BSTNode *)malloc(sizeof(BSTNode));
        T->key = k;
        T->lchild = NULL;
        T->rchild = NULL;
        return T;
    }
    if (k < T->key) T->lchild = BSTInsert(T->lchild, k);
    else if (k > T->key) T->rchild = BSTInsert(T->rchild, k);
    return T;
}

BSTree BuildBST(int n) {
    BSTree T = NULL;
    int i, k;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &k) != 1) return T;
        T = BSTInsert(T, k);
    }
    return T;
}
`;

function printSqList(tailCount) {
  return `    printf("%d\\n", L.length);
    for (i = 0; i < L.length; ++i) printf("%d ", L.data[i]);
    printf("\\n");
    return 0;
}`;
}

export const PROBLEMS = {
  "综合 2.2-02": {
    title: "顺序表就地逆置",
    sig: "void Reverse(SqList *L)",
    ret: "无返回值。函数必须直接改写 L->data[0..L->length-1]，逆置完成后的表就是函数返回的结果。",
    vars: [
      "SqList：顺序表结构体，data[MAXSIZE] 存元素，length 为当前表长，MAXSIZE 为 1000。",
      "L：指向顺序表的指针，L->length 读取表长，L->data[i] 读写第 i 个元素。",
    ],
    io: "第一行 n（表长），第二行 n 个整数；输出第一行为表长，第二行为逆置后的元素序列。",
    pre: SQLIST_PRE,
    post: `int main(void) {
    SqList L;
    int n = 0, i;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAXSIZE) n = MAXSIZE;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &L.data[i]) != 1) return 0;
    }
    L.length = n;
    Reverse(&L);
${printSqList()}`,
    std: `void Reverse(SqList *L) {
    int i, j;
    ElemType t;
    for (i = 0, j = L->length - 1; i < j; ++i, --j) {
        t = L->data[i];
        L->data[i] = L->data[j];
        L->data[j] = t;
    }
}`,
    cases: [
      { name: "样例", stdin: "5\n1 2 3 4 5\n" },
      { name: "单元素", stdin: "1\n7\n" },
      { name: "含负数", stdin: "6\n-1 0 3 -8 12 5\n" },
      { name: "空表", stdin: "0\n" },
    ],
  },

  "综合 2.2-03": {
    title: "顺序表删除所有值为 x 的元素",
    sig: "void DelX(SqList *L, ElemType x)",
    ret: "无返回值。函数把不等于 x 的元素依次搬到表前段，并更新 L->length。",
    vars: [
      "x：要删除的元素值，类型 ElemType（这里就是 int）。",
      "L->length：函数结束时必须改成删除后的实际表长，否则输出会不对。",
    ],
    io: "第一行 n，第二行 n 个整数，第三行 x；输出第一行新表长，第二行剩余元素。",
    pre: SQLIST_PRE,
    post: `int main(void) {
    SqList L;
    int n = 0, i;
    int x = 0;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAXSIZE) n = MAXSIZE;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &L.data[i]) != 1) return 0;
    }
    L.length = n;
    if (scanf("%d", &x) != 1) return 0;
    DelX(&L, x);
${printSqList()}`,
    std: `void DelX(SqList *L, ElemType x) {
    int k = 0, i;
    for (i = 0; i < L->length; ++i) {
        if (L->data[i] != x) {
            L->data[k] = L->data[i];
            ++k;
        }
    }
    L->length = k;
}`,
    cases: [
      { name: "中间散布", stdin: "6\n1 2 3 2 4 2\n2\n" },
      { name: "无匹配", stdin: "3\n1 2 3\n9\n" },
      { name: "全删", stdin: "3\n2 2 2\n2\n" },
      { name: "空表", stdin: "0\n5\n" },
    ],
  },

  "综合 2.2-04": {
    title: "有序顺序表删除区间 [s, t]",
    sig: "int DelRange(SqList *L, ElemType s, ElemType t)",
    ret: "返回 1 表示参数合法且处理完成（区间内可能删了若干元素，也可能一个都没删到）；返回 0 表示 s 与 t 不合理或表为空，此时表保持原样。",
    vars: [
      "s、t：删除区间的下界和上界（包含两端），要求 s < t。",
      "L：有序（递增）顺序表，删除后仍要保持有序。",
    ],
    io: "第一行 n，第二行 n 个递增整数，第三行 s 与 t；输出第一行返回值，第二行新表长，第三行剩余元素。",
    pre: SQLIST_PRE,
    post: `int main(void) {
    SqList L;
    int n = 0, i, r;
    int s = 0, t = 0;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAXSIZE) n = MAXSIZE;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &L.data[i]) != 1) return 0;
    }
    L.length = n;
    if (scanf("%d %d", &s, &t) != 2) return 0;
    r = DelRange(&L, s, t);
    printf("%d\\n", r);
${printSqList()}`,
    std: `int DelRange(SqList *L, ElemType s, ElemType t) {
    int i, j, k;
    if (L->length == 0 || s >= t) return 0;
    for (i = 0; i < L->length && L->data[i] < s; ++i) { }
    if (i >= L->length) return 1;
    for (j = i; j < L->length && L->data[j] <= t; ++j) { }
    for (k = j; k < L->length; ++k) {
        L->data[i] = L->data[k];
        ++i;
    }
    L->length = i;
    return 1;
}`,
    cases: [
      { name: "区间在中间", stdin: "6\n-2 0 1 3 5 8\n1 4\n" },
      { name: "s 等于 t", stdin: "5\n1 2 3 4 5\n2 2\n" },
      { name: "整表清空", stdin: "4\n1 2 3 4\n0 10\n" },
      { name: "区间无命中", stdin: "4\n1 2 3 4\n10 20\n" },
    ],
  },

  "综合 2.2-06": {
    title: "有序顺序表去重",
    sig: "void Unique(SqList *L)",
    ret: "无返回值。函数要保留每个数值的一个副本，并更新 L->length 为去重后的表长。",
    vars: [
      "L：递增有序顺序表，重复元素一定相邻，可用双指针直接覆盖。",
    ],
    io: "第一行 n，第二行 n 个递增整数；输出第一行新表长，第二行去重后的元素。",
    pre: SQLIST_PRE,
    post: `int main(void) {
    SqList L;
    int n = 0, i;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAXSIZE) n = MAXSIZE;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &L.data[i]) != 1) return 0;
    }
    L.length = n;
    Unique(&L);
${printSqList()}`,
    std: `void Unique(SqList *L) {
    int i, k;
    if (L->length == 0) return;
    k = 0;
    for (i = 1; i < L->length; ++i) {
        if (L->data[i] != L->data[k]) {
            ++k;
            L->data[k] = L->data[i];
        }
    }
    L->length = k + 1;
}`,
    cases: [
      { name: "多组重复", stdin: "7\n1 1 2 2 2 3 5\n" },
      { name: "全是同一个值", stdin: "4\n6 6 6 6\n" },
      { name: "单元素", stdin: "1\n9\n" },
    ],
  },

  "综合 2.3-05": {
    title: "带头结点单链表就地逆置",
    sig: "void ReverseList(LinkList L)",
    ret: "无返回值。函数结束时头结点 L 的 next 应指向逆置后的首结点，不得新建结点，辅助空间 O(1)。",
    vars: [
      "LinkList：指向结点的指针类型，L 是带头结点的链表头（L 本身不存数据，数据从 L->next 开始）。",
      "LNode：结点结构体，data 存 int 数据，next 指向下一个结点。",
    ],
    io: "第一行 n，第二行 n 个整数；输出第一行结点个数，第二行逆置后的序列。",
    pre: LIST_PRE,
    post: `int main(void) {
    int n = 0, i, v, cnt = 0;
    LinkList L;
    LNode *tail, *t;
    if (scanf("%d", &n) != 1) return 0;
    L = (LinkList)malloc(sizeof(LNode));
    L->data = 0;
    L->next = NULL;
    tail = L;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
    ReverseList(L);
    for (t = L->next; t; t = t->next) ++cnt;
    printf("%d\\n", cnt);
    for (t = L->next; t; t = t->next) printf("%d ", t->data);
    printf("\\n");
    return 0;
}`,
    std: `void ReverseList(LinkList L) {
    LNode *p, *q;
    p = L->next;
    L->next = NULL;
    while (p) {
        q = p->next;
        p->next = L->next;
        L->next = p;
        p = q;
    }
}`,
    cases: [
      { name: "样例", stdin: "5\n1 2 3 4 5\n" },
      { name: "单结点", stdin: "1\n42\n" },
      { name: "空表", stdin: "0\n" },
    ],
  },

  "综合 2.3-02": {
    title: "带头结点单链表删除所有值为 x 的结点",
    sig: "void DelXList(LinkList L, ElemType x)",
    ret: "无返回值。函数要摘链并 free 掉值为 x 的结点，头结点必须保留。",
    vars: [
      "x：待删除的值，类型 ElemType（int）。",
      "L：带头结点的单链表，删除后 L->next 指向新的首结点。",
    ],
    io: "第一行 n，第二行 n 个整数，第三行 x；输出第一行剩余结点数，第二行剩余序列。",
    pre: LIST_PRE,
    post: `int main(void) {
    int n = 0, i, v, cnt = 0;
    int x = 0;
    LinkList L;
    LNode *tail, *t;
    if (scanf("%d", &n) != 1) return 0;
    L = (LinkList)malloc(sizeof(LNode));
    L->data = 0;
    L->next = NULL;
    tail = L;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
    if (scanf("%d", &x) != 1) return 0;
    DelXList(L, x);
    for (t = L->next; t; t = t->next) ++cnt;
    printf("%d\\n", cnt);
    for (t = L->next; t; t = t->next) printf("%d ", t->data);
    printf("\\n");
    return 0;
}`,
    std: `void DelXList(LinkList L, ElemType x) {
    LNode *p, *pre, *q;
    pre = L;
    p = L->next;
    while (p) {
        if (p->data == x) {
            q = p;
            pre->next = p->next;
            p = p->next;
            free(q);
        } else {
            pre = p;
            p = p->next;
        }
    }
}`,
    cases: [
      { name: "样例", stdin: "6\n1 2 3 2 5 2\n2\n" },
      { name: "全删", stdin: "4\n7 7 7 7\n7\n" },
      { name: "无匹配", stdin: "3\n1 2 3\n9\n" },
      { name: "空表", stdin: "0\n1\n" },
    ],
  },
  "综合 2.2-01": {
    title: "删除顺序表中最小值",
    sig: "int DelMin(SqList *L)",
    ret: "返回被删掉的最小值；若表为空返回 -1。删完后空出的位置由表尾元素填补，L->length 要减 1。",
    vars: [
      "L->data：元素数组，L->length 当前表长。",
      "返回值：最小值本身，不是下标。",
    ],
    io: "第一行 n，第二行 n 个整数；输出三行：返回值、新表长、剩余元素。",
    pre: SQLIST_PRE,
    post: `int main(void) {
    SqList L;
    int n = 0, i, r;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAXSIZE) n = MAXSIZE;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &L.data[i]) != 1) return 0;
    }
    L.length = n;
    r = DelMin(&L);
    printf("%d\\n", r);
    printf("%d\\n", L.length);
    for (i = 0; i < L.length; ++i) printf("%d ", L.data[i]);
    printf("\\n");
    return 0;
}`,
    std: `int DelMin(SqList *L) {
    int i, k = 0;
    ElemType e;
    if (L->length == 0) return -1;
    for (i = 1; i < L->length; ++i) {
        if (L->data[i] < L->data[k]) k = i;
    }
    e = L->data[k];
    L->data[k] = L->data[L->length - 1];
    L->length = L->length - 1;
    return e;
}`,
    cases: [
      { name: "样例", stdin: "6\n5 3 9 1 7 2\n" },
      { name: "单元素", stdin: "1\n4\n" },
      { name: "空表", stdin: "0\n" },
    ],
  },

  "综合 2.2-05": {
    title: "无序顺序表删除区间 [s, t]",
    sig: "int DelST(SqList *L, ElemType s, ElemType t)",
    ret: "返回 1 表示参数合法且处理完成；返回 0 表示 s 与 t 不合理或表为空，此时表保持原样。",
    vars: [
      "s、t：删除区间端点，要求 s < t，两端都删。",
      "L：元素无序，删除后不要求重新排序，但要保持原有相对次序。",
    ],
    io: "第一行 n，第二行 n 个整数，第三行 s 与 t；输出三行：返回值、新表长、剩余元素。",
    pre: SQLIST_PRE,
    post: `int main(void) {
    SqList L;
    int n = 0, i, r;
    int s = 0, t = 0;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAXSIZE) n = MAXSIZE;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &L.data[i]) != 1) return 0;
    }
    L.length = n;
    if (scanf("%d %d", &s, &t) != 2) return 0;
    r = DelST(&L, s, t);
    printf("%d\\n", r);
    printf("%d\\n", L.length);
    for (i = 0; i < L.length; ++i) printf("%d ", L.data[i]);
    printf("\\n");
    return 0;
}`,
    std: `int DelST(SqList *L, ElemType s, ElemType t) {
    int i, k = 0;
    if (s >= t || L->length == 0) return 0;
    for (i = 0; i < L->length; ++i) {
        if (L->data[i] < s || L->data[i] > t) {
            L->data[k] = L->data[i];
            ++k;
        }
    }
    L->length = k;
    return 1;
}`,
    cases: [
      { name: "区间命中若干", stdin: "6\n5 2 9 1 7 3\n2 5\n" },
      { name: "s 不小于 t", stdin: "4\n1 2 3 4\n5 2\n" },
      { name: "清空整表", stdin: "3\n3 4 5\n2 6\n" },
      { name: "空表", stdin: "0\n1 2\n" },
    ],
  },

  "综合 2.2-07": {
    title: "合并两个有序顺序表",
    sig: "void MergeList(SqList *A, SqList *B, SqList *C)",
    ret: "无返回值。合并结果写进 C，C 的 length 由函数负责设置成合并后的长度。",
    vars: [
      "A、B：两个递增有序表，函数内不得改动它们的元素。",
      "C：结果表，调用前 length 已置 0，data 空间足够，直接写 C->data 并设置 C->length。",
    ],
    io: "第一行 n1，第二行 n1 个递增整数；第三行 n2，第四行 n2 个递增整数；输出 C 的表长与全部元素。",
    pre: SQLIST_PRE,
    post: `int main(void) {
    SqList A, B, C;
    int n = 0, i;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAXSIZE) n = MAXSIZE;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &A.data[i]) != 1) return 0;
    }
    A.length = n;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAXSIZE) n = MAXSIZE;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &B.data[i]) != 1) return 0;
    }
    B.length = n;
    C.length = 0;
    MergeList(&A, &B, &C);
    printf("%d\\n", C.length);
    for (i = 0; i < C.length; ++i) printf("%d ", C.data[i]);
    printf("\\n");
    return 0;
}`,
    std: `void MergeList(SqList *A, SqList *B, SqList *C) {
    int i = 0, j = 0, k = 0;
    while (i < A->length && j < B->length) {
        if (A->data[i] <= B->data[j]) {
            C->data[k] = A->data[i];
            ++i;
        } else {
            C->data[k] = B->data[j];
            ++j;
        }
        ++k;
    }
    while (i < A->length) {
        C->data[k] = A->data[i];
        ++i;
        ++k;
    }
    while (j < B->length) {
        C->data[k] = B->data[j];
        ++j;
        ++k;
    }
    C->length = k;
}`,
    cases: [
      { name: "等长交错", stdin: "3\n1 3 5\n3\n2 4 6\n" },
      { name: "B 为空", stdin: "3\n1 2 3\n0\n" },
      { name: "A 为空", stdin: "0\n1\n7\n" },
      { name: "含重复", stdin: "3\n1 1 3\n2\n1 2\n" },
    ],
  },

  "综合 2.3-09": {
    title: "查找单链表倒数第 k 个结点",
    sig: "int FindK(LinkList L, int k)",
    ret: "返回倒数第 k 个结点的 data 值；k 不合法或长度不足时返回 -1。",
    vars: [
      "L：带头结点的单链表，数据从 L->next 开始。",
      "k：以 1 为起点的倒数序号。",
    ],
    io: "第一行 n，第二行 n 个整数，第三行 k；输出一行为查到的值或 -1。",
    pre: LIST_PRE,
    post: `int main(void) {
    int n = 0, i, v, k = 0, r;
    LinkList L;
    LNode *tail, *t;
    if (scanf("%d", &n) != 1) return 0;
    L = (LinkList)malloc(sizeof(LNode));
    L->data = 0;
    L->next = NULL;
    tail = L;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
    if (scanf("%d", &k) != 1) return 0;
    r = FindK(L, k);
    printf("%d\\n", r);
    return 0;
}`,
    std: `int FindK(LinkList L, int k) {
    LNode *p, *q;
    int i;
    if (k <= 0) return -1;
    p = L->next;
    q = L->next;
    for (i = 0; i < k; ++i) {
        if (p == NULL) return -1;
        p = p->next;
    }
    while (p != NULL) {
        p = p->next;
        q = q->next;
    }
    return q ? q->data : -1;
}`,
    cases: [
      { name: "倒数第 2", stdin: "5\n10 20 30 40 50\n2\n" },
      { name: "倒数第 n", stdin: "5\n10 20 30 40 50\n5\n" },
      { name: "k 超长", stdin: "5\n10 20 30 40 50\n6\n" },
      { name: "空表", stdin: "0\n1\n" },
    ],
  },

  "综合 5.3-08": {
    title: "统计二叉树中双分支结点个数",
    sig: "int CountTwo(BiTree T)",
    ret: "返回左右孩子都不为空的结点个数；空树返回 0。",
    vars: [
      "BiTree：二叉链表，结点含 data（字符）、lchild、rchild。",
      "T：根指针，可以为 NULL。",
    ],
    io: "输入一行扩展先序序列，# 表示空结点；输出一行为双分支结点个数。",
    pre: TREE_PRE,
    post: `int main(void) {
    BiTree T = BuildTree();
    printf("%d\\n", CountTwo(T));
    return 0;
}`,
    std: `int CountTwo(BiTree T) {
    if (T == NULL) return 0;
    return ((T->lchild && T->rchild) ? 1 : 0) + CountTwo(T->lchild) + CountTwo(T->rchild);
}`,
    cases: [
      { name: "样例", stdin: "ABD##E##CF###\n" },
      { name: "单链", stdin: "A#B#C##\n" },
      { name: "单结点", stdin: "A##\n" },
      { name: "空树", stdin: "#\n" },
    ],
  },

  "综合 5.3-09": {
    title: "交换二叉树所有结点的左右子树",
    sig: "void SwapTree(BiTree T)",
    ret: "无返回值。直接改树结构，交完后整棵树的先序序列会发生变化。",
    vars: [
      "BiTree：二叉链表，结点含 data、lchild、rchild。",
      "T：根指针，可能为 NULL，需先判空。",
    ],
    io: "输入一行扩展先序序列，# 表示空结点；输出一行为交换后的先序序列（不含 #）。",
    pre: TREE_PRE,
    post: `int main(void) {
    BiTree T = BuildTree();
    SwapTree(T);
    PrintPre(T);
    printf("\\n");
    return 0;
}`,
    std: `void SwapTree(BiTree T) {
    BiTNode *t;
    if (T == NULL) return;
    t = T->lchild;
    T->lchild = T->rchild;
    T->rchild = t;
    SwapTree(T->lchild);
    SwapTree(T->rchild);
}`,
    cases: [
      { name: "样例", stdin: "ABD##E##CF###\n" },
      { name: "单结点", stdin: "A##\n" },
      { name: "空树", stdin: "#\n" },
    ],
  },

  "综合 5.3-10": {
    title: "求先序序列中第 k 个结点的值",
    sig: "char Kth(BiTree T, int k)",
    ret: "返回先序遍历第 k 个结点的 data；k 越界（超过结点数）或树空时返回 #。",
    vars: [
      "k：从 1 开始计数。",
      "可以另写辅助函数和全局计数变量，只要 Kth 的签名不变。",
    ],
    io: "输入扩展先序序列（# 表示空结点）和一个整数 k，用空格隔开；输出一行为该结点的字符或 #。",
    pre: TREE_PRE,
    post: `int main(void) {
    BiTree T = BuildTree();
    int k = 0;
    if (scanf("%d", &k) != 1) return 0;
    printf("%c\\n", Kth(T, k));
    return 0;
}`,
    std: `int cnt = 0;
char ans = '#';
int done = 0;

void walk(BiTree T, int k) {
    if (T == NULL || done) return;
    cnt = cnt + 1;
    if (cnt == k) {
        ans = T->data;
        done = 1;
        return;
    }
    walk(T->lchild, k);
    walk(T->rchild, k);
}

char Kth(BiTree T, int k) {
    cnt = 0;
    ans = '#';
    done = 0;
    if (k <= 0) return '#';
    walk(T, k);
    return ans;
}`,
    cases: [
      { name: "第 5 个", stdin: "ABD##E##CF### 5\n" },
      { name: "第 6 个", stdin: "ABD##E##CF### 6\n" },
      { name: "越界", stdin: "ABD##E##CF### 7\n" },
      { name: "空树", stdin: "# 1\n" },
    ],
  },

  "综合 5.3-05": {
    title: "非递归求二叉树的高度",
    sig: "int Height(BiTree T)",
    ret: "返回树的高度（根所在层为第 1 层）；空树返回 0。",
    vars: [
      "BiTree：二叉链表。",
      "题目要求非递归，请用层序遍历（自己开一个结点指针数组当队列）完成。",
    ],
    io: "输入一行扩展先序序列，# 表示空结点；输出一行为树高。",
    pre: TREE_PRE,
    post: `int main(void) {
    BiTree T = BuildTree();
    printf("%d\\n", Height(T));
    return 0;
}`,
    std: `int Height(BiTree T) {
    BiTNode *q[1000];
    int front = 0, rear = 0, last = 0, h = 0;
    if (T == NULL) return 0;
    q[rear] = T;
    rear = rear + 1;
    while (front < rear) {
        BiTNode *p = q[front];
        front = front + 1;
        if (p->lchild) { q[rear] = p->lchild; rear = rear + 1; }
        if (p->rchild) { q[rear] = p->rchild; rear = rear + 1; }
        if (front - 1 == last) {
            h = h + 1;
            last = rear - 1;
        }
    }
    return h;
}`,
    cases: [
      { name: "样例", stdin: "ABD##E##CF###\n" },
      { name: "单链", stdin: "A#B#C##\n" },
      { name: "单结点", stdin: "A##\n" },
      { name: "空树", stdin: "#\n" },
    ],
  },

  "综合 5.3-14": {
    title: "求二叉树的宽度",
    sig: "int Width(BiTree T)",
    ret: "返回结点数最多的那一层的结点个数；空树返回 0。",
    vars: [
      "BiTree：二叉链表。",
      "宽度按层计，不是按子树计。",
    ],
    io: "输入一行扩展先序序列，# 表示空结点；输出一行为宽度。",
    pre: TREE_PRE,
    post: `int main(void) {
    BiTree T = BuildTree();
    printf("%d\\n", Width(T));
    return 0;
}`,
    std: `int Width(BiTree T) {
    BiTNode *q[1000];
    int front = 0, rear = 0, last = 0, start = 0, maxw = 0, cur;
    if (T == NULL) return 0;
    q[rear] = T;
    rear = rear + 1;
    while (front < rear) {
        BiTNode *p = q[front];
        front = front + 1;
        if (p->lchild) { q[rear] = p->lchild; rear = rear + 1; }
        if (p->rchild) { q[rear] = p->rchild; rear = rear + 1; }
        if (front - 1 == last) {
            cur = front - start;
            if (cur > maxw) maxw = cur;
            start = front;
            last = rear - 1;
        }
    }
    return maxw;
}`,
    cases: [
      { name: "样例", stdin: "ABD##E##CF###\n" },
      { name: "单链", stdin: "A#B#C##\n" },
      { name: "空树", stdin: "#\n" },
    ],
  },

  "综合 5.3-07": {
    title: "判别给定二叉树是否是完全二叉树",
    sig: "int IsComplete(BiTree T)",
    ret: "是完全二叉树返回 1，否则返回 0；空树返回 1。",
    vars: [
      "BiTree：二叉链表。",
      "建议按层序入队时把空孩子也一起入队，遇到第一个空结点后若后面还有非空结点就判定为否。",
    ],
    io: "输入一行扩展先序序列，# 表示空结点；输出一行为 1 或 0。",
    pre: TREE_PRE,
    post: `int main(void) {
    BiTree T = BuildTree();
    printf("%d\\n", IsComplete(T));
    return 0;
}`,
    std: `int IsComplete(BiTree T) {
    BiTNode *q[1000];
    int front = 0, rear = 0, seen = 0;
    if (T == NULL) return 1;
    q[rear] = T;
    rear = rear + 1;
    while (front < rear) {
        BiTNode *p = q[front];
        front = front + 1;
        if (p == NULL) {
            seen = 1;
            continue;
        }
        if (seen) return 0;
        q[rear] = p->lchild;
        rear = rear + 1;
        q[rear] = p->rchild;
        rear = rear + 1;
    }
    return 1;
}`,
    cases: [
      { name: "完全", stdin: "ABD##E##CF###\n" },
      { name: "右偏缺口", stdin: "AB#E##C##\n" },
      { name: "单结点", stdin: "A##\n" },
      { name: "空树", stdin: "#\n" },
    ],
  },

  "综合 3.3-01": {
    title: "判断表达式中的括号是否配对",
    sig: "int Match(char *s)",
    ret: "配对返回 1，不配对返回 0（左括号多余、右括号多余、类型不匹配都算不配对）。",
    vars: [
      "s：以 \\0 结尾的字符串，只含圆括号、方括号、花括号，可能混有其它字符。",
      "括号有三种类型，必须同类型才能配对，形如 ([)] 属于不配对。",
    ],
    io: "输入一行不含空格的表达式；输出一行为 1 或 0。",
    pre: STR_PRE,
    post: `int main(void) {
    char s[512];
    if (scanf("%511s", s) != 1) return 0;
    printf("%d\\n", Match(s));
    return 0;
}`,
    std: `int Match(char *s) {
    char st[512];
    int top = 0, i;
    char c;
    for (i = 0; s[i] != '\\0'; ++i) {
        if (s[i] == '(' || s[i] == '[' || s[i] == '{') {
            st[top] = s[i];
            top = top + 1;
        } else if (s[i] == ')' || s[i] == ']' || s[i] == '}') {
            if (top == 0) return 0;
            top = top - 1;
            c = st[top];
            if (s[i] == ')' && c != '(') return 0;
            if (s[i] == ']' && c != '[') return 0;
            if (s[i] == '}' && c != '{') return 0;
        }
    }
    return top == 0;
}`,
    cases: [
      { name: "嵌套", stdin: "{[()]}\n" },
      { name: "顺序", stdin: "[()]{}\n" },
      { name: "类型交叉", stdin: "([)]\n" },
      { name: "右括号多余", stdin: "(())]\n" },
      { name: "左括号多余", stdin: "(([])\n" },
    ],
  },

  "综合 3.1-03": {
    title: "判断入栈出栈操作序列是否合法",
    sig: "int Legal(char *s)",
    ret: "合法返回 1，非法返回 0。",
    vars: [
      "s：仅由 I（入栈）和 O（出栈）组成的字符串。",
      "栈初始为空、终态为空；任何前缀里 O 的个数不能超过 I 的个数。",
    ],
    io: "输入一行只含 I 和 O 的序列；输出一行为 1 或 0。",
    pre: STR_PRE,
    post: `int main(void) {
    char s[512];
    if (scanf("%511s", s) != 1) return 0;
    printf("%d\\n", Legal(s));
    return 0;
}`,
    std: `int Legal(char *s) {
    int i, net = 0;
    for (i = 0; s[i] != '\\0'; ++i) {
        if (s[i] == 'I') {
            net = net + 1;
        } else if (s[i] == 'O') {
            net = net - 1;
            if (net < 0) return 0;
        }
    }
    return net == 0;
}`,
    cases: [
      { name: "IOIO", stdin: "IOIO\n" },
      { name: "IIOO", stdin: "IIOO\n" },
      { name: "前缀欠账", stdin: "OIIO\n" },
      { name: "数量不等", stdin: "IIO\n" },
      { name: "空串", stdin: "X\n" },
    ],
  },

  "综合 4.2-01": {
    title: "求模式串的 next 数组",
    sig: "void GetNext(char *p, int next[])",
    ret: "无返回值。把 next[1..m] 填好即可，其中 m 为模式串长度。",
    vars: [
      "p：字符数组，下标从 1 开始存模式串（p[1] 是第一个字符），p[0] 是占位符，不用管。",
      "next 数组同样从 1 开始使用，约定 next[1] = 0。",
    ],
    io: "输入一行模式串；输出一行为 next[1..m]，用空格分隔。",
    pre: STR_PRE,
    post: `int main(void) {
    char raw[256], p[258];
    int next[258];
    int i, m;
    if (scanf("%255s", raw) != 1) return 0;
    m = (int)strlen(raw);
    p[0] = '#';
    for (i = 1; i <= m; ++i) p[i] = raw[i - 1];
    p[m + 1] = '\\0';
    GetNext(p, next);
    for (i = 1; i <= m; ++i) printf("%d ", next[i]);
    printf("\\n");
    return 0;
}`,
    std: `void GetNext(char *p, int next[]) {
    int i = 1, j = 0;
    next[1] = 0;
    while (p[i] != '\\0') {
        if (j == 0 || p[i] == p[j]) {
            i = i + 1;
            j = j + 1;
            next[i] = j;
        } else {
            j = next[j];
        }
    }
}`,
    cases: [
      { name: "abaabcac", stdin: "abaabcac\n" },
      { name: "aaaab", stdin: "aaaab\n" },
      { name: "abc", stdin: "abc\n" },
      { name: "单字符", stdin: "a\n" },
    ],
  },

  "综合 8.3-02": {
    title: "双向冒泡排序",
    sig: "void BiBubble(ElemType a[], int n)",
    ret: "无返回值。数组下标从 1 到 n，函数结束后 a[1..n] 必须升序。",
    vars: [
      "a：待排数组，a[0] 不用。",
      "n：元素个数。",
      "要求正反两向交替扫描：先一趟把最大值送到末尾，再一趟把最小值送到开头。",
    ],
    io: "第一行 n，第二行 n 个整数；输出一行为升序后的序列。",
    pre: ARR_PRE,
    post: `int main(void) {
    ElemType a[MAXN + 2];
    int n = 0, i;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAXN) n = MAXN;
    for (i = 1; i <= n; ++i) {
        if (scanf("%d", &a[i]) != 1) return 0;
    }
    BiBubble(a, n);
    for (i = 1; i <= n; ++i) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
    std: `void BiBubble(ElemType a[], int n) {
    int low = 1, high = n, i, t, swapped;
    while (low < high) {
        swapped = 0;
        for (i = low; i < high; ++i) {
            if (a[i] > a[i + 1]) {
                t = a[i];
                a[i] = a[i + 1];
                a[i + 1] = t;
                swapped = 1;
            }
        }
        high = high - 1;
        for (i = high; i > low; --i) {
            if (a[i - 1] > a[i]) {
                t = a[i];
                a[i] = a[i - 1];
                a[i - 1] = t;
                swapped = 1;
            }
        }
        low = low + 1;
        if (!swapped) break;
    }
}`,
    cases: [
      { name: "乱序", stdin: "8\n49 38 65 97 76 13 27 49\n" },
      { name: "已有序", stdin: "5\n1 2 3 4 5\n" },
      { name: "逆序", stdin: "4\n9 7 5 1\n" },
      { name: "单元素", stdin: "1\n8\n" },
    ],
  },

  "综合 8.3-03": {
    title: "奇数移到偶数前面",
    sig: "void OddEven(ElemType a[], int n)",
    ret: "无返回值。只要求奇数都在偶数之前，不要求内部有序，但要求时间 O(n)、辅助空间 O(1)。",
    vars: [
      "a：数组下标从 1 到 n。",
      "判断奇偶用 a[i] % 2，负数取模在老编译器下可能为负，测例只给正整数。",
    ],
    io: "第一行 n，第二行 n 个整数；输出一行为处理后的序列。",
    pre: ARR_PRE,
    post: `int main(void) {
    ElemType a[MAXN + 2];
    int n = 0, i;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAXN) n = MAXN;
    for (i = 1; i <= n; ++i) {
        if (scanf("%d", &a[i]) != 1) return 0;
    }
    OddEven(a, n);
    for (i = 1; i <= n; ++i) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
    std: `void OddEven(ElemType a[], int n) {
    int low = 1, high = n, t;
    while (low < high) {
        while (low < high && a[low] % 2 == 1) low = low + 1;
        while (low < high && a[high] % 2 == 0) high = high - 1;
        if (low < high) {
            t = a[low];
            a[low] = a[high];
            a[high] = t;
            low = low + 1;
            high = high - 1;
        }
    }
}`,
    cases: [
      { name: "混合", stdin: "8\n1 2 3 4 5 6 7 8\n" },
      { name: "全偶", stdin: "4\n2 4 6 8\n" },
      { name: "全奇", stdin: "4\n1 3 5 7\n" },
      { name: "偶在前", stdin: "6\n2 4 6 1 3 5\n" },
    ],
  },

  "综合 8.3-06": {
    title: "荷兰国旗问题",
    sig: "void Flag(ElemType a[], int n)",
    ret: "无返回值。0 表示红、1 表示白、2 表示蓝，函数结束后数组必须按 0、1、2 排好。",
    vars: [
      "a：数组下标从 1 到 n，元素只会是 0、1、2。",
      "要求时间 O(n)、辅助空间 O(1)，一趟扫描完成。",
    ],
    io: "第一行 n，第二行 n 个取值 0/1/2 的整数；输出一行为排好的序列。",
    pre: ARR_PRE,
    post: `int main(void) {
    ElemType a[MAXN + 2];
    int n = 0, i;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAXN) n = MAXN;
    for (i = 1; i <= n; ++i) {
        if (scanf("%d", &a[i]) != 1) return 0;
    }
    Flag(a, n);
    for (i = 1; i <= n; ++i) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
    std: `void Flag(ElemType a[], int n) {
    int i = 1, low = 1, high = n, t;
    while (i <= high) {
        if (a[i] == 0) {
            t = a[low];
            a[low] = a[i];
            a[i] = t;
            low = low + 1;
            i = i + 1;
        } else if (a[i] == 2) {
            t = a[high];
            a[high] = a[i];
            a[i] = t;
            high = high - 1;
        } else {
            i = i + 1;
        }
    }
}`,
    cases: [
      { name: "混合", stdin: "9\n2 1 0 2 1 0 1 2 0\n" },
      { name: "全白", stdin: "5\n1 1 1 1 1\n" },
      { name: "全蓝", stdin: "3\n2 2 2\n" },
      { name: "首尾颠倒", stdin: "4\n2 0 2 0\n" },
    ],
  },

  "综合 8.3-05": {
    title: "找出数组中第 k 小的元素",
    sig: "int KthSmall(ElemType a[], int n, int k)",
    ret: "返回第 k 小的元素值（k 从 1 开始）。",
    vars: [
      "a：数组下标从 1 到 n，元素互不相同。",
      "要求平均时间 O(n)，用快速选择（划分后只递归一半）。",
    ],
    io: "第一行 n，第二行 n 个整数，第三行 k；输出一行为第 k 小的值。",
    pre: ARR_PRE,
    post: `int main(void) {
    ElemType a[MAXN + 2];
    int n = 0, k = 0, i;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAXN) n = MAXN;
    for (i = 1; i <= n; ++i) {
        if (scanf("%d", &a[i]) != 1) return 0;
    }
    if (scanf("%d", &k) != 1) return 0;
    printf("%d\\n", KthSmall(a, n, k));
    return 0;
}`,
    std: `int Part(ElemType a[], int low, int high) {
    ElemType p = a[low];
    while (low < high) {
        while (low < high && a[high] >= p) high = high - 1;
        a[low] = a[high];
        while (low < high && a[low] <= p) low = low + 1;
        a[high] = a[low];
    }
    a[low] = p;
    return low;
}

int KthSmall(ElemType a[], int n, int k) {
    int low = 1, high = n, p;
    while (low <= high) {
        p = Part(a, low, high);
        if (p == k) return a[p];
        if (p < k) low = p + 1;
        else high = p - 1;
    }
    return -1;
}`,
    cases: [
      { name: "第 3 小", stdin: "8\n49 38 65 97 13 27 76 12\n3\n" },
      { name: "第 1 小", stdin: "8\n49 38 65 97 13 27 76 12\n1\n" },
      { name: "第 n 小", stdin: "8\n49 38 65 97 13 27 76 12\n8\n" },
      { name: "单元素", stdin: "1\n5\n1\n" },
    ],
  },

  "综合 8.4-05": {
    title: "判断序列是否构成小根堆",
    sig: "int IsMinHeap(ElemType a[], int n)",
    ret: "是小根堆返回 1，否则返回 0；n 为 0 或 1 时返回 1。",
    vars: [
      "a：数组下标从 1 到 n，按完全二叉树的顺序存储。",
      "小根堆条件：对每个 i（1 ≤ i ≤ n/2），a[i] 不大于它的左右孩子。",
    ],
    io: "第一行 n，第二行 n 个整数；输出一行为 1 或 0。",
    pre: ARR_PRE,
    post: `int main(void) {
    ElemType a[MAXN + 2];
    int n = 0, i;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAXN) n = MAXN;
    for (i = 1; i <= n; ++i) {
        if (scanf("%d", &a[i]) != 1) return 0;
    }
    printf("%d\\n", IsMinHeap(a, n));
    return 0;
}`,
    std: `int IsMinHeap(ElemType a[], int n) {
    int i;
    for (i = 1; i <= n / 2; ++i) {
        if (2 * i <= n && a[i] > a[2 * i]) return 0;
        if (2 * i + 1 <= n && a[i] > a[2 * i + 1]) return 0;
    }
    return 1;
}`,
    cases: [
      { name: "是小根堆", stdin: "8\n9 17 65 23 45 78 87 30\n" },
      { name: "不是", stdin: "8\n9 23 17 45 65 78 87 30\n" },
      { name: "单元素", stdin: "1\n7\n" },
      { name: "两层违规", stdin: "4\n1 2 3 0\n" },
    ],
  },

  "综合 8.6-02": {
    title: "把前后两个有序段合并成一个有序表",
    sig: "void MergeTwo(ElemType a[], int m, int n)",
    ret: "无返回值。数组 a[1..m+n] 前 m 个元素有序、后 n 个元素有序，函数结束后整体升序。",
    vars: [
      "m：前半段长度；n：后半段长度。",
      "原地处理，辅助空间 O(1)。从后往前取前段的元素、遇到比它小的就逐个右移一位，这种插入式做法最稳；注意不要用从两端向中间填的高位归并，那样会把后段还没输出的元素盖掉。",
    ],
    io: "第一行 m n，第二行 m+n 个整数；输出一行为合并后的序列。",
    pre: ARR_PRE,
    post: `int main(void) {
    ElemType a[MAXN + 2];
    int m = 0, n = 0, i, tot;
    if (scanf("%d %d", &m, &n) != 2) return 0;
    tot = m + n;
    if (tot > MAXN) return 0;
    for (i = 1; i <= tot; ++i) {
        if (scanf("%d", &a[i]) != 1) return 0;
    }
    MergeTwo(a, m, n);
    for (i = 1; i <= tot; ++i) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
    std: `void MergeTwo(ElemType a[], int m, int n) {
    int i, j, t;
    for (i = m; i >= 1; --i) {
        j = i;
        while (j < m + n && a[j] > a[j + 1]) {
            t = a[j];
            a[j] = a[j + 1];
            a[j + 1] = t;
            j = j + 1;
        }
    }
}`,
    cases: [
      { name: "交错", stdin: "4 4\n1 5 9 13 2 6 10 14\n" },
      { name: "前半全大", stdin: "3 3\n7 8 9 1 2 3\n" },
      { name: "后半全大", stdin: "3 3\n1 2 3 7 8 9\n" },
      { name: "后半为空", stdin: "3 0\n1 2 3\n" },
    ],
  },

  "综合 7.3-06": {
    title: "判断二叉树是否是二叉排序树",
    sig: "int IsBST(BSTree T)",
    ret: "是二叉排序树返回 1，否则返回 0；空树返回 1。",
    vars: [
      "BSTree：二叉链表，结点含 key（int）、lchild、rchild。",
      "判据是整棵树的中序序列严格递增，不要只比较父子两结点。",
    ],
    io: "第一行 n，第二行 n 个整数（按插入顺序）；输出一行为 1 或 0。",
    pre: BST_PRE,
    post: `int main(void) {
    int n = 0;
    BSTree T;
    if (scanf("%d", &n) != 1) return 0;
    T = BuildBST(n);
    printf("%d\\n", IsBST(T));
    return 0;
}`,
    std: `int prev = 0;
int has = 0;
int bad = 0;

void inorder(BSTree T) {
    if (T == NULL || bad) return;
    inorder(T->lchild);
    if (has && T->key <= prev) bad = 1;
    prev = T->key;
    has = 1;
    inorder(T->rchild);
}

int IsBST(BSTree T) {
    prev = 0;
    has = 0;
    bad = 0;
    inorder(T);
    return bad ? 0 : 1;
}`,
    cases: [
      { name: "标准 BST", stdin: "6\n50 38 70 30 45 80\n" },
      { name: "单结点", stdin: "1\n9\n" },
      { name: "同值忽略", stdin: "5\n10 5 15 5 20\n" },
    ],
  },

  "综合 7.3-09": {
    title: "求二叉排序树中最小和最大的关键字",
    sig: "void MinMax(BSTree T, int *mn, int *mx)",
    ret: "无返回值。把最小值写入 *mn，最大值写入 *mx；T 保证非空。",
    vars: [
      "BSTree：二叉链表，结点含 key。",
      "最小值在最左端，最大值在最右端，不要用中序遍历全树。",
    ],
    io: "第一行 n，第二行 n 个整数（按插入顺序）；输出一行为两个整数：最小值 最大值。",
    pre: BST_PRE,
    post: `int main(void) {
    int n = 0, mn = 0, mx = 0;
    BSTree T;
    if (scanf("%d", &n) != 1) return 0;
    T = BuildBST(n);
    MinMax(T, &mn, &mx);
    printf("%d %d\\n", mn, mx);
    return 0;
}`,
    std: `void MinMax(BSTree T, int *mn, int *mx) {
    BSTree p = T;
    while (p->lchild) p = p->lchild;
    *mn = p->key;
    p = T;
    while (p->rchild) p = p->rchild;
    *mx = p->key;
}`,
    cases: [
      { name: "样例", stdin: "6\n50 38 70 30 45 80\n" },
      { name: "左偏", stdin: "5\n50 40 30 20 10\n" },
      { name: "单结点", stdin: "1\n7\n" },
    ],
  },

  "综合 6.2-04": {
    title: "邻接表转邻接矩阵",
    sig: "void ALtoM(ALGraph G, int M[][MAXV + 1])",
    ret: "无返回值。把有向图的邻接表信息写进矩阵 M[1..n][1..n]，有边写 1，无边写 0。",
    vars: [
      "G：邻接表，G.vexnum 顶点数，G.vertices[i].firstarc 指向第 i 个顶点的边链表。",
      "M：矩阵下标 0 行/列不用，行列都用 1..G.vexnum。",
      "顶点编号从 1 开始。",
    ],
    io: "第一行 n m，随后 m 行每行 u v 表示一条有向边 u→v；输出 n 行，每行 n 个 0/1。",
    pre: AL_PRE,
    post: `int main(void) {
    ALGraph G = BuildALG(1);
    int M[MAXV + 1][MAXV + 1];
    int i, j;
    ALtoM(G, M);
    for (i = 1; i <= G.vexnum; ++i) {
        for (j = 1; j <= G.vexnum; ++j) printf("%d ", M[i][j]);
        printf("\\n");
    }
    return 0;
}`,
    std: `void ALtoM(ALGraph G, int M[][MAXV + 1]) {
    int i, j;
    ArcNode *p;
    for (i = 1; i <= G.vexnum; ++i) {
        for (j = 1; j <= G.vexnum; ++j) M[i][j] = 0;
    }
    for (i = 1; i <= G.vexnum; ++i) {
        p = G.vertices[i].firstarc;
        while (p != NULL) {
            M[i][p->adjvex] = 1;
            p = p->nextarc;
        }
    }
}`,
    cases: [
      { name: "四顶点", stdin: "4 5\n1 2\n1 3\n2 3\n3 4\n4 1\n" },
      { name: "无孤立点", stdin: "3 3\n1 2\n2 3\n1 3\n" },
      { name: "无孤立点二", stdin: "3 2\n1 2\n2 1\n" },
    ],
  },

  "综合 6.3-03": {
    title: "深度优先搜索的非递归算法",
    sig: "void DFS(ALGraph G, int v0)",
    ret: "无返回值。从 v0 出发按邻接表链的顺序输出访问序列，顶点之间用空格分隔，末尾也留一个空格。",
    vars: [
      "G：邻接表，遍历时按 firstarc 链的先后顺序取邻接点。",
      "v0：起点编号（从 1 开始）。",
      "要求非递归：自己开一个栈数组，不能用递归调用自己。",
    ],
    io: "第一行 n m，随后 m 行 u v 表示一条无向边；最后一行一个整数 v0；输出一行为访问序列。",
    pre: AL_PRE,
    post: `int main(void) {
    ALGraph G = BuildALG(0);
    int v0 = 0;
    if (scanf("%d", &v0) != 1) return 0;
    DFS(G, v0);
    printf("\\n");
    return 0;
}`,
    std: `void DFS(ALGraph G, int v0) {
    int st[MAXV + 1];
    int visited[MAXV + 1];
    int top = 0, i, v;
    ArcNode *p;
    for (i = 1; i <= G.vexnum; ++i) visited[i] = 0;
    printf("%d ", v0);
    visited[v0] = 1;
    st[top] = v0;
    top = top + 1;
    while (top > 0) {
        v = st[top - 1];
        p = G.vertices[v].firstarc;
        while (p != NULL && visited[p->adjvex]) p = p->nextarc;
        if (p != NULL) {
            visited[p->adjvex] = 1;
            printf("%d ", p->adjvex);
            st[top] = p->adjvex;
            top = top + 1;
        } else {
            top = top - 1;
        }
    }
}`,
    cases: [
      { name: "五顶点", stdin: "5 5\n1 2\n1 3\n2 4\n3 4\n4 5\n1\n" },
      { name: "链状", stdin: "4 3\n1 2\n2 3\n3 4\n2\n" },
      { name: "单顶点", stdin: "1 0\n1\n" },
    ],
  },

  "综合 6.3-02": {
    title: "判断无向图是否为一棵树",
    sig: "int IsTree(ALGraph G)",
    ret: "是一棵树返回 1，否则返回 0。空图（0 个顶点）按树处理返回 1。",
    vars: [
      "G：无向图邻接表，顶点编号 1..n。",
      "判据：边数等于 n-1 且连通（从任一顶点出发能到达全部顶点），两者缺一不可。边数对但存在环一定不连通。",
    ],
    io: "第一行 n m，随后 m 行 u v 表示一条无向边；输出一行为 1 或 0。",
    pre: AL_PRE,
    post: `int main(void) {
    ALGraph G = BuildALG(0);
    printf("%d\\n", IsTree(G));
    return 0;
}`,
    std: `int IsTree(ALGraph G) {
    int st[MAXV + 1];
    int visited[MAXV + 1];
    int top = 0, cnt = 0, i, v;
    ArcNode *p;
    if (G.vexnum == 0) return 1;
    if (G.arcnum != G.vexnum - 1) return 0;
    for (i = 1; i <= G.vexnum; ++i) visited[i] = 0;
    visited[1] = 1;
    cnt = 1;
    st[top] = 1;
    top = top + 1;
    while (top > 0) {
        v = st[top - 1];
        top = top - 1;
        p = G.vertices[v].firstarc;
        while (p != NULL) {
            if (!visited[p->adjvex]) {
                visited[p->adjvex] = 1;
                cnt = cnt + 1;
                st[top] = p->adjvex;
                top = top + 1;
            }
            p = p->nextarc;
        }
    }
    return cnt == G.vexnum ? 1 : 0;
}`,
    cases: [
      { name: "是树", stdin: "5 4\n1 2\n1 3\n3 4\n3 5\n" },
      { name: "有环", stdin: "4 4\n1 2\n2 3\n3 4\n4 1\n" },
      { name: "边够但不连通", stdin: "5 4\n1 2\n2 3\n1 3\n4 5\n" },
      { name: "单顶点", stdin: "1 0\n" },
    ],
  },

  "综合 6.4-03": {
    title: "Dijkstra 求单源最短路径长度",
    sig: "void ShortestPath(MGraph G, int v0, int dist[])",
    ret: "无返回值。把 v0 到各顶点的最短距离写进 dist[1..n]，自己到自己是 0，不可达保持 INF。",
    vars: [
      "MGraph：邻接矩阵，G.arcs[i][j] 为权值，无边的位置是 INF，i==j 处为 0。",
      "INF 在骨架里定义成 999999，判题输出时会把不小于 INF 的值显示成 -1。",
      "顶点编号 1..n。",
    ],
    io: "第一行 n m，随后 m 行 u v w 表示有向边 u→v 权 w；最后一行为源点 v0；输出一行为 dist[1..n]。",
    pre: MG_PRE,
    post: `int main(void) {
    MGraph G = BuildMG(1);
    int dist[MAXV + 1];
    int v0 = 0, i;
    if (scanf("%d", &v0) != 1) return 0;
    for (i = 1; i <= G.vexnum; ++i) dist[i] = INF;
    ShortestPath(G, v0, dist);
    for (i = 1; i <= G.vexnum; ++i) {
        if (dist[i] >= INF) printf("-1 ");
        else printf("%d ", dist[i]);
    }
    printf("\\n");
    return 0;
}`,
    std: `void ShortestPath(MGraph G, int v0, int dist[]) {
    int S[MAXV + 1];
    int i, j, k, minv, n = G.vexnum;
    for (i = 1; i <= n; ++i) {
        S[i] = 0;
        dist[i] = G.arcs[v0][i];
    }
    S[v0] = 1;
    dist[v0] = 0;
    for (i = 1; i < n; ++i) {
        minv = INF;
        k = 0;
        for (j = 1; j <= n; ++j) {
            if (!S[j] && dist[j] < minv) {
                minv = dist[j];
                k = j;
            }
        }
        if (k == 0) break;
        S[k] = 1;
        for (j = 1; j <= n; ++j) {
            if (!S[j] && G.arcs[k][j] < INF && dist[k] + G.arcs[k][j] < dist[j]) {
                dist[j] = dist[k] + G.arcs[k][j];
            }
        }
    }
}`,
    cases: [
      { name: "五顶点", stdin: "5 7\n1 2 10\n1 4 30\n1 5 100\n2 3 50\n3 5 10\n4 3 20\n4 5 60\n1\n" },
      { name: "起点 2", stdin: "5 7\n1 2 10\n1 4 30\n1 5 100\n2 3 50\n3 5 10\n4 3 20\n4 5 60\n2\n" },
      { name: "不可达", stdin: "3 1\n1 2 5\n1\n" },
      { name: "单顶点", stdin: "1 0\n1\n" },
    ],
  },

  "综合 2.2-08": {
    title: "把数组中前后两个线性表互换位置",
    sig: "void SwapParts(ElemType a[], int m, int n)",
    ret: "无返回值。a[1..m] 是第一个表，a[m+1..m+n] 是第二个表，处理后两段整体交换，内部顺序不变。",
    vars: [
      "a：一维数组，下标 1 开始，长度 m+n。",
      "m、n：两段各自的长度。",
      "要求空间 O(1)，用三次逆置最省。",
    ],
    io: "第一行 m n，第二行 m+n 个整数；输出一行为交换后的序列。",
    pre: ARR_PRE,
    post: `int main(void) {
    ElemType a[MAXN + 2];
    int m = 0, n = 0, i, tot;
    if (scanf("%d %d", &m, &n) != 2) return 0;
    tot = m + n;
    for (i = 1; i <= tot; ++i) {
        if (scanf("%d", &a[i]) != 1) return 0;
    }
    SwapParts(a, m, n);
    for (i = 1; i <= tot; ++i) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
    std: `void rev(ElemType a[], int l, int r) {
    int t;
    while (l < r) {
        t = a[l];
        a[l] = a[r];
        a[r] = t;
        l = l + 1;
        r = r - 1;
    }
}

void SwapParts(ElemType a[], int m, int n) {
    rev(a, 1, m);
    rev(a, m + 1, m + n);
    rev(a, 1, m + n);
}`,
    cases: [
      { name: "等长", stdin: "3 3\n1 2 3 4 5 6\n" },
      { name: "前长后短", stdin: "4 2\n1 2 3 4 5 6\n" },
      { name: "后段为空", stdin: "3 0\n7 8 9\n" },
      { name: "单元素", stdin: "1 1\n1 2\n" },
    ],
  },

  "综合 2.2-10": {
    title: "数组循环左移 p 个位置",
    sig: "void LeftShift(ElemType a[], int n, int p)",
    ret: "无返回值。a[1..n] 循环左移 p 位，例如 1 2 3 4 5 左移 2 位得到 3 4 5 1 2。",
    vars: [
      "n：元素个数；p：左移位数，0 ≤ p < n。",
      "要求时间 O(n)、空间 O(1)，用三次逆置。",
    ],
    io: "第一行 n p，第二行 n 个整数；输出一行为左移后的序列。",
    pre: ARR_PRE,
    post: `int main(void) {
    ElemType a[MAXN + 2];
    int n = 0, p = 0, i;
    if (scanf("%d %d", &n, &p) != 2) return 0;
    for (i = 1; i <= n; ++i) {
        if (scanf("%d", &a[i]) != 1) return 0;
    }
    LeftShift(a, n, p);
    for (i = 1; i <= n; ++i) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
    std: `void rev(ElemType a[], int l, int r) {
    int t;
    while (l < r) {
        t = a[l];
        a[l] = a[r];
        a[r] = t;
        l = l + 1;
        r = r - 1;
    }
}

void LeftShift(ElemType a[], int n, int p) {
    if (p <= 0 || p >= n) return;
    rev(a, 1, p);
    rev(a, p + 1, n);
    rev(a, 1, n);
}`,
    cases: [
      { name: "左移 2", stdin: "5 2\n1 2 3 4 5\n" },
      { name: "左移 n-1", stdin: "5 4\n1 2 3 4 5\n" },
      { name: "不移动", stdin: "5 0\n1 2 3 4 5\n" },
      { name: "单元素", stdin: "1 0\n9\n" },
    ],
  },

  "综合 2.2-11": {
    title: "求两个等长升序序列的中位数",
    sig: "int Median(ElemType A[], ElemType B[], int L)",
    ret: "返回把两个序列合并后第 L 个数的值（即下中位数）。",
    vars: [
      "A、B：长度都为 L 的升序数组，下标 1..L。",
      "要求时间 O(log n)、空间 O(1)，用折半比较的做法。",
    ],
    io: "第一行 L，第二行 L 个数（A），第三行 L 个数（B）；输出一行为中位数。",
    pre: ARR_PRE,
    post: `int main(void) {
    ElemType A[MAXN + 2], B[MAXN + 2];
    int L = 0, i;
    if (scanf("%d", &L) != 1) return 0;
    for (i = 1; i <= L; ++i) {
        if (scanf("%d", &A[i]) != 1) return 0;
    }
    for (i = 1; i <= L; ++i) {
        if (scanf("%d", &B[i]) != 1) return 0;
    }
    printf("%d\\n", Median(A, B, L));
    return 0;
}`,
    std: `int Median(ElemType A[], ElemType B[], int L) {
    ElemType *a = A + 1, *b = B + 1;
    int s1 = 0, d1 = L - 1, m1, s2 = 0, d2 = L - 1, m2;
    while (s1 != d1 || s2 != d2) {
        m1 = (s1 + d1) / 2;
        m2 = (s2 + d2) / 2;
        if (a[m1] == b[m2]) return a[m1];
        if (a[m1] < b[m2]) {
            if ((s1 + d1) % 2 == 0) {
                s1 = m1;
                d2 = m2;
            } else {
                s1 = m1 + 1;
                d2 = m2;
            }
        } else {
            if ((s1 + d1) % 2 == 0) {
                d1 = m1;
                s2 = m2;
            } else {
                d1 = m1;
                s2 = m2 + 1;
            }
        }
    }
    return a[s1] < b[s2] ? a[s1] : b[s2];
}`,
    cases: [
      { name: "样例", stdin: "5\n11 13 15 17 19\n2 4 6 8 20\n" },
      { name: "相同中位数", stdin: "3\n1 5 9\n5 6 7\n" },
      { name: "B 全大", stdin: "3\n1 2 3\n10 11 12\n" },
      { name: "单元素", stdin: "1\n4\n7\n" },
    ],
  },

  "综合 2.2-12": {
    title: "求序列的主元素",
    sig: "int Majority(ElemType a[], int n)",
    ret: "存在主元素返回该元素，不存在返回 -1。主元素指出现次数超过 n/2 的元素。",
    vars: [
      "a：下标 1..n。",
      "要求时间 O(n)、空间 O(1)，用摩尔投票的思路。",
    ],
    io: "第一行 n，第二行 n 个整数；输出一行为主元素或 -1。",
    pre: ARR_PRE,
    post: `int main(void) {
    ElemType a[MAXN + 2];
    int n = 0, i;
    if (scanf("%d", &n) != 1) return 0;
    for (i = 1; i <= n; ++i) {
        if (scanf("%d", &a[i]) != 1) return 0;
    }
    printf("%d\\n", Majority(a, n));
    return 0;
}`,
    std: `int Majority(ElemType a[], int n) {
    int i, cand = a[1], cnt = 1, num = 0;
    for (i = 2; i <= n; ++i) {
        if (a[i] == cand) cnt = cnt + 1;
        else {
            if (cnt > 0) cnt = cnt - 1;
            else {
                cand = a[i];
                cnt = 1;
            }
        }
    }
    if (cnt > 0) {
        for (i = 1; i <= n; ++i) if (a[i] == cand) num = num + 1;
    }
    return (num > n / 2) ? cand : -1;
}`,
    cases: [
      { name: "有主元素", stdin: "8\n3 3 4 3 3 5 3 3\n" },
      { name: "无主元素", stdin: "6\n1 2 3 1 2 3\n" },
      { name: "刚好过半", stdin: "7\n2 2 2 2 1 1 3\n" },
      { name: "单元素", stdin: "1\n6\n" },
    ],
  },

  "综合 2.2-13": {
    title: "找出数组中未出现的最小正整数",
    sig: "int FirstMissing(ElemType a[], int n)",
    ret: "返回 1..n+1 中第一个没有出现在数组里的正整数。",
    vars: [
      "a：下标 1..n，元素是任意整数。",
      "要求时间 O(n)，用 n 个辅助标记位即可。",
    ],
    io: "第一行 n，第二行 n 个整数；输出一行为答案。",
    pre: ARR_PRE,
    post: `int main(void) {
    ElemType a[MAXN + 2];
    int n = 0, i;
    if (scanf("%d", &n) != 1) return 0;
    for (i = 1; i <= n; ++i) {
        if (scanf("%d", &a[i]) != 1) return 0;
    }
    printf("%d\\n", FirstMissing(a, n));
    return 0;
}`,
    std: `int FirstMissing(ElemType a[], int n) {
    int tag[MAXN + 2];
    int i;
    for (i = 0; i <= n + 1; ++i) tag[i] = 0;
    for (i = 1; i <= n; ++i) {
        if (a[i] >= 1 && a[i] <= n) tag[a[i]] = 1;
    }
    for (i = 1; i <= n; ++i) if (tag[i] == 0) return i;
    return n + 1;
}`,
    cases: [
      { name: "样例", stdin: "5\n-5 3 2 3 4\n" },
      { name: "1 到 n 都有", stdin: "5\n1 2 3 4 5\n" },
      { name: "全负数", stdin: "4\n-1 -2 -3 -4\n" },
      { name: "有 0 和重复", stdin: "4\n0 1 1 2\n" },
    ],
  },

  "综合 2.3-12": {
    title: "删除递增单链表中的重复元素",
    sig: "void DelDup(LinkList L)",
    ret: "无返回值。L 带头结点且元素递增有序，处理后每个值只保留一个结点。",
    vars: [
      "L：带头结点的单链表，元素递增，重复元素相邻。",
      "删结点时要释放空间。",
    ],
    io: "第一行 n，第二行 n 个递增整数；输出两行：新表长、剩余元素。",
    pre: LIST_PRE,
    post: `int main(void) {
    int n = 0, i, v, cnt = 0;
    LinkList L;
    LNode *tail, *t, *p;
    if (scanf("%d", &n) != 1) return 0;
    L = (LinkList)malloc(sizeof(LNode));
    L->data = 0;
    L->next = NULL;
    tail = L;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
    DelDup(L);
    p = L->next;
    while (p) { cnt = cnt + 1; p = p->next; }
    printf("%d\\n", cnt);
    p = L->next;
    while (p) { printf("%d ", p->data); p = p->next; }
    printf("\\n");
    return 0;
}`,
    std: `void DelDup(LinkList L) {
    LNode *p = L->next, *q;
    if (p == NULL) return;
    while (p->next != NULL) {
        if (p->data == p->next->data) {
            q = p->next;
            p->next = q->next;
            free(q);
        } else {
            p = p->next;
        }
    }
}`,
    cases: [
      { name: "多组重复", stdin: "7\n7 10 10 21 30 30 42\n" },
      { name: "全相同", stdin: "5\n5 5 5 5 5\n" },
      { name: "无重复", stdin: "4\n1 2 3 4\n" },
      { name: "空表", stdin: "0\n" },
    ],
  },

  "综合 2.3-13": {
    title: "两个递增链表归并为递减链表",
    sig: "LinkList MergeDesc(LinkList A, LinkList B)",
    ret: "返回合并后递减有序链表的头指针，表带表头结点；要求复用原结点，不新建数据结点。",
    vars: [
      "A、B：两个带头结点的递增单链表。",
      "用头插法把较小者插入结果表头，得到的自然就是递减。",
    ],
    io: "第一行 n1，第二行 n1 个递增整数；第三行 n2，第四行 n2 个递增整数；输出两行：结果表长、递减序列。",
    pre: LIST_PRE,
    post: `LinkList mk(int n) {
    LinkList L;
    LNode *tail, *t;
    int i, v;
    L = (LinkList)malloc(sizeof(LNode));
    L->data = 0;
    L->next = NULL;
    tail = L;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return L;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
    return L;
}

int main(void) {
    int n1 = 0, n2 = 0, cnt = 0;
    LinkList A, B, C;
    LNode *p;
    if (scanf("%d", &n1) != 1) return 0;
    A = mk(n1);
    if (scanf("%d", &n2) != 1) return 0;
    B = mk(n2);
    C = MergeDesc(A, B);
    p = C->next;
    while (p) { cnt = cnt + 1; p = p->next; }
    printf("%d\\n", cnt);
    p = C->next;
    while (p) { printf("%d ", p->data); p = p->next; }
    printf("\\n");
    return 0;
}`,
    std: `LinkList MergeDesc(LinkList A, LinkList B) {
    LNode *pa = A->next, *pb = B->next, *q;
    LinkList C = A;
    C->next = NULL;
    while (pa != NULL && pb != NULL) {
        if (pa->data <= pb->data) {
            q = pa;
            pa = pa->next;
        } else {
            q = pb;
            pb = pb->next;
        }
        q->next = C->next;
        C->next = q;
    }
    while (pa != NULL) {
        q = pa;
        pa = pa->next;
        q->next = C->next;
        C->next = q;
    }
    while (pb != NULL) {
        q = pb;
        pb = pb->next;
        q->next = C->next;
        C->next = q;
    }
    B->next = NULL;
    return C;
}`,
    cases: [
      { name: "等长", stdin: "3\n1 3 5\n3\n2 4 6\n" },
      { name: "B 为空", stdin: "3\n1 2 3\n0\n" },
      { name: "含重复", stdin: "3\n1 2 2\n2\n2 9\n" },
      { name: "A 为空", stdin: "0\n2\n7 8\n" },
    ],
  },

  "综合 2.3-15": {
    title: "求两个递增链表的交集",
    sig: "LinkList Intersect(LinkList A, LinkList B)",
    ret: "返回交集链表的头指针（带头结点），结果递增有序；要求不破坏 A、B 的结点，另建新结点。",
    vars: [
      "A、B：两个带头结点的递增单链表，元素可能重复。",
      "交集里每个值只保留一个。",
    ],
    io: "第一行 n1，第二行 n1 个递增整数；第三行 n2，第四行 n2 个递增整数；输出两行：结果表长、交集序列。",
    pre: LIST_PRE,
    post: `LinkList mk(int n) {
    LinkList L;
    LNode *tail, *t;
    int i, v;
    L = (LinkList)malloc(sizeof(LNode));
    L->data = 0;
    L->next = NULL;
    tail = L;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return L;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
    return L;
}

int main(void) {
    int n1 = 0, n2 = 0, cnt = 0;
    LinkList A, B, C;
    LNode *p;
    if (scanf("%d", &n1) != 1) return 0;
    A = mk(n1);
    if (scanf("%d", &n2) != 1) return 0;
    B = mk(n2);
    C = Intersect(A, B);
    p = C->next;
    while (p) { cnt = cnt + 1; p = p->next; }
    printf("%d\\n", cnt);
    p = C->next;
    while (p) { printf("%d ", p->data); p = p->next; }
    printf("\\n");
    return 0;
}`,
    std: `LinkList Intersect(LinkList A, LinkList B) {
    LinkList C;
    LNode *pa = A->next, *pb = B->next, *tail, *t;
    C = (LinkList)malloc(sizeof(LNode));
    C->data = 0;
    C->next = NULL;
    tail = C;
    while (pa != NULL && pb != NULL) {
        if (pa->data == pb->data) {
            if (tail != C && tail->data == pa->data) {
                pa = pa->next;
                pb = pb->next;
                continue;
            }
            t = (LNode *)malloc(sizeof(LNode));
            t->data = pa->data;
            t->next = NULL;
            tail->next = t;
            tail = t;
            pa = pa->next;
            pb = pb->next;
        } else if (pa->data < pb->data) {
            pa = pa->next;
        } else {
            pb = pb->next;
        }
    }
    return C;
}`,
    cases: [
      { name: "有交集", stdin: "5\n1 2 3 4 5\n4\n2 4 6 8\n" },
      { name: "无交集", stdin: "3\n1 3 5\n3\n2 4 6\n" },
      { name: "重复元素", stdin: "4\n2 2 3 5\n3\n2 3 5\n" },
      { name: "一边为空", stdin: "0\n3\n1 2 3\n" },
    ],
  },

  "综合 2.3-03": {
    title: "从尾到头反向输出单链表",
    sig: "void ReversePrint(LinkList L)",
    ret: "无返回值。按从尾到头的顺序把每个结点的值输出，每个值后面跟一个空格。",
    vars: [
      "L：带头结点的单链表，数据从 L->next 开始。",
      "可以用递归借助系统栈，也可以自己开数组或栈。",
    ],
    io: "第一行 n，第二行 n 个整数；输出一行为逆序的各个值。",
    pre: LIST_PRE,
    post: `int main(void) {
    int n = 0, i, v;
    LinkList L;
    LNode *tail, *t;
    if (scanf("%d", &n) != 1) return 0;
    L = (LinkList)malloc(sizeof(LNode));
    L->data = 0;
    L->next = NULL;
    tail = L;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
    ReversePrint(L);
    printf("\\n");
    return 0;
}`,
    std: `void rp(LNode *p) {
    if (p == NULL) return;
    rp(p->next);
    printf("%d ", p->data);
}

void ReversePrint(LinkList L) {
    rp(L->next);
}`,
    cases: [
      { name: "样例", stdin: "4\n1 2 3 4\n" },
      { name: "单结点", stdin: "1\n9\n" },
      { name: "空表", stdin: "0\n" },
    ],
  },

  "综合 2.3-04": {
    title: "删除单链表中最小值结点",
    sig: "void DelMinNode(LinkList L)",
    ret: "无返回值。删除值最小的那个结点（假设唯一）并释放空间，L 带头结点。",
    vars: [
      "L：带头结点的单链表。",
      "要记住最小值结点的前驱，删除时才能改指针。",
    ],
    io: "第一行 n，第二行 n 个整数；输出两行：新表长、剩余元素。",
    pre: LIST_PRE,
    post: `int main(void) {
    int n = 0, i, v, cnt = 0;
    LinkList L;
    LNode *tail, *t, *p;
    if (scanf("%d", &n) != 1) return 0;
    L = (LinkList)malloc(sizeof(LNode));
    L->data = 0;
    L->next = NULL;
    tail = L;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
    DelMinNode(L);
    p = L->next;
    while (p) { cnt = cnt + 1; p = p->next; }
    printf("%d\\n", cnt);
    p = L->next;
    while (p) { printf("%d ", p->data); p = p->next; }
    printf("\\n");
    return 0;
}`,
    std: `void DelMinNode(LinkList L) {
    LNode *pre = L, *p = L->next, *minpre = L, *minp = L->next;
    if (p == NULL) return;
    while (p != NULL) {
        if (p->data < minp->data) {
            minp = p;
            minpre = pre;
        }
        pre = p;
        p = p->next;
    }
    minpre->next = minp->next;
    free(minp);
}`,
    cases: [
      { name: "中间最小", stdin: "5\n7 3 9 2 8\n" },
      { name: "头部最小", stdin: "4\n1 5 6 7\n" },
      { name: "尾部最小", stdin: "4\n9 8 7 0\n" },
      { name: "单结点", stdin: "1\n5\n" },
    ],
  },

  "综合 2.3-06": {
    title: "把单链表就地排成递增有序",
    sig: "void SortList(LinkList L)",
    ret: "无返回值。L 带头结点，元素无序，处理后按值递增。要求就地做，不新建数据结点。",
    vars: [
      "L：带头结点的单链表。",
      "直接插入排序的思路：把原表结点逐个摘下，插入到已排好序的部分。",
    ],
    io: "第一行 n，第二行 n 个整数；输出两行：表长、升序序列。",
    pre: LIST_PRE,
    post: `int main(void) {
    int n = 0, i, v, cnt = 0;
    LinkList L;
    LNode *tail, *t, *p;
    if (scanf("%d", &n) != 1) return 0;
    L = (LinkList)malloc(sizeof(LNode));
    L->data = 0;
    L->next = NULL;
    tail = L;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
    SortList(L);
    p = L->next;
    while (p) { cnt = cnt + 1; p = p->next; }
    printf("%d\\n", cnt);
    p = L->next;
    while (p) { printf("%d ", p->data); p = p->next; }
    printf("\\n");
    return 0;
}`,
    std: `void SortList(LinkList L) {
    LNode *p = L->next, *q, *pre;
    L->next = NULL;
    while (p != NULL) {
        q = p->next;
        pre = L;
        while (pre->next != NULL && pre->next->data < p->data) pre = pre->next;
        p->next = pre->next;
        pre->next = p;
        p = q;
    }
}`,
    cases: [
      { name: "乱序", stdin: "6\n4 1 6 3 2 5\n" },
      { name: "已有序", stdin: "4\n1 2 3 4\n" },
      { name: "逆序", stdin: "4\n4 3 2 1\n" },
      { name: "含重复", stdin: "5\n3 1 3 2 1\n" },
    ],
  },

  "综合 2.3-07": {
    title: "删除单链表中介于两值之间的结点",
    sig: "void DelBetween(LinkList L, ElemType lo, ElemType hi)",
    ret: "无返回值。元素无序，删除所有满足 lo 小于 data 小于 hi 的结点并释放空间。",
    vars: [
      "L：带头结点的单链表，元素无序。",
      "lo、hi：开区间端点，等于端点的不删。",
    ],
    io: "第一行 n，第二行 n 个整数，第三行 lo hi；输出两行：新表长、剩余元素。",
    pre: LIST_PRE,
    post: `int main(void) {
    int n = 0, i, v, cnt = 0;
    int lo = 0, hi = 0;
    LinkList L;
    LNode *tail, *t, *p;
    if (scanf("%d", &n) != 1) return 0;
    L = (LinkList)malloc(sizeof(LNode));
    L->data = 0;
    L->next = NULL;
    tail = L;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
    if (scanf("%d %d", &lo, &hi) != 2) return 0;
    DelBetween(L, lo, hi);
    p = L->next;
    while (p) { cnt = cnt + 1; p = p->next; }
    printf("%d\\n", cnt);
    p = L->next;
    while (p) { printf("%d ", p->data); p = p->next; }
    printf("\\n");
    return 0;
}`,
    std: `void DelBetween(LinkList L, ElemType lo, ElemType hi) {
    LNode *pre = L, *p = L->next, *q;
    while (p != NULL) {
        if (p->data > lo && p->data < hi) {
            q = p;
            pre->next = p->next;
            p = p->next;
            free(q);
        } else {
            pre = p;
            p = p->next;
        }
    }
}`,
    cases: [
      { name: "删中间值", stdin: "6\n5 2 9 1 7 3\n2 5\n" },
      { name: "端点不删", stdin: "5\n1 2 3 4 5\n1 5\n" },
      { name: "全删", stdin: "3\n3 4 5\n2 6\n" },
      { name: "无命中", stdin: "3\n1 8 9\n2 5\n" },
    ],
  },

  "综合 2.3-10": {
    title: "把单链表按序号奇偶拆成两个表",
    sig: "void Split(LinkList L, LinkList A, LinkList B)",
    ret: "无返回值。A 收原表序号为奇数的结点，B 收序号为偶数的结点，两表都保持原相对次序，都带头结点。",
    vars: [
      "L：源表，带头结点；A、B 调用前已建好头结点、next 为空。",
      "序号从 1 开始，第 1 个结点进 A。",
    ],
    io: "第一行 n，第二行 n 个整数；先输出 A 的表长和元素，再输出 B 的表长和元素，共四行。",
    pre: LIST_PRE,
    post: `int main(void) {
    int n = 0, i, v, ca = 0, cb = 0;
    LinkList L, A, B;
    LNode *tail, *t, *p;
    if (scanf("%d", &n) != 1) return 0;
    L = (LinkList)malloc(sizeof(LNode));
    L->data = 0;
    L->next = NULL;
    tail = L;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
    A = (LinkList)malloc(sizeof(LNode));
    A->data = 0;
    A->next = NULL;
    B = (LinkList)malloc(sizeof(LNode));
    B->data = 0;
    B->next = NULL;
    Split(L, A, B);
    p = A->next;
    while (p) { ca = ca + 1; p = p->next; }
    p = B->next;
    while (p) { cb = cb + 1; p = p->next; }
    printf("%d\\n", ca);
    p = A->next;
    while (p) { printf("%d ", p->data); p = p->next; }
    printf("\\n%d\\n", cb);
    p = B->next;
    while (p) { printf("%d ", p->data); p = p->next; }
    printf("\\n");
    return 0;
}`,
    std: `void Split(LinkList L, LinkList A, LinkList B) {
    LNode *p = L->next, *q, *ta = A, *tb = B;
    int k = 1;
    while (p != NULL) {
        q = p->next;
        p->next = NULL;
        if (k % 2 == 1) {
            ta->next = p;
            ta = p;
        } else {
            tb->next = p;
            tb = p;
        }
        k = k + 1;
        p = q;
    }
}`,
    cases: [
      { name: "六结点", stdin: "6\n1 2 3 4 5 6\n" },
      { name: "奇数个", stdin: "5\n10 20 30 40 50\n" },
      { name: "单结点", stdin: "1\n8\n" },
      { name: "空表", stdin: "0\n" },
    ],
  },

  "综合 2.3-21": {
    title: "判断单链表是否有环",
    sig: "int HasCycle(LinkList L)",
    ret: "有环返回 1，无环返回 0。L 带头结点。",
    vars: [
      "L：带头结点的单链表，尾结点的 next 可能指向表中某个结点形成环。",
      "用快慢指针，空间 O(1)。",
    ],
    io: "第一行 n，第二行 n 个整数，第三行 pos（0 表示无环，k 表示尾接到第 k 个结点）；输出一行为 1 或 0。",
    pre: LIST_PRE,
    post: `int main(void) {
    int n = 0, i, v, pos = 0, k;
    LinkList L;
    LNode *tail, *t, *p, *target = NULL;
    if (scanf("%d", &n) != 1) return 0;
    L = (LinkList)malloc(sizeof(LNode));
    L->data = 0;
    L->next = NULL;
    tail = L;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
    if (scanf("%d", &pos) != 1) return 0;
    if (pos > 0) {
        p = L->next;
        for (k = 1; p != NULL && k < pos; ++k) p = p->next;
        target = p;
        if (target != NULL) tail->next = target;
    }
    printf("%d\\n", HasCycle(L));
    return 0;
}`,
    std: `int HasCycle(LinkList L) {
    LNode *slow = L->next, *fast = L->next;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return 1;
    }
    return 0;
}`,
    cases: [
      { name: "尾接第二个", stdin: "5\n1 2 3 4 5\n2\n" },
      { name: "无环", stdin: "5\n1 2 3 4 5\n0\n" },
      { name: "自环", stdin: "1\n9\n1\n" },
      { name: "空表", stdin: "0\n0\n" },
    ],
  },

  "综合 2.3-14": {
    title: "由两个链表的公共元素生成新链表",
    sig: "LinkList Common(LinkList A, LinkList B)",
    ret: "返回新链表 C 的头指针（带头结点），元素递增；要求不破坏 A、B，结点全部新建。",
    vars: [
      "A、B：两个带头结点的递增单链表。",
      "依次比较，相等就复制一个结点接到 C 尾部，谁小谁前进。",
    ],
    io: "第一行 n1，第二行 n1 个递增整数；第三行 n2，第四行 n2 个递增整数；输出两行：C 的表长、C 的元素。",
    pre: LIST_PRE,
    post: `LinkList mk(int n) {
    LinkList L;
    LNode *tail, *t;
    int i, v;
    L = (LinkList)malloc(sizeof(LNode));
    L->data = 0;
    L->next = NULL;
    tail = L;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return L;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
    return L;
}

int main(void) {
    int n1 = 0, n2 = 0, cnt = 0;
    LinkList A, B, C;
    LNode *p;
    if (scanf("%d", &n1) != 1) return 0;
    A = mk(n1);
    if (scanf("%d", &n2) != 1) return 0;
    B = mk(n2);
    C = Common(A, B);
    p = C->next;
    while (p) { cnt = cnt + 1; p = p->next; }
    printf("%d\\n", cnt);
    p = C->next;
    while (p) { printf("%d ", p->data); p = p->next; }
    printf("\\n");
    return 0;
}`,
    std: `LinkList Common(LinkList A, LinkList B) {
    LinkList C;
    LNode *pa = A->next, *pb = B->next, *tail, *t;
    C = (LinkList)malloc(sizeof(LNode));
    C->data = 0;
    C->next = NULL;
    tail = C;
    while (pa != NULL && pb != NULL) {
        if (pa->data == pb->data) {
            t = (LNode *)malloc(sizeof(LNode));
            t->data = pa->data;
            t->next = NULL;
            tail->next = t;
            tail = t;
            pa = pa->next;
            pb = pb->next;
        } else if (pa->data < pb->data) {
            pa = pa->next;
        } else {
            pb = pb->next;
        }
    }
    return C;
}`,
    cases: [
      { name: "有公共", stdin: "5\n1 3 5 7 9\n4\n3 5 8 9\n" },
      { name: "完全重合", stdin: "3\n1 2 3\n3\n1 2 3\n" },
      { name: "无公共", stdin: "3\n1 3 5\n3\n2 4 6\n" },
      { name: "一边为空", stdin: "3\n1 2 3\n0\n" },
    ],
  },

  "综合 2.3-16": {
    title: "判断序列 B 是否为 A 的连续子序列",
    sig: "int IsSubSeq(LinkList A, LinkList B)",
    ret: "是连续子序列返回 1，否则返回 0；B 为空时返回 1。",
    vars: [
      "A、B：两个带头结点的单链表，元素为整数。",
      "连续子序列指 B 的全部结点在 A 中一段连续位置上逐个相等，不是子集。",
    ],
    io: "第一行 n1，第二行 n1 个整数；第三行 n2，第四行 n2 个整数；输出一行为 1 或 0。",
    pre: LIST_PRE,
    post: `LinkList mk(int n) {
    LinkList L;
    LNode *tail, *t;
    int i, v;
    L = (LinkList)malloc(sizeof(LNode));
    L->data = 0;
    L->next = NULL;
    tail = L;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return L;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
    return L;
}

int main(void) {
    int n1 = 0, n2 = 0;
    LinkList A, B;
    if (scanf("%d", &n1) != 1) return 0;
    A = mk(n1);
    if (scanf("%d", &n2) != 1) return 0;
    B = mk(n2);
    printf("%d\\n", IsSubSeq(A, B));
    return 0;
}`,
    std: `int IsSubSeq(LinkList A, LinkList B) {
    LNode *pa, *pb, *start;
    if (B->next == NULL) return 1;
    start = A->next;
    while (start != NULL) {
        pa = start;
        pb = B->next;
        while (pa != NULL && pb != NULL && pa->data == pb->data) {
            pa = pa->next;
            pb = pb->next;
        }
        if (pb == NULL) return 1;
        start = start->next;
    }
    return 0;
}`,
    cases: [
      { name: "是子序列", stdin: "6\n1 2 3 4 5 6\n3\n3 4 5\n" },
      { name: "不是", stdin: "6\n1 2 3 4 5 6\n3\n1 3 5\n" },
      { name: "后缀", stdin: "5\n7 8 9 10 11\n2\n10 11\n" },
      { name: "B 为空", stdin: "3\n1 2 3\n0\n" },
    ],
  },

  "综合 2.3-19": {
    title: "反复找出并删除最小结点，直到表空",
    sig: "void DelMinAll(LinkList L)",
    ret: "无返回值。每轮找到当前最小值结点，输出它的值（后面跟一个空格），然后删除并释放，直到表空。",
    vars: [
      "L：带头结点的单链表，元素为正整数。",
      "输出顺序就是删除顺序，由小到大。",
    ],
    io: "第一行 n，第二行 n 个正整数；输出一行为依次删掉的值。",
    pre: LIST_PRE,
    post: `int main(void) {
    int n = 0, i, v;
    LinkList L;
    LNode *tail, *t;
    if (scanf("%d", &n) != 1) return 0;
    L = (LinkList)malloc(sizeof(LNode));
    L->data = 0;
    L->next = NULL;
    tail = L;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
    DelMinAll(L);
    printf("\\n");
    return 0;
}`,
    std: `void DelMinAll(LinkList L) {
    LNode *pre, *p, *minpre, *minp;
    while (L->next != NULL) {
        pre = L;
        p = L->next;
        minpre = L;
        minp = L->next;
        while (p != NULL) {
            if (p->data < minp->data) {
                minp = p;
                minpre = pre;
            }
            pre = p;
            p = p->next;
        }
        printf("%d ", minp->data);
        minpre->next = minp->next;
        free(minp);
    }
}`,
    cases: [
      { name: "乱序", stdin: "5\n3 1 9 2 7\n" },
      { name: "含重复", stdin: "5\n4 2 4 1 2\n" },
      { name: "已升序", stdin: "4\n1 2 3 4\n" },
      { name: "单结点", stdin: "1\n8\n" },
    ],
  },

  "综合 2.3-24": {
    title: "删除绝对值重复的结点",
    sig: "void DelAbsDup(LinkList L, int n)",
    ret: "无返回值。元素满足 |data| 不大于 n，删掉绝对值已经出现过的后续结点，只保留第一次出现的那个。",
    vars: [
      "L：带头结点的单链表，data 为整数，|data| ≤ n。",
      "可以用 n+1 个标记位，时间 O(n)。",
    ],
    io: "第一行 n（既是结点数也是绝对值上限），第二行 n 个整数；输出两行：新表长、剩余元素。",
    pre: LIST_PRE,
    post: `int main(void) {
    int n = 0, i, v, cnt = 0;
    LinkList L;
    LNode *tail, *t, *p;
    if (scanf("%d", &n) != 1) return 0;
    L = (LinkList)malloc(sizeof(LNode));
    L->data = 0;
    L->next = NULL;
    tail = L;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
    DelAbsDup(L, n);
    p = L->next;
    while (p) { cnt = cnt + 1; p = p->next; }
    printf("%d\\n", cnt);
    p = L->next;
    while (p) { printf("%d ", p->data); p = p->next; }
    printf("\\n");
    return 0;
}`,
    std: `void DelAbsDup(LinkList L, int n) {
    int *tag = (int *)malloc(sizeof(int) * (n + 1));
    LNode *pre = L, *p = L->next, *q;
    int i, a;
    for (i = 0; i <= n; ++i) tag[i] = 0;
    while (p != NULL) {
        a = p->data >= 0 ? p->data : -p->data;
        if (tag[a]) {
            q = p;
            pre->next = p->next;
            p = p->next;
            free(q);
        } else {
            tag[a] = 1;
            pre = p;
            p = p->next;
        }
    }
    free(tag);
}`,
    cases: [
      { name: "样例", stdin: "5\n2 -1 -2 3 1\n" },
      { name: "无重复", stdin: "4\n1 -2 3 -4\n" },
      { name: "全同绝对值", stdin: "4\n4 -4 4 -4\n" },
      { name: "单结点", stdin: "1\n-1\n" },
    ],
  },

  "综合 2.3-25": {
    title: "把链表重排成首尾交替的形式",
    sig: "void Reorder(LinkList L)",
    ret: "无返回值。把 a1,a2,...,an 重排成 a1,an,a2,a(n-1),... 的形式，只用 O(1) 辅助空间。",
    vars: [
      "L：带头结点的单链表，长度 n 未知，需要先求长度或找中点。",
      "思路：找中点断开，后半逆置，再交替合并。",
    ],
    io: "第一行 n，第二行 n 个整数；输出两行：表长、重排后的序列。",
    pre: LIST_PRE,
    post: `int main(void) {
    int n = 0, i, v, cnt = 0;
    LinkList L;
    LNode *tail, *t, *p;
    if (scanf("%d", &n) != 1) return 0;
    L = (LinkList)malloc(sizeof(LNode));
    L->data = 0;
    L->next = NULL;
    tail = L;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
    Reorder(L);
    p = L->next;
    while (p) { cnt = cnt + 1; p = p->next; }
    printf("%d\\n", cnt);
    p = L->next;
    while (p) { printf("%d ", p->data); p = p->next; }
    printf("\\n");
    return 0;
}`,
    std: `void Reorder(LinkList L) {
    LNode *p, *q, *r, *s;
    int n = 0, i;
    p = L->next;
    while (p != NULL) {
        n = n + 1;
        p = p->next;
    }
    if (n <= 2) return;
    p = L->next;
    for (i = 1; i < (n + 1) / 2; ++i) p = p->next;
    q = p->next;
    p->next = NULL;
    r = NULL;
    while (q != NULL) {
        s = q->next;
        q->next = r;
        r = q;
        q = s;
    }
    p = L->next;
    q = r;
    while (q != NULL) {
        s = p->next;
        r = q->next;
        p->next = q;
        q->next = s;
        p = s;
        q = r;
    }
}`,
    cases: [
      { name: "六结点", stdin: "6\n1 2 3 4 5 6\n" },
      { name: "五结点", stdin: "5\n1 2 3 4 5\n" },
      { name: "两结点", stdin: "2\n1 2\n" },
      { name: "单结点", stdin: "1\n7\n" },
    ],
  },
};







