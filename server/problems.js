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

const DLIST_PRE = `#include <stdio.h>
#include <stdlib.h>
typedef int ElemType;
typedef struct DNode {
    ElemType data;
    struct DNode *prior, *next;
} DNode, *DLinkList;
`;

const DLIST_FREQ_PRE = `#include <stdio.h>
#include <stdlib.h>
typedef int ElemType;
typedef struct DNode {
    ElemType data;
    struct DNode *prior, *next;
    int freq;
} DNode, *DLinkList;
`;

const CLIST_CHAR_PRE = `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef char ElemType;
typedef struct LNode {
    ElemType data;
    struct LNode *next;
} LNode, *LinkList;
`;

const STKQUE_PRE = `#include <stdio.h>
#include <stdlib.h>
#define MAXS 100
typedef int ElemType;
typedef struct { ElemType data[MAXS]; int top; } Stack;
typedef struct { ElemType data[MAXS]; int front, rear; } Queue;

void InitStack(Stack *S) { S->top = -1; }
int StackEmpty(Stack *S) { return S->top == -1; }
void Push(Stack *S, ElemType x) { S->data[++S->top] = x; }
void Pop(Stack *S, ElemType *x) { *x = S->data[S->top--]; }
void InitQueue(Queue *Q) { Q->front = 0; Q->rear = 0; }
int QueueEmpty(Queue *Q) { return Q->front == Q->rear; }
void EnQueue(Queue *Q, ElemType x) { Q->data[Q->rear++] = x; }
void DeQueue(Queue *Q, ElemType *x) { *x = Q->data[Q->front++]; }
`;

const SHARESTK_PRE = `#include <stdio.h>
#include <stdlib.h>
#define maxsize 100
typedef int elemtp;
typedef struct {
    elemtp stack[maxsize];
    int top[2];
} stk;

stk s;

void InitShare(void) {
    s.top[0] = -1;
    s.top[1] = maxsize;
}
`;

const TAGQ_PRE = `#include <stdio.h>
#include <stdlib.h>
#define MaxSize 10
typedef int ElemType;
typedef struct {
    ElemType data[MaxSize];
    int front, rear, tag;
} SqQueue;

void InitQueue1(SqQueue *Q) {
    Q->front = 0;
    Q->rear = 0;
    Q->tag = 0;
}
`;

const STKS_PRE = `#include <stdio.h>
#include <stdlib.h>
#define MAXS 50
typedef int ElemType;
typedef struct { ElemType data[MAXS]; int top; } Stack;

void InitStack(Stack *S) { S->top = -1; }
int StackEmpty(Stack *S) { return S->top == -1; }
int StackOverflow(Stack *S) { return S->top == MAXS - 1; }
void Push(Stack *S, ElemType x) { S->data[++S->top] = x; }
void Pop(Stack *S, ElemType *x) { *x = S->data[S->top--]; }
`;

const LQUEUE_PRE = `#include <stdio.h>
#include <stdlib.h>
typedef int ElemType;
typedef struct LNode {
    ElemType data;
    struct LNode *next;
} LNode;
typedef struct { LNode *front, *rear; } LinkQueue;

void InitQueue2(LinkQueue *Q) {
    Q->front = Q->rear = (LNode *)malloc(sizeof(LNode));
    Q->front->data = 0;
    Q->front->next = NULL;
}
int QueueEmpty2(LinkQueue *Q) { return Q->front == Q->rear; }
`;

const EXPR_PRE = `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef struct node {
    char data;
    struct node *left, *right;
} BTree;

BTree *PostBuildExpr(char *s) {
    BTree *st[128];
    int top = -1, i, n = (int)strlen(s);
    BTree *t, *a, *b;
    for (i = 0; i < n; ++i) {
        t = (BTree *)malloc(sizeof(BTree));
        t->data = s[i];
        t->left = NULL;
        t->right = NULL;
        if (s[i] == '+' || s[i] == '-' || s[i] == '*' || s[i] == '/') {
            b = st[top--];
            a = st[top--];
            t->left = a;
            t->right = b;
        }
        st[++top] = t;
    }
    return top >= 0 ? st[top] : NULL;
}
`;

const SQBIT_PRE = `#include <stdio.h>
#include <stdlib.h>
#define MAX_SIZE 100
#define true 1
#define false 0
typedef int bool;
typedef struct {
    int SqBiTNode[MAX_SIZE];
    int ElemNum;
} SqBiTree;
`;

const CST_PRE = `#include <stdio.h>
#include <stdlib.h>
typedef struct CSNode {
    char data;
    struct CSNode *firstchild, *nextsibling;
} CSNode, *CSTree;
`;

const THR_PRE = `#include <stdio.h>
#include <stdlib.h>
typedef struct BiThrNode {
    char data;
    struct BiThrNode *lchild, *rchild;
    int ltag, rtag;
} BiThrNode, *BiThrTree;

BiThrTree BuildThrTree(void) {
    char c;
    if (scanf(" %c", &c) != 1) return NULL;
    if (c == '#') return NULL;
    BiThrNode *p = (BiThrNode *)malloc(sizeof(BiThrNode));
    p->data = c;
    p->ltag = 0;
    p->rtag = 0;
    p->lchild = BuildThrTree();
    p->rchild = BuildThrTree();
    return p;
}

BiThrTree thrPre = NULL;

void InThread(BiThrTree p) {
    if (p == NULL) return;
    InThread(p->lchild);
    if (p->lchild == NULL) {
        p->lchild = thrPre;
        p->ltag = 1;
    }
    if (thrPre != NULL && thrPre->rchild == NULL) {
        thrPre->rchild = p;
        thrPre->rtag = 1;
    }
    thrPre = p;
    InThread(p->rchild);
}

void CreateInThread(BiThrTree T) {
    thrPre = NULL;
    InThread(T);
    if (thrPre != NULL) thrPre->rtag = 1;
}
`;

const ARR_PRE = `#include <stdio.h>
#include <stdlib.h>
#define MAXN 1000
typedef int ElemType;
`;

const HASH_CHAIN_PRE = `#include <stdio.h>
#include <stdlib.h>
typedef struct HNode {
    int key;
    struct HNode *next;
} HNode;
`;

const DOUBLE_HASH_PRE = `#include <stdio.h>
#include <stdlib.h>

int REV(int x) {
    int r = 0;
    while (x > 0) {
        r = r * 10 + x % 10;
        x /= 10;
    }
    return r;
}
`;

const BSTC_PRE = `#include <stdio.h>
#include <stdlib.h>
typedef struct BSTNode {
    int key;
    int count;
    struct BSTNode *lchild, *rchild;
} BSTNode, *BSTree;

BSTNode *BSTInsertC(BSTNode *T, int k) {
    if (T == NULL) {
        T = (BSTNode *)malloc(sizeof(BSTNode));
        T->key = k;
        T->count = 1;
        T->lchild = NULL;
        T->rchild = NULL;
        return T;
    }
    if (k < T->key) T->lchild = BSTInsertC(T->lchild, k);
    else if (k > T->key) T->rchild = BSTInsertC(T->rchild, k);
    return T;
}

int CalcCount(BSTNode *T) {
    if (T == NULL) return 0;
    T->count = 1 + CalcCount(T->lchild) + CalcCount(T->rchild);
    return T->count;
}

BSTNode *BuildCountBST(int n) {
    BSTNode *T = NULL;
    int i, k;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &k) != 1) break;
        T = BSTInsertC(T, k);
    }
    CalcCount(T);
    return T;
}
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

  "综合 5.3-12": {
    title: "打印值为 x 的结点的所有祖先",
    sig: "void PrintAnc(BiTree T, char x)",
    ret: "无返回值。按由近及远的顺序输出 x 的各个祖先，每个字符后跟一个空格；x 不在树中则什么都不输出。",
    vars: [
      "BiTree：二叉链表，data 为字符。",
      "假设值为 x 的结点不多于一个，x 本身不要输出。",
    ],
    io: "输入一行扩展先序序列（# 表示空），后面跟一个字符 x；输出一行为祖先序列。",
    pre: TREE_PRE,
    post: `int main(void) {
    BiTree T = BuildTree();
    char x = 0;
    if (scanf(" %c", &x) != 1) return 0;
    PrintAnc(T, x);
    printf("\\n");
    return 0;
}`,
    std: `int anc(BiTree T, char x) {
    if (T == NULL) return 0;
    if (T->data == x) return 1;
    if (anc(T->lchild, x) || anc(T->rchild, x)) {
        printf("%c ", T->data);
        return 1;
    }
    return 0;
}

void PrintAnc(BiTree T, char x) {
    anc(T, x);
}`,
    cases: [
      { name: "叶子 E", stdin: "ABD##E##CF### E\n" },
      { name: "叶子 F", stdin: "ABD##E##CF### F\n" },
      { name: "根 A", stdin: "ABD##E##CF### A\n" },
      { name: "不存在", stdin: "ABD##E##CF### Z\n" },
    ],
  },

  "综合 5.3-15": {
    title: "由满二叉树的先序序列求后序序列",
    sig: "void PostOrder(char pre[], char post[], int n)",
    ret: "无返回值。pre 是满二叉树的先序序列，post 用来装结果后序序列，下标都从 1 开始。",
    vars: [
      "n：结点个数，是 2 的幂减一。",
      "满二叉树左右子树结点个数相等，各 (n-1)/2 个。",
    ],
    io: "第一行 n，第二行先序序列；输出一行为后序序列。",
    pre: STR_PRE,
    post: `int main(void) {
    char pre[512], post[512];
    int n = 0, i;
    if (scanf("%d", &n) != 1) return 0;
    if (scanf("%511s", pre + 1) != 1) return 0;
    PostOrder(pre, post, n);
    for (i = 1; i <= n; ++i) printf("%c", post[i]);
    printf("\\n");
    return 0;
}`,
    std: `void pp(char pre[], int l1, int r1, char post[], int l2, int r2) {
    int half;
    if (l1 > r1) return;
    half = (r1 - l1) / 2;
    post[r2] = pre[l1];
    pp(pre, l1 + 1, l1 + half, post, l2, l2 + half - 1);
    pp(pre, l1 + half + 1, r1, post, l2 + half, r2 - 1);
}

void PostOrder(char pre[], char post[], int n) {
    pp(pre, 1, n, post, 1, n);
}`,
    cases: [
      { name: "三层", stdin: "7\nABDECFG\n" },
      { name: "单结点", stdin: "1\nA\n" },
      { name: "一层半", stdin: "3\nABC\n" },
    ],
  },

  "综合 5.3-17": {
    title: "判断两棵二叉树是否相似",
    sig: "int Similar(BiTree T1, BiTree T2)",
    ret: "相似返回 1，否则返回 0。相似指两棵都空、或根都存在且左右子树分别相似，不要求结点值相同。",
    vars: [
      "BiTree：二叉链表，data 为字符。",
      "相似只看形状，不看 data。",
    ],
    io: "输入两行扩展先序序列（# 表示空），第一行是第一棵树、第二行是第二棵树；输出一行为 1 或 0。",
    pre: TREE_PRE,
    post: `int main(void) {
    BiTree T1 = BuildTree();
    BiTree T2 = BuildTree();
    printf("%d\\n", Similar(T1, T2));
    return 0;
}`,
    std: `int Similar(BiTree T1, BiTree T2) {
    if (T1 == NULL && T2 == NULL) return 1;
    if (T1 == NULL || T2 == NULL) return 0;
    return Similar(T1->lchild, T2->lchild) && Similar(T1->rchild, T2->rchild);
}`,
    cases: [
      { name: "形状相同值不同", stdin: "ABD##E##CF###\nXYP##Q##RS###\n" },
      { name: "形状不同", stdin: "ABD##E##CF###\nA#B##\n" },
      { name: "都为空", stdin: "#\n#\n" },
      { name: "一空一非空", stdin: "A##\n#\n" },
    ],
  },

  "综合 5.3-19": {
    title: "求二叉树的带权路径长度 WPL",
    sig: "int WPL(BiTree T)",
    ret: "返回所有叶结点带权路径长度之和；树空返回 0。",
    vars: [
      "BiTree：二叉链表，结点 data 是单个数字字符，表示该结点的权值。",
      "只有叶结点计入，路径长度按根结点深度为 1 计算（即根到叶的边数加 1）。",
    ],
    io: "输入一行扩展先序序列（# 表示空），结点值用 0-9 单个数字；输出一行为 WPL。",
    pre: TREE_PRE,
    post: `int main(void) {
    BiTree T = BuildTree();
    printf("%d\\n", WPL(T));
    return 0;
}`,
    std: `int wpl(BiTree T, int d) {
    if (T == NULL) return 0;
    if (T->lchild == NULL && T->rchild == NULL) return (T->data - '0') * d;
    return wpl(T->lchild, d + 1) + wpl(T->rchild, d + 1);
}

int WPL(BiTree T) {
    return wpl(T, 1);
}`,
    cases: [
      { name: "样例", stdin: "12##3##\n" },
      { name: "三层", stdin: "12##3#4##\n" },
      { name: "单结点", stdin: "5##\n" },
      { name: "空树", stdin: "#\n" },
    ],
  },

  "综合 6.4-06": {
    title: "判断有向图能否进行拓扑排序",
    sig: "int IsDAG(ALGraph G)",
    ret: "图中无环返回 1（可以拓扑排序），有环返回 0。",
    vars: [
      "G：有向图邻接表，顶点编号 1..n。",
      "思路：DFS 时用三种状态标记，0 未访问、1 在当前递归栈上、2 已完成，遇到指向状态 1 的边就有环。也可以用入度法做拓扑排序，看能否排出全部顶点。",
    ],
    io: "第一行 n m，随后 m 行 u v 表示一条有向边 u→v；输出一行为 1 或 0。",
    pre: AL_PRE,
    post: `int main(void) {
    ALGraph G = BuildALG(1);
    printf("%d\\n", IsDAG(G));
    return 0;
}`,
    std: `int state[MAXV + 1];
int cyc = 0;

void dfs(ALGraph G, int v) {
    ArcNode *p;
    state[v] = 1;
    p = G.vertices[v].firstarc;
    while (p != NULL) {
        if (state[p->adjvex] == 1) cyc = 1;
        else if (state[p->adjvex] == 0) dfs(G, p->adjvex);
        if (cyc) return;
        p = p->nextarc;
    }
    state[v] = 2;
}

int IsDAG(ALGraph G) {
    int i;
    cyc = 0;
    for (i = 1; i <= G.vexnum; ++i) state[i] = 0;
    for (i = 1; i <= G.vexnum; ++i) {
        if (state[i] == 0) dfs(G, i);
        if (cyc) return 0;
    }
    return 1;
}`,
    cases: [
      { name: "无环", stdin: "4 4\n1 2\n1 3\n2 4\n3 4\n" },
      { name: "三顶点环", stdin: "3 3\n1 2\n2 3\n3 1\n" },
      { name: "自环", stdin: "2 2\n1 1\n1 2\n" },
      { name: "无边的三顶点", stdin: "3 0\n" },
    ],
  },

  "综合 7.3-07": {
    title: "求指定结点在二叉排序树中的层次",
    sig: "int Level(BSTree T, int x)",
    ret: "返回值为 x 的结点所在层次（根为第 1 层）；不存在返回 0。",
    vars: [
      "BSTree：二叉排序树，结点含 key。",
      "按 key 大小比较往下走，走一步层次加一，不必遍历整棵树。",
    ],
    io: "第一行 n，第二行 n 个整数（插入顺序），第三行 x；输出一行为层次或 0。",
    pre: BST_PRE,
    post: `int main(void) {
    int n = 0, x = 0;
    BSTree T;
    if (scanf("%d", &n) != 1) return 0;
    T = BuildBST(n);
    if (scanf("%d", &x) != 1) return 0;
    printf("%d\\n", Level(T, x));
    return 0;
}`,
    std: `int Level(BSTree T, int x) {
    int lv = 1;
    while (T != NULL) {
        if (T->key == x) return lv;
        if (x < T->key) T = T->lchild;
        else T = T->rchild;
        lv = lv + 1;
    }
    return 0;
}`,
    cases: [
      { name: "样例", stdin: "6\n50 38 70 30 45 80\n30\n" },
      { name: "根结点", stdin: "6\n50 38 70 30 45 80\n50\n" },
      { name: "查不到", stdin: "6\n50 38 70 30 45 80\n99\n" },
      { name: "单结点", stdin: "1\n9\n9\n" },
    ],
  },

  "综合 7.3-10": {
    title: "从大到小输出不小于 k 的关键字",
    sig: "void PrintGE(BSTree T, int k)",
    ret: "无返回值。按从大到小的顺序输出所有 key 不小于 k 的结点，每个值后跟一个空格。",
    vars: [
      "BSTree：二叉排序树，结点含 key。",
      "用右子树、根、左子树的遍历次序，天然得到降序。",
    ],
    io: "第一行 n，第二行 n 个整数（插入顺序），第三行 k；输出一行为从大到小且不小于 k 的值。",
    pre: BST_PRE,
    post: `int main(void) {
    int n = 0, k = 0;
    BSTree T;
    if (scanf("%d", &n) != 1) return 0;
    T = BuildBST(n);
    if (scanf("%d", &k) != 1) return 0;
    PrintGE(T, k);
    printf("\\n");
    return 0;
}`,
    std: `void PrintGE(BSTree T, int k) {
    if (T == NULL) return;
    PrintGE(T->rchild, k);
    if (T->key >= k) printf("%d ", T->key);
    PrintGE(T->lchild, k);
}`,
    cases: [
      { name: "样例", stdin: "6\n50 38 70 30 45 80\n45\n" },
      { name: "k 很小", stdin: "6\n50 38 70 30 45 80\n0\n" },
      { name: "k 很大", stdin: "6\n50 38 70 30 45 80\n100\n" },
      { name: "单结点", stdin: "1\n9\n9\n" },
    ],
  },

  "综合 7.2-05": {
    title: "折半查找的递归算法",
    sig: "int BinSearch(ElemType a[], int low, int high, ElemType k)",
    ret: "找到返回元素下标，找不到返回 0。",
    vars: [
      "a：递增有序数组，下标从 1 到 n，a[0] 不用。",
      "初始调用时 low 为 1、high 为 n，必须写成递归。",
    ],
    io: "第一行 n，第二行 n 个递增整数，第三行 k；输出一行为下标或 0。",
    pre: ARR_PRE,
    post: `int main(void) {
    ElemType a[MAXN + 2];
    int n = 0, k = 0, i;
    if (scanf("%d", &n) != 1) return 0;
    for (i = 1; i <= n; ++i) {
        if (scanf("%d", &a[i]) != 1) return 0;
    }
    if (scanf("%d", &k) != 1) return 0;
    printf("%d\\n", BinSearch(a, 1, n, k));
    return 0;
}`,
    std: `int BinSearch(ElemType a[], int low, int high, ElemType k) {
    int mid;
    if (low > high) return 0;
    mid = (low + high) / 2;
    if (a[mid] == k) return mid;
    if (a[mid] > k) return BinSearch(a, low, mid - 1, k);
    return BinSearch(a, mid + 1, high, k);
}`,
    cases: [
      { name: "找到中间", stdin: "8\n1 3 5 7 9 11 13 15\n7\n" },
      { name: "找到端点", stdin: "8\n1 3 5 7 9 11 13 15\n15\n" },
      { name: "找不到", stdin: "8\n1 3 5 7 9 11 13 15\n4\n" },
      { name: "单元素", stdin: "1\n6\n6\n" },
    ],
  },

  "综合 8.4-04": {
    title: "在单链表上做简单选择排序",
    sig: "void LinkSelectSort(LinkList L)",
    ret: "无返回值。L 带头结点，按值升序；可以交换结点里的 data，也可以重排指针，结果一致。",
    vars: [
      "L：带头结点的单链表。",
      "每趟从剩余部分选出最小者，与当前位置交换。",
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
    LinkSelectSort(L);
    p = L->next;
    while (p) { cnt = cnt + 1; p = p->next; }
    printf("%d\\n", cnt);
    p = L->next;
    while (p) { printf("%d ", p->data); p = p->next; }
    printf("\\n");
    return 0;
}`,
    std: `void LinkSelectSort(LinkList L) {
    LNode *p = L->next, *q, *min;
    ElemType t;
    while (p != NULL) {
        min = p;
        q = p->next;
        while (q != NULL) {
            if (q->data < min->data) min = q;
            q = q->next;
        }
        if (min != p) {
            t = p->data;
            p->data = min->data;
            min->data = t;
        }
        p = p->next;
    }
}`,
    cases: [
      { name: "乱序", stdin: "6\n4 1 6 3 2 5\n" },
      { name: "逆序", stdin: "4\n9 7 5 1\n" },
      { name: "已有序", stdin: "4\n1 2 3 4\n" },
      { name: "空表", stdin: "0\n" },
    ],
  },

  "综合 5.3-04": {
    title: "自下而上、从右到左的层次遍历",
    sig: "void RevLevel(BiTree T)",
    ret: "无返回值。按层从最底层往上输出，同一层内从右到左，每层占一行，结点之间不加空格。",
    vars: [
      "BiTree：二叉链表，data 为字符。",
      "先做一遍普通层序把结点和层号记下来，再倒着读这段记录即可。",
    ],
    io: "输入一行扩展先序序列（# 表示空结点）；输出若干行，每行是一层，从底层往上。",
    pre: TREE_PRE,
    post: `int main(void) {
    BiTree T = BuildTree();
    RevLevel(T);
    printf("\\n");
    return 0;
}`,
    std: `void RevLevel(BiTree T) {
    BiTNode *q[1000];
    int lev[1000];
    int front = 0, rear = 0, i, cur;
    if (T == NULL) return;
    q[rear] = T;
    lev[rear] = 1;
    rear = rear + 1;
    while (front < rear) {
        BiTNode *p = q[front];
        int l = lev[front];
        front = front + 1;
        if (p->lchild) { q[rear] = p->lchild; lev[rear] = l + 1; rear = rear + 1; }
        if (p->rchild) { q[rear] = p->rchild; lev[rear] = l + 1; rear = rear + 1; }
    }
    cur = lev[rear - 1];
    for (i = rear - 1; i >= 0; --i) {
        if (lev[i] != cur) {
            printf("\\n");
            cur = lev[i];
        }
        printf("%c", q[i]->data);
    }
}`,
    cases: [
      { name: "三层", stdin: "ABD##E##CF###\n" },
      { name: "单结点", stdin: "A##\n" },
      { name: "空树", stdin: "#\n" },
    ],
  },

  "综合 5.4-04": {
    title: "求孩子兄弟表示法存储的森林的叶结点数",
    sig: "int LeafCount(BiTree T)",
    ret: "返回森林中叶结点的个数；空森林返回 0。",
    vars: [
      "BiTree 在这道题里按孩子兄弟表示法使用：lchild 指向第一个孩子，rchild 指向下一个兄弟。",
      "叶结点指没有孩子的结点，也就是 T->lchild 为空的结点。",
    ],
    io: "输入一行扩展先序序列（# 表示空）；输出一行为叶结点数。",
    pre: TREE_PRE,
    post: `int main(void) {
    BiTree T = BuildTree();
    printf("%d\\n", LeafCount(T));
    return 0;
}`,
    std: `int LeafCount(BiTree T) {
    int n = 0;
    if (T == NULL) return 0;
    if (T->lchild == NULL) n = 1;
    return n + LeafCount(T->lchild) + LeafCount(T->rchild);
}`,
    cases: [
      { name: "三棵树", stdin: "AB#C#D#E##\n" },
      { name: "单结点", stdin: "A##\n" },
      { name: "空森林", stdin: "#\n" },
    ],
  },

  "综合 5.4-05": {
    title: "求孩子兄弟表示法存储的树的深度",
    sig: "int TreeDepth(BiTree T)",
    ret: "返回树的深度（只有根结点时为 1）；空树返回 0。",
    vars: [
      "BiTree 按孩子兄弟表示法使用：lchild 是第一个孩子，rchild 是下一个兄弟。",
      "兄弟不增加层次，只有往孩子走才加一，所以对每个结点的孩子取最大深度再加一。",
    ],
    io: "输入一行扩展先序序列（# 表示空）；输出一行为深度。",
    pre: TREE_PRE,
    post: `int main(void) {
    BiTree T = BuildTree();
    printf("%d\\n", TreeDepth(T));
    return 0;
}`,
    std: `int TreeDepth(BiTree T) {
    int d = 0, dc;
    BiTNode *p;
    if (T == NULL) return 0;
    p = T->lchild;
    while (p != NULL) {
        dc = TreeDepth(p);
        if (dc > d) d = dc;
        p = p->rchild;
    }
    return d + 1;
}`,
    cases: [
      { name: "两层", stdin: "AB#C#D#E##\n" },
      { name: "单结点", stdin: "A##\n" },
      { name: "链式三层", stdin: "ABC#####\n" },
      { name: "空树", stdin: "#\n" },
    ],
  },

  "综合 8.6-04": {
    title: "把首元素放到排序后的正确位置",
    sig: "void PlaceFirst(ElemType a[], int n)",
    ret: "无返回值。把 a[1] 放到它在升序排列中应该待的位置上，要求比较次数不超过 n 次。",
    vars: [
      "a：无序数组，下标 1..n。",
      "做法是先取出 a[1] 当枢轴，从两端向中间扫，比它大的往右挪、比它小的往左挪，一趟划分即可，这正是快速排序的一次划分。",
    ],
    io: "第一行 n，第二行 n 个整数；输出一行为处理后的序列。",
    pre: ARR_PRE,
    post: `int main(void) {
    ElemType a[MAXN + 2];
    int n = 0, i;
    if (scanf("%d", &n) != 1) return 0;
    for (i = 1; i <= n; ++i) {
        if (scanf("%d", &a[i]) != 1) return 0;
    }
    PlaceFirst(a, n);
    for (i = 1; i <= n; ++i) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
    std: `void PlaceFirst(ElemType a[], int n) {
    ElemType p = a[1];
    int low = 1, high = n;
    while (low < high) {
        while (low < high && a[high] >= p) high = high - 1;
        a[low] = a[high];
        while (low < high && a[low] <= p) low = low + 1;
        a[high] = a[low];
    }
    a[low] = p;
}`,
    cases: [
      { name: "乱序", stdin: "6\n4 5 1 2 6 3\n" },
      { name: "首元素最小", stdin: "5\n1 9 8 7 6\n" },
      { name: "首元素最大", stdin: "5\n9 1 2 3 4\n" },
      { name: "单元素", stdin: "1\n7\n" },
    ],
  },

  "综合 5.3-11": {
    title: "删除以 x 为根的子树",
    sig: "void DelSubtree(BiTree *T, char x)",
    ret: "无返回值。在树中找到值为 x 的结点，删掉以它为根的整棵子树并释放空间；找不到就什么都不做。",
    vars: [
      "T：二级指针，删除根结点本身时要把 T 置空，所以必须传地址。",
      "删子树要递归释放每个结点，不能只断指针。",
    ],
    io: "输入一行扩展先序序列（# 表示空），后面跟一个字符 x；输出一行为删除后的先序序列。",
    pre: TREE_PRE,
    post: `void FreeTree(BiTree T);
int main(void) {
    BiTree T = BuildTree();
    char x = 0;
    if (scanf(" %c", &x) != 1) return 0;
    DelSubtree(&T, x);
    PrintPre(T);
    printf("\\n");
    return 0;
}`,
    std: `void FreeTree(BiTree T) {
    if (T == NULL) return;
    FreeTree(T->lchild);
    FreeTree(T->rchild);
    free(T);
}

int del(BiTree *T, char x) {
    if (*T == NULL) return 0;
    if ((*T)->data == x) {
        FreeTree(*T);
        *T = NULL;
        return 1;
    }
    if (del(&(*T)->lchild, x)) return 1;
    return del(&(*T)->rchild, x);
}

void DelSubtree(BiTree *T, char x) {
    del(T, x);
}`,
    cases: [
      { name: "删叶子", stdin: "ABD##E##CF### E\n" },
      { name: "删内部结点", stdin: "ABD##E##CF### B\n" },
      { name: "删根", stdin: "ABD##E##CF### A\n" },
      { name: "不存在", stdin: "ABD##E##CF### Z\n" },
    ],
  },

  "综合 4.2-02": {
    title: "KMP 匹配，返回首次出现的位置",
    sig: "int IndexOf(char *s, char *p)",
    ret: "返回模式串在主串中首次出现的起始位置（从 1 开始计）；不存在返回 0。",
    vars: [
      "s：主串，p：模式串，都是 0 起始的普通字符串，长度用 strlen 取。",
      "要求用 KMP，比较指针不回退；next 数组可以在函数内部自己算。",
    ],
    io: "第一行主串，第二行模式串；输出一行为位置或 0。",
    pre: STR_PRE,
    post: `int main(void) {
    char s[512], p[256];
    if (scanf("%511s", s) != 1) return 0;
    if (scanf("%255s", p) != 1) return 0;
    printf("%d\\n", IndexOf(s, p));
    return 0;
}`,
    std: `void getnext(char *p, int next[]) {
    int i = 0, j = -1, m = (int)strlen(p);
    next[0] = -1;
    while (i < m - 1) {
        if (j == -1 || p[i] == p[j]) {
            i = i + 1;
            j = j + 1;
            next[i] = j;
        } else {
            j = next[j];
        }
    }
}

int IndexOf(char *s, char *p) {
    int next[256];
    int i = 0, j = 0, n = (int)strlen(s), m = (int)strlen(p);
    if (m == 0) return 1;
    getnext(p, next);
    while (i < n && j < m) {
        if (j == -1 || s[i] == p[j]) {
            i = i + 1;
            j = j + 1;
        } else {
            j = next[j];
        }
    }
    if (j >= m) return i - m + 1;
    return 0;
}`,
    cases: [
      { name: "样例", stdin: "aabaabaabaac\naabaac\n" },
      { name: "从头匹配", stdin: "abcabcabd\nabcabd\n" },
      { name: "不出现", stdin: "abcdefg\nxyz\n" },
      { name: "单字符", stdin: "hello\nl\n" },
    ],
  },

  "综合 5.2-05": {
    title: "求顺序存储二叉树中两个结点的最近公共祖先",
    sig: "int LCA(ElemType a[], int n, int i, int j)",
    ret: "返回编号 i 和 j 的两个结点的最近公共祖先结点的值；i 或 j 超出 1..n 返回 0。",
    vars: [
      "a：完全二叉树的顺序存储，下标 1..n，a[0] 不用，根是 a[1]。",
      "编号为 k 的结点，其父结点编号是 k/2（整除）。",
    ],
    io: "第一行 n，第二行 n 个整数（顺序存储的结点值），第三行 i j；输出一行为祖先值或 0。",
    pre: ARR_PRE,
    post: `int main(void) {
    ElemType a[MAXN + 2];
    int n = 0, i = 0, j = 0, k;
    if (scanf("%d", &n) != 1) return 0;
    for (k = 1; k <= n; ++k) {
        if (scanf("%d", &a[k]) != 1) return 0;
    }
    if (scanf("%d %d", &i, &j) != 2) return 0;
    printf("%d\\n", LCA(a, n, i, j));
    return 0;
}`,
    std: `int LCA(ElemType a[], int n, int i, int j) {
    int path[64], k = 0, p, t;
    if (i < 1 || i > n || j < 1 || j > n) return 0;
    p = i;
    while (p >= 1 && k < 64) {
        path[k] = p;
        k = k + 1;
        p = p / 2;
    }
    p = j;
    while (p >= 1) {
        for (t = 0; t < k; ++t) {
            if (path[t] == p) return a[p];
        }
        p = p / 2;
    }
    return 0;
}`,
    cases: [
      { name: "兄弟", stdin: "7\n1 2 3 4 5 6 7\n4 5\n" },
      { name: "跨层", stdin: "7\n1 2 3 4 5 6 7\n4 6\n" },
      { name: "其中一个是祖先", stdin: "7\n1 2 3 4 5 6 7\n2 5\n" },
      { name: "越界", stdin: "7\n1 2 3 4 5 6 7\n8 9\n" },
    ],
  },

  "综合 7.3-08": {
    title: "判断二叉树是否是平衡二叉树",
    sig: "int IsBalanced(BSTree T)",
    ret: "是平衡二叉树返回 1，否则返回 0；空树返回 1。",
    vars: [
      "BSTree：二叉链表，结点含 key、lchild、rchild。",
      "平衡指每个结点的左右子树高度差不超过 1，要检查全部结点，不只看根。",
    ],
    io: "第一行 n，第二行 n 个整数（按插入顺序建树）；输出一行为 1 或 0。",
    pre: BST_PRE,
    post: `int main(void) {
    int n = 0;
    BSTree T;
    if (scanf("%d", &n) != 1) return 0;
    T = BuildBST(n);
    printf("%d\\n", IsBalanced(T));
    return 0;
}`,
    std: `int hgt(BSTree T) {
    int l, r;
    if (T == NULL) return 0;
    l = hgt(T->lchild);
    r = hgt(T->rchild);
    return (l > r ? l : r) + 1;
}

int IsBalanced(BSTree T) {
    int l, r;
    if (T == NULL) return 1;
    l = hgt(T->lchild);
    r = hgt(T->rchild);
    if (l - r > 1 || r - l > 1) return 0;
    return IsBalanced(T->lchild) && IsBalanced(T->rchild);
}`,
    cases: [
      { name: "平衡", stdin: "7\n50 30 70 20 40 60 80\n" },
      { name: "链状退化", stdin: "5\n10 20 30 40 50\n" },
      { name: "单结点", stdin: "1\n9\n" },
      { name: "空树", stdin: "0\n" },
    ],
  },

  "综合 8.6-03": {
    title: "计数排序",
    sig: "void CountSort(ElemType a[], int n, ElemType b[])",
    ret: "无返回值。把 a[1..n] 里的整数按升序写进 b[1..n]，a 不用改。",
    vars: [
      "a：待排数组，元素是 0 到 100 之间的整数，下标 1..n。",
      "b：结果数组，下标也是 1..n。",
      "做法：先统计每个值出现的次数，再把次数累加成前缀和，最后从后往前定位，保证稳定。",
    ],
    io: "第一行 n，第二行 n 个 0 到 100 的整数；输出一行为 b[1..n]。",
    pre: ARR_PRE,
    post: `int main(void) {
    ElemType a[MAXN + 2], b[MAXN + 2];
    int n = 0, i;
    if (scanf("%d", &n) != 1) return 0;
    for (i = 1; i <= n; ++i) {
        if (scanf("%d", &a[i]) != 1) return 0;
        b[i] = 0;
    }
    CountSort(a, n, b);
    for (i = 1; i <= n; ++i) printf("%d ", b[i]);
    printf("\\n");
    return 0;
}`,
    std: `void CountSort(ElemType a[], int n, ElemType b[]) {
    int c[101];
    int i;
    for (i = 0; i <= 100; ++i) c[i] = 0;
    for (i = 1; i <= n; ++i) c[a[i]] = c[a[i]] + 1;
    for (i = 1; i <= 100; ++i) c[i] = c[i] + c[i - 1];
    for (i = n; i >= 1; --i) {
        b[c[a[i]]] = a[i];
        c[a[i]] = c[a[i]] - 1;
    }
}`,
    cases: [
      { name: "乱序", stdin: "8\n49 38 65 97 76 13 27 49\n" },
      { name: "含 0 和 100", stdin: "5\n100 0 50 0 100\n" },
      { name: "全相同", stdin: "4\n7 7 7 7\n" },
      { name: "单元素", stdin: "1\n5\n" },
    ],
  },

  "综合 2.3-01": {
    title: "递归删除单链表中值为 x 的结点",
    sig: "void Del_X(LinkList *L, ElemType x)",
    ret: "无返回值。L 是指向头指针的指针，*L 就是当前子链表的第一个结点（链表不带头结点），删掉首结点时要靠 *L 改写头指针。",
    vars: [
      "L：LinkList 的地址，*L 为第一个结点，可能为 NULL。",
      "x：待删除的元素值。",
      "递归的思路是：当前结点值等于 x 就删掉它并对新头继续递归，否则对 L->next 递归。",
    ],
    io: "第一行 n，第二行 n 个整数，第三行 x；输出第一行剩余结点个数，第二行剩余元素序列。",
    pre: LIST_PRE,
    post: `int main(void) {
    LinkList L = NULL;
    LNode *tail = NULL, *t;
    int n = 0, i, v, x = 0, cnt = 0;
    if (scanf("%d", &n) != 1) return 0;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        if (tail == NULL) L = t;
        else tail->next = t;
        tail = t;
    }
    if (scanf("%d", &x) != 1) return 0;
    Del_X(&L, x);
    for (t = L; t != NULL; t = t->next) ++cnt;
    printf("%d\\n", cnt);
    for (t = L; t != NULL; t = t->next) printf("%d ", t->data);
    printf("\\n");
    return 0;
}`,
    std: `void Del_X(LinkList *L, ElemType x) {
    LNode *p;
    if (*L == NULL) return;
    if ((*L)->data == x) {
        p = *L;
        *L = (*L)->next;
        free(p);
        Del_X(L, x);
    } else {
        Del_X(&((*L)->next), x);
    }
}`,
    cases: [
      { name: "中间散布", stdin: "6\n1 2 3 2 4 2\n2\n" },
      { name: "头部连续", stdin: "4\n2 2 3 4\n2\n" },
      { name: "全删", stdin: "3\n2 2 2\n2\n" },
      { name: "无匹配", stdin: "3\n1 5 9\n7\n" },
      { name: "空表", stdin: "0\n3\n" },
    ],
  },

  "综合 2.3-11": {
    title: "就地拆分单链表为 A、B 两个表",
    sig: "LinkList DisCreat(LinkList A)",
    ret: "返回拆分出来的 B 表的头指针。A 表被原地改造成只含 a1,a2,……，B 表含 b1,b2,……，两表都保持原有相对次序。",
    vars: [
      "A：带头结点的单链表，元素依次是 a1,b1,a2,b2,……",
      "ra：A 的尾指针，用来尾插；rb：B 的尾指针。",
      "整个算法只改指针，不申请新结点（除 B 的头结点），空间 O(1)。",
    ],
    io: "第一行 n（偶数），第二行 n 个整数，按 a1 b1 a2 b2 的顺序给出；输出两行，分别是 A 表和 B 表的元素序列。",
    pre: LIST_PRE,
    post: `int main(void) {
    LinkList A, B;
    LNode *tail, *t, *p;
    int n = 0, i, v;
    if (scanf("%d", &n) != 1) return 0;
    A = (LinkList)malloc(sizeof(LNode));
    A->data = 0;
    A->next = NULL;
    tail = A;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
    B = DisCreat(A);
    printf("A:");
    for (p = A->next; p != NULL; p = p->next) printf(" %d", p->data);
    printf("\\nB:");
    for (p = B->next; p != NULL; p = p->next) printf(" %d", p->data);
    printf("\\n");
    return 0;
}`,
    std: `LinkList DisCreat(LinkList A) {
    LinkList B = (LinkList)malloc(sizeof(LNode));
    LNode *p = A->next, *ra = A, *rb = B, *q;
    B->data = 0;
    B->next = NULL;
    while (p != NULL) {
        ra->next = p;
        ra = p;
        p = p->next;
        if (p != NULL) {
            q = p->next;
            rb->next = p;
            rb = p;
            p = q;
        }
    }
    ra->next = NULL;
    rb->next = NULL;
    return B;
}`,
    cases: [
      { name: "三组", stdin: "6\n1 2 3 4 5 6\n" },
      { name: "一组", stdin: "2\n10 20\n" },
      { name: "空表", stdin: "0\n" },
      { name: "四组", stdin: "8\n1 9 2 8 3 7 4 6\n" },
    ],
  },

  "综合 2.3-22": {
    title: "查找单链表倒数第 k 个结点",
    sig: "int Search_k(LinkList list, int k)",
    ret: "查找成功时先打印该结点的 data，再返回 1；k 大于表长或 k 小于等于 0 时只返回 0，不打印任何值。",
    vars: [
      "list：带头结点的单链表。",
      "p、q：两个工作指针。p 先单独走 k 步，之后 p、q 同步走，p 到表尾时 q 正好落在倒数第 k 个结点。",
      "count：记录 p 已经走过的结点数，用来判断 k 是否超过表长。",
    ],
    io: "第一行 n，第二行 n 个整数，第三行 k；输出先是该结点的值（仅成功时），最后一行是函数返回值。",
    pre: LIST_PRE,
    post: `int main(void) {
    LinkList list;
    LNode *tail, *t;
    int n = 0, i, v, k = 0;
    if (scanf("%d", &n) != 1) return 0;
    list = (LinkList)malloc(sizeof(LNode));
    list->data = 0;
    list->next = NULL;
    tail = list;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
    if (scanf("%d", &k) != 1) return 0;
    printf("%d\\n", Search_k(list, k));
    return 0;
}`,
    std: `int Search_k(LinkList list, int k) {
    LNode *p = list->next, *q = list->next;
    int count = 0;
    if (k <= 0) return 0;
    while (p != NULL) {
        if (count < k) ++count;
        else q = q->next;
        p = p->next;
    }
    if (count < k) return 0;
    printf("%d\\n", q->data);
    return 1;
}`,
    cases: [
      { name: "倒数第 2", stdin: "5\n1 2 3 4 5\n2\n" },
      { name: "倒数第 1", stdin: "5\n10 20 30 40 50\n1\n" },
      { name: "倒数第 n", stdin: "4\n7 8 9 10\n4\n" },
      { name: "k 超长", stdin: "3\n1 2 3\n5\n" },
      { name: "k 为 0", stdin: "3\n1 2 3\n0\n" },
    ],
  },

  "综合 2.3-08": {
    title: "求两个单链表的第一个公共结点",
    sig: "LNode *SearchCommon(LinkList L1, LinkList L2)",
    ret: "返回第一个公共结点的指针；两个链表没有公共结点时返回 NULL。",
    vars: [
      "L1、L2：两个带头结点的单链表，它们可以共享同一段后缀（Y 形）。",
      "len1、len2：两表长度；dist：长度之差。",
      "先让长表指针先走 dist 步对齐，再同步后移，第一次指针相等处就是公共结点。",
    ],
    io: "第一行 n1 n2 m，分别是两个表独立前缀的长度和共享后缀的长度；接下来依次是 n1 个前缀值、n2 个前缀值、m 个后缀值；输出公共结点的 data，没有公共结点输出 -1。",
    pre: LIST_PRE,
    post: `int main(void) {
    LinkList L1, L2;
    LNode *t1 = NULL, *t2 = NULL, *s = NULL, *st = NULL, *t, *p;
    int n1 = 0, n2 = 0, m = 0, i, v;
    if (scanf("%d %d %d", &n1, &n2, &m) != 3) return 0;
    L1 = (LinkList)malloc(sizeof(LNode));
    L1->data = 0;
    L1->next = NULL;
    t1 = L1;
    for (i = 0; i < n1; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        t1->next = t;
        t1 = t;
    }
    L2 = (LinkList)malloc(sizeof(LNode));
    L2->data = 0;
    L2->next = NULL;
    t2 = L2;
    for (i = 0; i < n2; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        t2->next = t;
        t2 = t;
    }
    for (i = 0; i < m; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = NULL;
        if (s == NULL) s = t;
        else st->next = t;
        st = t;
    }
    t1->next = s;
    t2->next = s;
    p = SearchCommon(L1, L2);
    printf("%d\\n", p == NULL ? -1 : p->data);
    return 0;
}`,
    std: `LNode *SearchCommon(LinkList L1, LinkList L2) {
    int len1 = 0, len2 = 0, d, i;
    LNode *p = L1->next, *q = L2->next;
    while (p != NULL) { ++len1; p = p->next; }
    while (q != NULL) { ++len2; q = q->next; }
    p = L1->next;
    q = L2->next;
    d = len1 - len2;
    if (d > 0) { for (i = 0; i < d; ++i) p = p->next; }
    else { for (i = 0; i < -d; ++i) q = q->next; }
    while (p != NULL && q != NULL && p != q) {
        p = p->next;
        q = q->next;
    }
    return p;
}`,
    cases: [
      { name: "Y 形", stdin: "3 5 4\n1 2 3\n7 8 9 10 11\n20 21 22 23\n" },
      { name: "无公共", stdin: "2 2 0\n1 2\n3 4\n" },
      { name: "完全相同", stdin: "0 0 3\n5 6 7\n" },
      { name: "等长前缀", stdin: "2 2 1\n1 2\n3 4\n9\n" },
    ],
  },

  "综合 2.3-17": {
    title: "判断循环双链表是否对称",
    sig: "int Symmetry(DLinkList L)",
    ret: "对称返回 1，不对称返回 0；空表和只有一个结点的表都算对称。",
    vars: [
      "L：带头结点的循环双链表，prior 指向前驱，next 指向后继，头结点的 prior 指向尾结点。",
      "p 从 L->next 出发向右走，q 从 L->prior 出发向左走，两者相遇或交叉即结束。",
      "跳出条件 p != q && q->next != p 同时覆盖奇数和偶数个结点两种情况。",
    ],
    io: "第一行 n，第二行 n 个整数；输出 1 或 0 表示是否对称。",
    pre: DLIST_PRE,
    post: `int main(void) {
    DLinkList L;
    DNode *t, *tail;
    int n = 0, i, v, r;
    if (scanf("%d", &n) != 1) return 0;
    L = (DLinkList)malloc(sizeof(DNode));
    L->data = 0;
    L->prior = L;
    L->next = L;
    tail = L;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (DNode *)malloc(sizeof(DNode));
        t->data = v;
        t->prior = tail;
        t->next = L;
        tail->next = t;
        L->prior = t;
        tail = t;
    }
    r = Symmetry(L);
    printf("%d\\n", r);
    return 0;
}`,
    std: `int Symmetry(DLinkList L) {
    DNode *p = L->next, *q = L->prior;
    while (p != q && q->next != p) {
        if (p->data == q->data) {
            p = p->next;
            q = q->prior;
        } else {
            return 0;
        }
    }
    return 1;
}`,
    cases: [
      { name: "奇数回文", stdin: "3\n1 2 1\n" },
      { name: "偶数回文", stdin: "4\n1 2 2 1\n" },
      { name: "不对称", stdin: "3\n1 2 3\n" },
      { name: "单结点", stdin: "1\n5\n" },
      { name: "空表", stdin: "0\n" },
    ],
  },

  "综合 2.3-18": {
    title: "把两个循环单链表首尾相接",
    sig: "LinkList Link(LinkList h1, LinkList h2)",
    ret: "返回拼接后的头指针（即 h1）。拼接后仍是一个带头结点的循环单链表。",
    vars: [
      "h1、h2：两个带头结点的循环单链表，尾结点的 next 指回头结点。",
      "p、q：分别找到两个表的尾结点。",
      "接法是：h1 尾指向 h2 的第一个数据结点，h2 尾指向 h1 的头结点，这样整条链依然循环。",
    ],
    io: "第一行 n1，第二行 n1 个整数；第三行 n2，第四行 n2 个整数；输出拼接后从头结点之后依次访问到的所有元素。",
    pre: LIST_PRE,
    post: `int main(void) {
    LinkList h1, h2, h;
    LNode *tail, *t, *p;
    int n1 = 0, n2 = 0, i, v;
    if (scanf("%d", &n1) != 1) return 0;
    h1 = (LinkList)malloc(sizeof(LNode));
    h1->data = 0;
    h1->next = h1;
    tail = h1;
    for (i = 0; i < n1; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = h1;
        tail->next = t;
        tail = t;
    }
    if (scanf("%d", &n2) != 1) return 0;
    h2 = (LinkList)malloc(sizeof(LNode));
    h2->data = 0;
    h2->next = h2;
    tail = h2;
    for (i = 0; i < n2; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (LNode *)malloc(sizeof(LNode));
        t->data = v;
        t->next = h2;
        tail->next = t;
        tail = t;
    }
    h = Link(h1, h2);
    for (p = h->next; p != h; p = p->next) printf("%d ", p->data);
    printf("\\n");
    return 0;
}`,
    std: `LinkList Link(LinkList h1, LinkList h2) {
    LNode *p = h1, *q = h2;
    while (p->next != h1) p = p->next;
    while (q->next != h2) q = q->next;
    if (h2->next == h2) {
        free(h2);
        return h1;
    }
    p->next = h2->next;
    q->next = h1;
    free(h2);
    return h1;
}`,
    cases: [
      { name: "两表非空", stdin: "3\n1 2 3\n2\n8 9\n" },
      { name: "h1 空", stdin: "0\n2\n8 9\n" },
      { name: "h2 空", stdin: "2\n1 2\n0\n" },
      { name: "各一个", stdin: "1\n4\n1\n6\n" },
    ],
  },

  "综合 3.1-04": {
    title: "判断单链表中的字符序列是否中心对称",
    sig: "int IsSymmetry(LinkList L, int n)",
    ret: "中心对称返回 1，否则返回 0；空串和单字符都算中心对称。",
    vars: [
      "L：带头结点的字符单链表，data 是 char 类型。",
      "n：字符个数，题目已给出，用来确定前一半进栈的个数。",
      "做法是前半段压栈，跳过中心结点（n 为奇数时），再把后半段与栈顶逐个比较。",
    ],
    io: "输入一行不含空格的字符串；输出 1 或 0 表示是否中心对称。",
    pre: CLIST_CHAR_PRE,
    post: `int main(void) {
    char buf[256];
    LinkList L;
    LNode *tail, *t;
    int n = 0, i, r;
    if (scanf("%255s", buf) != 1) return 0;
    n = (int)strlen(buf);
    L = (LinkList)malloc(sizeof(LNode));
    L->data = 0;
    L->next = NULL;
    tail = L;
    for (i = 0; i < n; ++i) {
        t = (LNode *)malloc(sizeof(LNode));
        t->data = buf[i];
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
    r = IsSymmetry(L, n);
    printf("%d\\n", r);
    return 0;
}`,
    std: `int IsSymmetry(LinkList L, int n) {
    char s[128];
    int i, top = 0;
    LNode *p = L->next;
    for (i = 0; i < n / 2; ++i) {
        s[top++] = p->data;
        p = p->next;
    }
    if (n % 2 == 1) p = p->next;
    while (p != NULL) {
        if (top == 0) return 0;
        if (s[--top] != p->data) return 0;
        p = p->next;
    }
    return top == 0 ? 1 : 0;
}`,
    cases: [
      { name: "xyx", stdin: "xyx\n" },
      { name: "xyyx", stdin: "xyyx\n" },
      { name: "abcba", stdin: "abcba\n" },
      { name: "abcd", stdin: "abcd\n" },
      { name: "ab", stdin: "ab\n" },
      { name: "单字符", stdin: "a\n" },
    ],
  },

  "综合 3.1-05": {
    title: "两栈共享存储空间的入栈与出栈",
    sig: "int push(int i, elemtp x) / int pop(int i, elemtp *x)",
    ret: "push 入栈成功返回 1，栈满返回 0；pop 出栈成功返回 1 并把栈顶值写入 *x，栈空返回 0。i 只允许 0 或 1。",
    vars: [
      "s：全局共享栈，s.stack[maxsize] 是存储区，s.top[0] 是左栈栈顶（从 -1 往上长），s.top[1] 是右栈栈顶（从 maxsize 往下长）。",
      "判满条件：s.top[1] - s.top[0] == 1，此时两个栈顶相邻，存储区已用尽。",
      "s 由 main 调用 InitShare() 初始化：top[0] = -1，top[1] = maxsize。",
    ],
    io: "第一行 m（操作条数）；随后 m 行，每行 `1 i x` 表示向第 i 个栈压入 x，`2 i` 表示从第 i 个栈弹出。每行输出一次操作结果。",
    pre: SHARESTK_PRE,
    post: `int main(void) {
    int m = 0, k, op, i, ok;
    elemtp x = 0;
    InitShare();
    if (scanf("%d", &m) != 1) return 0;
    for (k = 0; k < m; ++k) {
        if (scanf("%d", &op) != 1) return 0;
        if (op == 1) {
            if (scanf("%d %d", &i, &x) != 2) return 0;
            ok = push(i, x);
            printf("push %d -> %d\\n", i, ok);
        } else {
            if (scanf("%d", &i) != 1) return 0;
            ok = pop(i, &x);
            if (ok) printf("pop %d -> %d\\n", i, x);
            else printf("pop %d -> EMPTY\\n", i);
        }
    }
    return 0;
}`,
    std: `int push(int i, elemtp x) {
    if (i < 0 || i > 1) return 0;
    if (s.top[1] - s.top[0] == 1) return 0;
    if (i == 0) s.stack[++s.top[0]] = x;
    else s.stack[--s.top[1]] = x;
    return 1;
}

int pop(int i, elemtp *x) {
    if (i < 0 || i > 1) return 0;
    if (i == 0) {
        if (s.top[0] == -1) return 0;
        *x = s.stack[s.top[0]--];
    } else {
        if (s.top[1] == maxsize) return 0;
        *x = s.stack[s.top[1]++];
    }
    return 1;
}`,
    cases: [
      { name: "交替进出", stdin: "6\n1 0 5\n1 1 7\n2 0\n2 1\n2 0\n2 1\n" },
      { name: "空栈出栈", stdin: "3\n2 0\n2 1\n1 1 3\n" },
      { name: "非法栈号", stdin: "2\n1 2 9\n2 5\n" },
      { name: "同侧连续压入", stdin: "5\n1 0 1\n1 0 2\n1 0 3\n2 0\n2 0\n" },
    ],
  },

  "综合 3.2-01": {
    title: "带 tag 的循环队列入队出队",
    sig: "int EnQueue1(SqQueue *Q, ElemType x) / int DeQueue1(SqQueue *Q, ElemType *x)",
    ret: "EnQueue1 入队成功返回 1，队满返回 0；DeQueue1 出队成功返回 1 并把值写入 *x，队空返回 0。",
    vars: [
      "Q->front 指向队头元素，Q->rear 指向队尾元素的下一个空位，MaxSize 为 10。",
      "Q->tag：最近一次操作若是入队置 1，若是出队置 0，用来区分 front == rear 时到底是空还是满。",
      "队满条件：front == rear && tag == 1；队空条件：front == rear && tag == 0。",
    ],
    io: "第一行 m（操作条数）；随后 m 行，`1 x` 表示入队，`2` 表示出队。每行输出一次操作结果。",
    pre: TAGQ_PRE,
    post: `int main(void) {
    SqQueue Q;
    int m = 0, k, op, ok;
    ElemType x = 0;
    InitQueue1(&Q);
    if (scanf("%d", &m) != 1) return 0;
    for (k = 0; k < m; ++k) {
        if (scanf("%d", &op) != 1) return 0;
        if (op == 1) {
            if (scanf("%d", &x) != 1) return 0;
            ok = EnQueue1(&Q, x);
            printf("enqueue %d -> %d\\n", x, ok);
        } else {
            ok = DeQueue1(&Q, &x);
            if (ok) printf("dequeue -> %d\\n", x);
            else printf("dequeue -> EMPTY\\n");
        }
    }
    return 0;
}`,
    std: `int EnQueue1(SqQueue *Q, ElemType x) {
    if (Q->front == Q->rear && Q->tag == 1) return 0;
    Q->data[Q->rear] = x;
    Q->rear = (Q->rear + 1) % MaxSize;
    Q->tag = 1;
    return 1;
}

int DeQueue1(SqQueue *Q, ElemType *x) {
    if (Q->front == Q->rear && Q->tag == 0) return 0;
    *x = Q->data[Q->front];
    Q->front = (Q->front + 1) % MaxSize;
    Q->tag = 0;
    return 1;
}`,
    cases: [
      { name: "基本进出", stdin: "5\n1 10\n1 20\n2\n2\n2\n" },
      { name: "装满再入队", stdin: "12\n1 1\n1 2\n1 3\n1 4\n1 5\n1 6\n1 7\n1 8\n1 9\n1 10\n1 11\n2\n" },
      { name: "空队出队", stdin: "2\n2\n1 5\n" },
    ],
  },

  "综合 3.2-02": {
    title: "用栈把队列中的元素逆置",
    sig: "void Inverser(Stack *S, Queue *Q)",
    ret: "无返回值。函数结束时队列 Q 里的元素顺序应当变成原来的逆序，栈 S 用完后为空。",
    vars: [
      "Q：队列，front 指向队头，rear 指向队尾后一位，EnQueue/DeQueue 已在骨架里给出。",
      "S：空栈，Push/Pop 已在骨架里给出。",
      "做法是元素全部出队压栈，再全部出栈入队，两次搬运就完成逆置。",
    ],
    io: "第一行 n，第二行 n 个整数；输出逆置后依次出队的元素序列。",
    pre: STKQUE_PRE,
    post: `int main(void) {
    Stack S;
    Queue Q;
    int n = 0, i;
    ElemType v = 0;
    InitStack(&S);
    InitQueue(&Q);
    if (scanf("%d", &n) != 1) return 0;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        EnQueue(&Q, v);
    }
    Inverser(&S, &Q);
    while (!QueueEmpty(&Q)) {
        DeQueue(&Q, &v);
        printf("%d ", v);
    }
    printf("\\n");
    return 0;
}`,
    std: `void Inverser(Stack *S, Queue *Q) {
    ElemType x;
    while (!QueueEmpty(Q)) {
        DeQueue(Q, &x);
        Push(S, x);
    }
    while (!StackEmpty(S)) {
        Pop(S, &x);
        EnQueue(Q, x);
    }
}`,
    cases: [
      { name: "五个元素", stdin: "5\n1 2 3 4 5\n" },
      { name: "单元素", stdin: "1\n42\n" },
      { name: "空队列", stdin: "0\n" },
      { name: "含负数", stdin: "4\n-3 0 7 -9\n" },
    ],
  },

  "综合 3.2-03": {
    title: "用两个栈模拟队列",
    sig: "int EnQueue(Stack *S1, Stack *S2, ElemType e) / int DeQueue(Stack *S1, Stack *S2, ElemType *x) / int QueueEmpty(Stack *S1, Stack *S2)",
    ret: "EnQueue 成功返回 1，失败返回 0（S1 已满而 S2 里还压着元素时必须失败）；DeQueue 成功返回 1 并把出队值写入 *x，队空返回 0；QueueEmpty 两栈都空时返回 1。",
    vars: [
      "S1：入队栈，新元素一律压到这里。",
      "S2：出队栈，只有在 S2 空时才把 S1 全部倒过来，保证出队顺序仍是先进先出。",
      "StackOverflow(S) 判断栈满，MAXS 为 50。",
    ],
    io: "第一行 m（操作条数）；随后 m 行，`1 x` 为入队，`2` 为出队。每行输出一次结果。",
    pre: STKS_PRE,
    post: `int main(void) {
    Stack S1, S2;
    int m = 0, k, op, ok;
    ElemType x = 0;
    InitStack(&S1);
    InitStack(&S2);
    if (scanf("%d", &m) != 1) return 0;
    for (k = 0; k < m; ++k) {
        if (scanf("%d", &op) != 1) return 0;
        if (op == 1) {
            if (scanf("%d", &x) != 1) return 0;
            ok = EnQueue(&S1, &S2, x);
            printf("enqueue %d -> %d\\n", x, ok);
        } else {
            ok = DeQueue(&S1, &S2, &x);
            if (ok) printf("dequeue -> %d\\n", x);
            else printf("dequeue -> EMPTY\\n");
        }
    }
    printf("empty -> %d\\n", QueueEmpty(&S1, &S2));
    return 0;
}`,
    std: `int EnQueue(Stack *S1, Stack *S2, ElemType e) {
    ElemType y;
    if (!StackOverflow(S1)) {
        Push(S1, e);
        return 1;
    }
    if (!StackEmpty(S2)) return 0;
    while (!StackEmpty(S1)) {
        Pop(S1, &y);
        Push(S2, y);
    }
    Push(S1, e);
    return 1;
}

int DeQueue(Stack *S1, Stack *S2, ElemType *x) {
    ElemType y;
    if (!StackEmpty(S2)) {
        Pop(S2, x);
        return 1;
    }
    if (StackEmpty(S1)) return 0;
    while (!StackEmpty(S1)) {
        Pop(S1, &y);
        Push(S2, y);
    }
    Pop(S2, x);
    return 1;
}

int QueueEmpty(Stack *S1, Stack *S2) {
    return StackEmpty(S1) && StackEmpty(S2);
}`,
    cases: [
      { name: "穿插进出", stdin: "5\n1 10\n1 20\n2\n1 30\n2\n" },
      { name: "空队列出队", stdin: "2\n2\n1 5\n" },
      { name: "先入三个再一次出", stdin: "5\n1 1\n1 2\n1 3\n2\n2\n" },
      { name: "全部出空", stdin: "4\n1 7\n2\n2\n1 9\n" },
    ],
  },

  "综合 3.2-04": {
    title: "出队空间可复用的链式队列",
    sig: "int EnQueue2(LinkQueue *Q, ElemType x) / int DeQueue2(LinkQueue *Q, ElemType *x)",
    ret: "EnQueue2 入队成功返回 1，DeQueue2 出队成功返回 1 并把值写入 *x，队空时返回 0。",
    vars: [
      "Q->front：指向队头结点（带头结点时即为头结点）；Q->rear：指向队尾结点。",
      "QueueEmpty2 由骨架提供，判据是 front == rear。",
      "入队只新建一个结点接到 rear 后面，出队释放（或回收）一个结点，两步都是 O(1)。",
    ],
    io: "第一行 m（操作条数）；随后 m 行，`1 x` 为入队，`2` 为出队。每行输出一次结果。",
    pre: LQUEUE_PRE,
    post: `int main(void) {
    LinkQueue Q;
    int m = 0, k, op, ok;
    ElemType x = 0;
    InitQueue2(&Q);
    if (scanf("%d", &m) != 1) return 0;
    for (k = 0; k < m; ++k) {
        if (scanf("%d", &op) != 1) return 0;
        if (op == 1) {
            if (scanf("%d", &x) != 1) return 0;
            ok = EnQueue2(&Q, x);
            printf("enqueue %d -> %d\\n", x, ok);
        } else {
            ok = DeQueue2(&Q, &x);
            if (ok) printf("dequeue -> %d\\n", x);
            else printf("dequeue -> EMPTY\\n");
        }
    }
    printf("empty -> %d\\n", QueueEmpty2(&Q));
    return 0;
}`,
    std: `int EnQueue2(LinkQueue *Q, ElemType x) {
    LNode *p = (LNode *)malloc(sizeof(LNode));
    if (p == NULL) return 0;
    p->data = x;
    p->next = NULL;
    Q->rear->next = p;
    Q->rear = p;
    return 1;
}

int DeQueue2(LinkQueue *Q, ElemType *x) {
    LNode *p;
    if (Q->front == Q->rear) return 0;
    p = Q->front->next;
    *x = p->data;
    Q->front->next = p->next;
    if (Q->rear == p) Q->rear = Q->front;
    free(p);
    return 1;
}`,
    cases: [
      { name: "基本进出", stdin: "4\n1 1\n1 2\n2\n2\n" },
      { name: "空队出队", stdin: "2\n2\n1 8\n" },
      { name: "边进边出", stdin: "6\n1 5\n2\n1 6\n2\n1 7\n2\n" },
      { name: "连续出空", stdin: "5\n1 3\n1 4\n2\n2\n2\n" },
    ],
  },

  "综合 3.3-02": {
    title: "火车车厢调度（软座排在硬座之前）",
    sig: "void Train_Arrange(char *train)",
    ret: "无返回值。函数直接在原字符串上改写，结束时所有 S（软座）排在前面，所有 H（硬座）排在后面，长度不变。",
    vars: [
      "train：以 \\0 结尾的字符串，只含字符 H（硬座）和 S（软座）。",
      "p：读指针，向后扫描原串；q：写指针，指向下一个要写入的位置。",
      "用栈暂存遇到的 H，扫描完再把栈里的 H 依次接到尾部，正好实现两类车厢分离。",
    ],
    io: "输入一行只含 H 和 S 的字符串；输出调度后的字符串。",
    pre: STR_PRE,
    post: `int main(void) {
    char s[256];
    if (scanf("%255s", s) != 1) return 0;
    Train_Arrange(s);
    printf("%s\\n", s);
    return 0;
}`,
    std: `void Train_Arrange(char *train) {
    char stack[256];
    int top = 0;
    char *p = train, *q = train;
    while (*p) {
        if (*p == 'H') stack[top++] = *p;
        else *q++ = *p;
        ++p;
    }
    while (top > 0) *q++ = stack[--top];
    *q = '\\0';
}`,
    cases: [
      { name: "交替", stdin: "HSHSHS\n" },
      { name: "混合", stdin: "SHHSS\n" },
      { name: "全硬座", stdin: "HHHH\n" },
      { name: "全软座", stdin: "SSS\n" },
    ],
  },

  "综合 3.3-03": {
    title: "非递归计算 Pn(x)",
    sig: "double Pn(int n, double x)",
    ret: "返回 Pn(x) 的值。n = 0 时为 1，n = 1 时为 2x，n > 1 时为 2x·P(n-1) - 2(n-1)·P(n-2)。",
    vars: [
      "n：递归阶数，n >= 0。",
      "x：自变量，用 double。",
      "fv1 保存 P(i-2)，fv2 保存 P(i-1)，从 i = 2 递推到 n 就能把递归改成循环。",
    ],
    io: "输入一行 `n x`；输出保留 4 位小数的结果。",
    pre: ARR_PRE,
    post: `int main(void) {
    int n = 0;
    double x = 0.0;
    if (scanf("%d %lf", &n, &x) != 2) return 0;
    printf("%.4f\\n", Pn(n, x));
    return 0;
}`,
    std: `double Pn(int n, double x) {
    double fv1 = 1.0, fv2 = 2.0 * x, f;
    int i;
    if (n == 0) return fv1;
    for (i = 2; i <= n; ++i) {
        f = 2.0 * x * fv2 - 2.0 * (i - 1) * fv1;
        fv1 = fv2;
        fv2 = f;
    }
    return fv2;
}`,
    cases: [
      { name: "n=0", stdin: "0 1.5\n" },
      { name: "n=1", stdin: "1 1.5\n" },
      { name: "n=2", stdin: "2 2.0\n" },
      { name: "n=3", stdin: "3 1.0\n" },
      { name: "n=5", stdin: "5 0.5\n" },
    ],
  },

  "综合 5.1-03": {
    title: "由各度数的结点个数求叶结点数",
    sig: "int CountLeafNum(int n[], int m)",
    ret: "返回叶结点个数 n0 = 1 + Σ(i-1)·ni（i 从 1 到 m）。",
    vars: [
      "n[i]：度为 i 的结点个数，i 取值 1..m，n[0] 不使用。",
      "m：树中出现的最大度数。",
      "依据是树的度数总和 = 结点数 - 1，即 Σ i·ni = n0 + Σ ni - 1。",
    ],
    io: "第一行 m，第二行 m 个整数依次是 n1,n2,…,nm；输出叶结点个数。",
    pre: ARR_PRE,
    post: `int main(void) {
    int n[MAXN], m = 0, i;
    if (scanf("%d", &m) != 1) return 0;
    if (m > MAXN - 1) m = MAXN - 1;
    for (i = 1; i <= m; ++i) {
        if (scanf("%d", &n[i]) != 1) return 0;
    }
    printf("%d\\n", CountLeafNum(n, m));
    return 0;
}`,
    std: `int CountLeafNum(int n[], int m) {
    int i, s = 1;
    for (i = 2; i <= m; ++i) s += (i - 1) * n[i];
    return s;
}`,
    cases: [
      { name: "三个各 1", stdin: "3\n1 1 1\n" },
      { name: "度数 1、2 各 1", stdin: "2\n1 1\n" },
      { name: "单结点树", stdin: "1\n0\n" },
      { name: "四层各 1", stdin: "4\n1 1 1 1\n" },
      { name: "3 个一度 2 个二度", stdin: "2\n3 2\n" },
    ],
  },

  "综合 5.3-03": {
    title: "后序遍历二叉树的非递归算法",
    sig: "void PostOrder(BiTree T)",
    ret: "无返回值。按后序（左、右、根）顺序把每个结点的 data 打印出来，直接连成一行。",
    vars: [
      "T：二叉链表存储的二叉树，空树用 # 输入，结点 data 为 char。",
      "st：辅助栈，按先左后右的方式入栈。",
      "r：记录上一个被访问的结点，用来判断右子树是否已经处理完，避免重复进入右子树。",
    ],
    io: "输入一行扩展先序遍历序列（# 表示空结点，如 ABD##E##C#F##）；输出后序序列。",
    pre: TREE_PRE,
    post: `int main(void) {
    BiTree T = BuildTree();
    PostOrder(T);
    printf("\\n");
    return 0;
}`,
    std: `void PostOrder(BiTree T) {
    BiTree st[128], p = T, r = NULL;
    int top = 0;
    while (p != NULL || top > 0) {
        if (p != NULL) {
            st[top++] = p;
            p = p->lchild;
        } else {
            p = st[top - 1];
            if (p->rchild != NULL && p->rchild != r) {
                p = p->rchild;
            } else {
                --top;
                printf("%c", p->data);
                r = p;
                p = NULL;
            }
        }
    }
}`,
    cases: [
      { name: "常规树", stdin: "ABD##E##C#F##\n" },
      { name: "单结点", stdin: "A##\n" },
      { name: "左斜", stdin: "ABC####\n" },
      { name: "空树", stdin: "#\n" },
    ],
  },

  "综合 5.3-06": {
    title: "由先序和中序序列建立二叉树",
    sig: "BiTree BuildFromPreIn(char A[], char B[], int n)",
    ret: "返回建好的二叉树根指针；n 为 0 时返回 NULL。",
    vars: [
      "A：先序遍历序列，长度 n。",
      "B：中序遍历序列，长度 n，结点值互不相同。",
      "A[0] 是根，在 B 中找到它的位置就能把左右子树的中序段分开，再按长度切分先序段递归建树。",
    ],
    io: "输入两行，第一行先序序列，第二行中序序列；输出建好的树重新先序遍历的结果。",
    pre: TREE_PRE,
    post: `int main(void) {
    char A[128], B[128];
    BiTree T;
    int n = 0;
    if (scanf("%127s %127s", A, B) != 2) return 0;
    while (A[n] != '\\0') ++n;
    T = BuildFromPreIn(A, B, n);
    PrintPre(T);
    printf("\\n");
    return 0;
}`,
    std: `static BiTree buildSeg(char *pre, char *in, int pl, int pr, int il, int ir) {
    int i, k;
    BiTree root;
    if (pl > pr) return NULL;
    root = (BiTree)malloc(sizeof(BiTNode));
    root->data = pre[pl];
    for (i = il; i <= ir; ++i) {
        if (in[i] == pre[pl]) break;
    }
    k = i - il;
    root->lchild = buildSeg(pre, in, pl + 1, pl + k, il, i - 1);
    root->rchild = buildSeg(pre, in, pl + k + 1, pr, i + 1, ir);
    return root;
}

BiTree BuildFromPreIn(char A[], char B[], int n) {
    return buildSeg(A, B, 0, n - 1, 0, n - 1);
}`,
    cases: [
      { name: "七结点", stdin: "ABDECFG DBEAFCG\n" },
      { name: "单结点", stdin: "A A\n" },
      { name: "右斜", stdin: "ABCD BCDA\n" },
      { name: "左斜", stdin: "ABCD DCBA\n" },
    ],
  },

  "综合 5.3-16": {
    title: "把叶结点按从左到右串成单链表",
    sig: "BiTree LinkLeaf(BiTree T)",
    ret: "返回第一个叶结点的指针，也就是链表头；没有叶结点时返回 NULL。所有叶结点用 rchild 指针相连，最后一个的 rchild 置 NULL。",
    vars: [
      "T：二叉链表存储的二叉树。",
      "pre：中序遍历时指向上一个被链入的叶结点。",
      "中序遍历保证叶结点按从左到右的顺序被串起来，左孩子的叶先于右孩子的叶。",
    ],
    io: "输入一行扩展先序序列；输出叶结点链表从前到后的 data 序列。",
    pre: TREE_PRE,
    post: `int main(void) {
    BiTree T = BuildTree(), head, p;
    head = LinkLeaf(T);
    for (p = head; p != NULL; p = p->rchild) printf("%c", p->data);
    printf("\\n");
    return 0;
}`,
    std: `static BiTree head = NULL, preL = NULL;

static void inorderLink(BiTree bt) {
    if (bt == NULL) return;
    inorderLink(bt->lchild);
    if (bt->lchild == NULL && bt->rchild == NULL) {
        if (preL == NULL) {
            head = bt;
            preL = bt;
        } else {
            preL->rchild = bt;
            preL = bt;
        }
    }
    inorderLink(bt->rchild);
}

BiTree LinkLeaf(BiTree T) {
    head = NULL;
    preL = NULL;
    inorderLink(T);
    if (preL != NULL) preL->rchild = NULL;
    return head;
}`,
    cases: [
      { name: "常规树", stdin: "ABD##E##C#F##\n" },
      { name: "单结点", stdin: "A##\n" },
      { name: "空树", stdin: "#\n" },
      { name: "满树", stdin: "AB##C##\n" },
    ],
  },

  "综合 5.3-20": {
    title: "表达式树转等价中缀表达式",
    sig: "void BtreeToE(BTree *root)",
    ret: "无返回值。把表达式树输出成中缀表达式，用括号表达运算次序，根表达式外层不加括号，而每个子表达式都要加一层括号。",
    vars: [
      "root：表达式树根，叶结点是操作数，内部结点是运算符。",
      "deep：当前结点的层数，根为 1；deep>1 说明它是某个运算符的子表达式，输出时要括起来。",
      "左子树、根运算符、右子树依次输出即为中缀形式。",
    ],
    io: "输入一行后缀表达式（操作数用单个小写字母，运算符为 + - * /）；输出对应的中缀表达式（子表达式带括号）。",
    pre: EXPR_PRE,
    post: `int main(void) {
    char s[128];
    BTree *root;
    if (scanf("%127s", s) != 1) return 0;
    root = PostBuildExpr(s);
    BtreeToE(root);
    printf("\\n");
    return 0;
}`,
    std: `void BtreeToExp(BTree *root, int deep) {
    if (root == NULL) return;
    if (root->left == NULL && root->right == NULL) {
        printf("%c", root->data);
        return;
    }
    if (deep > 1) printf("(");
    BtreeToExp(root->left, deep + 1);
    printf("%c", root->data);
    BtreeToExp(root->right, deep + 1);
    if (deep > 1) printf(")");
}

void BtreeToE(BTree *root) {
    BtreeToExp(root, 1);
}`,
    cases: [
      { name: "加后乘", stdin: "ab+c*\n" },
      { name: "a*b+(c-d)", stdin: "ab*cd-+\n" },
      { name: "单个加号", stdin: "ab+\n" },
      { name: "单操作数", stdin: "a\n" },
      { name: "两层乘加", stdin: "ab*cd*+\n" },
    ],
  },

  "综合 5.3-13": {
    title: "求二叉树中两个结点的最近公共祖先",
    sig: "BiTree Ancestor(BiTree ROOT, BiTree p, BiTree q)",
    ret: "返回 p 和 q 的最近公共祖先结点指针；如果两个结点不在同一棵树里，返回 NULL。",
    vars: [
      "ROOT：二叉树根指针。",
      "p、q：指向树中两个结点的指针，结点的值互不相同。",
      "递归思路：某结点为 p 或 q 时直接返回它；左右子树分别递归，若两边都有返回值，当前结点就是答案。",
    ],
    io: "第一行扩展先序序列，第二行两个结点值；输出最近公共祖先的 data，无公共祖先输出 -1。",
    pre: TREE_PRE,
    post: `static BiTree findNode(BiTree t, char c) {
    BiTree r;
    if (t == NULL) return NULL;
    if (t->data == c) return t;
    r = findNode(t->lchild, c);
    if (r != NULL) return r;
    return findNode(t->rchild, c);
}

int main(void) {
    BiTree T, p, q, r;
    char a = 0, b = 0;
    T = BuildTree();
    if (scanf(" %c %c", &a, &b) != 2) return 0;
    p = findNode(T, a);
    q = findNode(T, b);
    r = Ancestor(T, p, q);
    printf("%c\\n", r == NULL ? '-' : r->data);
    return 0;
}`,
    std: `BiTree Ancestor(BiTree ROOT, BiTree p, BiTree q) {
    BiTree l, r;
    if (ROOT == NULL) return NULL;
    if (ROOT == p || ROOT == q) return ROOT;
    l = Ancestor(ROOT->lchild, p, q);
    r = Ancestor(ROOT->rchild, p, q);
    if (l != NULL && r != NULL) return ROOT;
    return l != NULL ? l : r;
}`,
    cases: [
      { name: "同侧", stdin: "ABD##E##C#F##\nD E\n" },
      { name: "异侧", stdin: "ABD##E##C#F##\nD F\n" },
      { name: "根即祖先", stdin: "AB##C##\nB C\n" },
      { name: "结点自己是祖先", stdin: "AB##C##\nA B\n" },
    ],
  },

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

  "综合 2.2-09": {
    title: "有序顺序表中查找 x 并交换或插入",
    sig: "void SearchExchangeInsert(SqList *L, ElemType x)",
    ret: "无返回值。找到 x 时把它与后继交换（x 已在最后一个位置就不动）；找不到时把 x 插入到保持递增有序的位置，L->length 加 1。",
    vars: [
      "low、high：折半查找的上下界，mid 为当前中点。",
      "找到的判断是 A[mid] == x，退出循环后 low > high 说明没找到。",
      "插入时把 high+1 及其后的元素整体后移一位，再把 x 放到 high+1 处。",
    ],
    io: "第一行 n，第二行 n 个递增整数，第三行 x；输出第一行新表长，第二行结果序列。",
    pre: SQLIST_PRE,
    post: `int main(void) {
    SqList L;
    int n = 0, i;
    ElemType x = 0;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAXSIZE - 1) n = MAXSIZE - 1;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &L.data[i]) != 1) return 0;
    }
    L.length = n;
    if (scanf("%d", &x) != 1) return 0;
    SearchExchangeInsert(&L, x);
${printSqList()}`,
    std: `void SearchExchangeInsert(SqList *L, ElemType x) {
    int low = 0, high = L->length - 1, mid = 0, i;
    ElemType t;
    while (low <= high) {
        mid = (low + high) / 2;
        if (L->data[mid] == x) break;
        else if (L->data[mid] < x) low = mid + 1;
        else high = mid - 1;
    }
    if (low <= high && mid != L->length - 1) {
        t = L->data[mid];
        L->data[mid] = L->data[mid + 1];
        L->data[mid + 1] = t;
    }
    if (low > high) {
        for (i = L->length - 1; i > high; --i) L->data[i + 1] = L->data[i];
        L->data[high + 1] = x;
        L->length++;
    }
}`,
    cases: [
      { name: "找到中间", stdin: "7\n1 3 5 7 9 11 13\n7\n" },
      { name: "找到末尾", stdin: "5\n1 3 5 7 9\n9\n" },
      { name: "找不到插中间", stdin: "6\n1 3 5 9 11 13\n7\n" },
      { name: "插到表头", stdin: "4\n5 8 12 20\n2\n" },
      { name: "空表插入", stdin: "0\n6\n" },
    ],
  },

  "综合 2.2-14": {
    title: "三个升序集合中三元组的最小距离",
    sig: "int MinDistance(int A[], int n, int B[], int m, int C[], int p)",
    ret: "返回所有三元组 (a,b,c) 中 |a-b| + |b-c| + |c-a| 的最小值。",
    vars: [
      "A、B、C：三个非空升序数组，长度分别是 n、m、p。",
      "i、j、k：三个数组上的游标，每轮算出当前三元组的 D。",
      "每轮把当前三个数中最小的那个指针前移一位，这样 D 只会越来越小，O(n+m+p) 就能收敛。",
    ],
    io: "第一行 n m p；随后三行分别是 A、B、C 的元素；输出最小距离。",
    pre: ARR_PRE,
    post: `int main(void) {
    int A[MAXN], B[MAXN], C[MAXN];
    int n = 0, m = 0, p = 0, i;
    if (scanf("%d %d %d", &n, &m, &p) != 3) return 0;
    for (i = 0; i < n; ++i) if (scanf("%d", &A[i]) != 1) return 0;
    for (i = 0; i < m; ++i) if (scanf("%d", &B[i]) != 1) return 0;
    for (i = 0; i < p; ++i) if (scanf("%d", &C[i]) != 1) return 0;
    printf("%d\\n", MinDistance(A, n, B, m, C, p));
    return 0;
}`,
    std: `static int iabs(int a) { return a < 0 ? -a : a; }

int MinDistance(int A[], int n, int B[], int m, int C[], int p) {
    int i = 0, j = 0, k = 0, d, best = 2147483647;
    while (i < n && j < m && k < p && best > 0) {
        d = iabs(A[i] - B[j]) + iabs(B[j] - C[k]) + iabs(C[k] - A[i]);
        if (d < best) best = d;
        if (A[i] <= B[j] && A[i] <= C[k]) ++i;
        else if (B[j] <= C[k] && B[j] <= A[i]) ++j;
        else ++k;
    }
    return best;
}`,
    cases: [
      { name: "教材样例", stdin: "3 4 5\n-1 0 9\n-25 -10 10 11\n2 9 17 30 41\n" },
      { name: "有公共值", stdin: "3 3 3\n1 5 9\n5 8 12\n4 5 20\n" },
      { name: "各一个", stdin: "1 1 1\n1\n10\n5\n" },
      { name: "全相同", stdin: "2 2 2\n7 7\n7 7\n7 7\n" },
    ],
  },

  "综合 2.3-23": {
    title: "求两个单词链表共同后缀的起始位置",
    sig: "LNode *FindSuffix(LNode *str1, LNode *str2)",
    ret: "返回共同后缀第一个字符所在结点的指针；没有共同后缀返回 NULL。",
    vars: [
      "str1、str2：两个带头结点的字符单链表，头结点的 data 无意义，字符从 next 开始。",
      "两表长度可能不同，先让长表指针走掉长度差，再同步后移找第一个相同结点。",
      "时间复杂度 O(m+n)，只用了常数个指针。",
    ],
    io: "输入三行：str1 的前缀部分、str2 的前缀部分、共同后缀（三行都不含空格，可以为空行）。三行拼起来构成两个完整单词。输出共同后缀第一个字符，不存在输出 -1。",
    pre: CLIST_CHAR_PRE,
    post: `static void appendStr(LinkList head, const char *s) {
    LNode *tail = head, *t;
    int i;
    for (i = 0; s[i] != '\\0'; ++i) {
        t = (LNode *)malloc(sizeof(LNode));
        t->data = s[i];
        t->next = NULL;
        tail->next = t;
        tail = t;
    }
}

int main(void) {
    char p1[128], p2[128], suf[128];
    LinkList s1, s2;
    LNode *r;
    if (scanf("%127s", p1) != 1) return 0;
    if (scanf("%127s", p2) != 1) return 0;
    if (scanf("%127s", suf) != 1) return 0;
    s1 = (LinkList)malloc(sizeof(LNode));
    s1->data = 0;
    s1->next = NULL;
    s2 = (LinkList)malloc(sizeof(LNode));
    s2->data = 0;
    s2->next = NULL;
    appendStr(s1, p1);
    appendStr(s2, p2);
    if (suf[0] != '-') {
        LNode *a = s1, *b = s2, *first = NULL, *last = NULL, *t;
        int i;
        while (a->next != NULL) a = a->next;
        while (b->next != NULL) b = b->next;
        for (i = 0; suf[i] != '\\0'; ++i) {
            t = (LNode *)malloc(sizeof(LNode));
            t->data = suf[i];
            t->next = NULL;
            if (first == NULL) first = t;
            else last->next = t;
            last = t;
        }
        a->next = first;
        b->next = first;
    }
    r = FindSuffix(s1, s2);
    printf("%c\\n", r == NULL ? '-' : r->data);
    return 0;
}`,
    std: `static int strLen(LNode *h) {
    int n = 0;
    LNode *p = h->next;
    while (p != NULL) {
        ++n;
        p = p->next;
    }
    return n;
}

LNode *FindSuffix(LNode *str1, LNode *str2) {
    int m = strLen(str1), n = strLen(str2);
    LNode *p = str1->next, *q = str2->next;
    for (; m > n; --m) p = p->next;
    for (; n > m; --n) q = q->next;
    while (p != NULL && q != NULL && p != q) {
        p = p->next;
        q = q->next;
    }
    return p;
}`,
    cases: [
      { name: "loading / being", stdin: "load\nbe\ning\n" },
      { name: "无共享", stdin: "abc\nxyz\n-\n" },
      { name: "整串相同", stdin: "-\n-\nabc\n" },
      { name: "只剩一个字符", stdin: "ab\nabc\na\n" },
    ],
  },

  "综合 2.3-20": {
    title: "按访问频度调整的双向链表 Locate",
    sig: "DNode *Locate(DLinkList L, ElemType x)",
    ret: "找到值为 x 的结点后把它频度加 1，并按频度非增（相同频度时最近访问的靠前）重新定位，最后返回该结点指针；找不到返回 NULL。",
    vars: [
      "L：带头结点的双向循环链表，结点含 prior、data、next、freq 四个域，freq 初值为 0。",
      "p：工作指针，沿着 next 找 x。",
      "q：从 p 的前驱往前找插入位置，条件 q->freq <= p->freq 时继续前移，停下后 p 插到 q 后面。",
    ],
    io: "第一行 n，第二行 n 个整数建表；第三行 m，第四行 m 个查询值；每次查询输出一行结果，最后一行输出整表（值:频度）。",
    pre: DLIST_FREQ_PRE,
    post: `int main(void) {
    DLinkList L;
    DNode *t, *tail, *p;
    int n = 0, i, v, m = 0;
    if (scanf("%d", &n) != 1) return 0;
    L = (DLinkList)malloc(sizeof(DNode));
    L->data = 0;
    L->freq = 0;
    L->prior = L;
    L->next = L;
    tail = L;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        t = (DNode *)malloc(sizeof(DNode));
        t->data = v;
        t->freq = 0;
        t->prior = tail;
        t->next = L;
        tail->next = t;
        L->prior = t;
        tail = t;
    }
    if (scanf("%d", &m) != 1) return 0;
    for (i = 0; i < m; ++i) {
        if (scanf("%d", &v) != 1) return 0;
        p = Locate(L, v);
        if (p == NULL) printf("query %d -> MISS\\n", v);
        else printf("query %d -> %d\\n", v, p->data);
    }
    printf("list:");
    for (p = L->next; p != L; p = p->next) printf(" %d:%d", p->data, p->freq);
    printf("\\n");
    return 0;
}`,
    std: `DNode *Locate(DLinkList L, ElemType x) {
    DNode *p = L->next, *q;
    while (p != L && p->data != x) p = p->next;
    if (p == L) return NULL;
    p->freq++;
    if (p->prior == L) return p;
    if (p->prior->freq > p->freq) return p;
    q = p->prior;
    while (q != L && q->freq <= p->freq) q = q->prior;
    p->prior->next = p->next;
    p->next->prior = p->prior;
    p->next = q->next;
    p->next->prior = p;
    p->prior = q;
    q->next = p;
    return p;
}`,
    cases: [
      { name: "一次访问", stdin: "4\n1 2 3 4\n1\n3\n" },
      { name: "多次访问", stdin: "4\n1 2 3 4\n3\n3 4 3\n" },
      { name: "访问表头", stdin: "3\n5 6 7\n2\n5 5\n" },
      { name: "访问不存在", stdin: "3\n1 2 3\n2\n9 1\n" },
    ],
  },

  "综合 3.3-04": {
    title: "汽车轮渡口调度模拟",
    sig: "void manager(int n1, int n2)",
    ret: "无返回值。按调度规则把车依次放上渡船，直接打印每辆车的编号，一行最多 10 辆。",
    vars: [
      "n1：等待的客车数，编号依次是 C1、C2、……；n2：等待的货车数，编号依次是 F1、F2、……。",
      "i：当前已经连续上船的客车数；j：渡船上已有的车辆总数，上限 10。",
      "规则是每上 4 辆客车才放 1 辆货车；客车不足 4 辆时用货车顶替，某一类车空了就把另一类车全部放上去。",
    ],
    io: "输入一行 `n1 n2`；输出上船顺序，每辆车后跟一个空格，最多 10 辆。",
    pre: ARR_PRE,
    post: `int main(void) {
    int n1 = 0, n2 = 0;
    if (scanf("%d %d", &n1, &n2) != 2) return 0;
    manager(n1, n2);
    printf("\\n");
    return 0;
}`,
    std: `void manager(int n1, int n2) {
    int c = 1, f = 1, i = 0, j = 0;
    while (j < 10) {
        if (c <= n1 && i < 4) {
            printf("C%d ", c);
            ++c;
            ++i;
            ++j;
        } else if (i >= 4 && f <= n2) {
            printf("F%d ", f);
            ++f;
            i = 0;
            ++j;
        } else if (f <= n2) {
            printf("F%d ", f);
            ++f;
            ++i;
            if (i >= 4) i = 0;
            ++j;
        } else if (c <= n1) {
            printf("C%d ", c);
            ++c;
            ++i;
            ++j;
        } else {
            break;
        }
    }
}`,
    cases: [
      { name: "客车 6 货车 5", stdin: "6 5\n" },
      { name: "客车 2 货车 8", stdin: "2 8\n" },
      { name: "全是客车", stdin: "12 0\n" },
      { name: "全是货车", stdin: "0 3\n" },
      { name: "各 1 辆", stdin: "1 1\n" },
    ],
  },

  "综合 7.2-02": {
    title: "折半查找的比较过程",
    sig: "int BinSearchTrace(int A[], int n, int x, int trace[], int *cmp)",
    ret: "查找成功返回 x 在表中的下标，失败返回 -1；trace 依次保存被比较过的元素，*cmp 写入比较次数。",
    vars: [
      "A：递增有序的顺序表，n 为表长。",
      "low、high、mid：折半查找的三个下标，每次取 mid = (low+high)/2。",
      "判定树就是由这些 mid 依次构成的，比较次数等于结点在判定树中的层数。",
    ],
    io: "第一行 n，第二行 n 个递增整数，第三行 m，第四行 m 个待查值；每个查询输出一行：比较过的元素序列，然后 `-> 下标` 或 `-> -1`。",
    pre: ARR_PRE,
    post: `int main(void) {
    int A[MAXN], n = 0, m = 0, i, pos, cmp, k, trace[64];
    if (scanf("%d", &n) != 1) return 0;
    for (i = 0; i < n; ++i) if (scanf("%d", &A[i]) != 1) return 0;
    if (scanf("%d", &m) != 1) return 0;
    for (k = 0; k < m; ++k) {
        int x = 0;
        if (scanf("%d", &x) != 1) return 0;
        pos = BinSearchTrace(A, n, x, trace, &cmp);
        for (i = 0; i < cmp; ++i) printf("%d ", trace[i]);
        printf("-> %d\\n", pos);
    }
    return 0;
}`,
    std: `int BinSearchTrace(int A[], int n, int x, int trace[], int *cmp) {
    int low = 0, high = n - 1, mid, cnt = 0, pos = -1;
    while (low <= high) {
        mid = (low + high) / 2;
        trace[cnt++] = A[mid];
        if (A[mid] == x) {
            pos = mid;
            break;
        } else if (A[mid] < x) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    *cmp = cnt;
    return pos;
}`,
    cases: [
      { name: "教材表查 275 与 684", stdin: "14\n17 94 154 170 275 503 509 512 553 612 677 765 897 908\n2\n275 684\n" },
      { name: "查表头表尾", stdin: "14\n17 94 154 170 275 503 509 512 553 612 677 765 897 908\n2\n17 908\n" },
      { name: "单元素命中", stdin: "1\n50\n1\n50\n" },
      { name: "单元素失败", stdin: "1\n50\n1\n10\n" },
    ],
  },

  "综合 7.2-04": {
    title: "先按 8 一组顺序查块，再在块内折半",
    sig: "int BlockSearch(int A[], int n, int x)",
    ret: "找到返回元素下标，找不到返回 -1。",
    vars: [
      "A：递增有序的顺序表，长度 n，元素下标 0..n-1。",
      "先查 A[7]、A[15]、A[23]…… 这些块尾，确定 x 落在哪一块。",
      "确定块后在该块内（不含块尾）做折半查找；x 大于最后一个块尾则直接失败。",
    ],
    io: "第一行 n，第二行 n 个递增整数，第三行 m，第四行 m 个待查值；每个查询输出一行下标或 -1。",
    pre: ARR_PRE,
    post: `int main(void) {
    int A[MAXN], n = 0, m = 0, i, k, x;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAXN) n = MAXN;
    for (i = 0; i < n; ++i) if (scanf("%d", &A[i]) != 1) return 0;
    if (scanf("%d", &m) != 1) return 0;
    for (k = 0; k < m; ++k) {
        if (scanf("%d", &x) != 1) return 0;
        printf("%d\\n", BlockSearch(A, n, x));
    }
    return 0;
}`,
    std: `int BlockSearch(int A[], int n, int x) {
    int k = 7, low, high, mid;
    while (k < n && A[k] < x) k += 8;
    if (k >= n) {
        if (n - 1 >= 0 && A[n - 1] == x) return n - 1;
        k = n - 1;
    }
    if (k < n && A[k] == x) return k;
    low = k - 7;
    high = k - 1;
    if (low < 0) low = 0;
    while (low <= high) {
        mid = (low + high) / 2;
        if (A[mid] == x) return mid;
        else if (A[mid] < x) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
    cases: [
      { name: "块尾命中", stdin: "24\n1 2 3 4 5 6 7 100 9 10 11 12 13 14 15 200 17 18 19 20 21 22 23 300\n3\n100 200 300\n" },
      { name: "块内命中", stdin: "17\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 99\n2\n5 99\n" },
      { name: "不存在", stdin: "9\n11 22 33 44 55 66 77 88 999\n2\n50 1000\n" },
      { name: "第一个元素", stdin: "8\n1 2 3 4 5 6 7 8\n1\n1\n" },
    ],
  },

  "综合 7.2-06": {
    title: "顺序查找并把命中的元素与前驱交换",
    sig: "int SeqSearchSwap(int A[], int n, int x)",
    ret: "找到时返回交换之后 x 所在的下标；x 已在表头时下标仍为 0 并不再交换；找不到返回 -1，表不变。",
    vars: [
      "A：顺序存储的线性表，n 为表长。",
      "i：从前向后扫描的下标，找到后把 A[i] 与 A[i-1] 交换。",
      "这样频繁被查的元素会逐步前移，平均查找长度随之下降。",
    ],
    io: "第一行 n，第二行 n 个整数，第三行 m，第四行 m 个待查值；每次查询输出一行，先是返回的下标，然后是当前的整张表。",
    pre: ARR_PRE,
    post: `int main(void) {
    int A[MAXN], n = 0, m = 0, i, k, x, pos;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAXN) n = MAXN;
    for (i = 0; i < n; ++i) if (scanf("%d", &A[i]) != 1) return 0;
    if (scanf("%d", &m) != 1) return 0;
    for (k = 0; k < m; ++k) {
        if (scanf("%d", &x) != 1) return 0;
        pos = SeqSearchSwap(A, n, x);
        printf("%d |", pos);
        for (i = 0; i < n; ++i) printf(" %d", A[i]);
        printf("\\n");
    }
    return 0;
}`,
    std: `int SeqSearchSwap(int A[], int n, int x) {
    int i = 0, t;
    while (i < n && A[i] != x) ++i;
    if (i >= n) return -1;
    if (i > 0) {
        t = A[i];
        A[i] = A[i - 1];
        A[i - 1] = t;
        return i - 1;
    }
    return 0;
}`,
    cases: [
      { name: "连续查同一个", stdin: "6\n10 20 30 40 50 60\n3\n50 50 50\n" },
      { name: "查表头", stdin: "4\n1 2 3 4\n2\n1 1\n" },
      { name: "查不到", stdin: "5\n2 4 6 8 10\n2\n99 8\n" },
      { name: "查表尾", stdin: "4\n5 6 7 8\n1\n8\n" },
    ],
  },

  "综合 7.3-01": {
    title: "由先序序列建立二叉排序树",
    sig: "BSTree BuildFromPreOrder(int pre[], int n)",
    ret: "返回建好的二叉排序树根指针；n 为 0 时返回 NULL。",
    vars: [
      "pre：二叉排序树的先序序列。",
      "二叉排序树的先序序列可以唯一确定这棵树：第一个元素是根，后面按大小关系分成左右两段。",
      "也可以按序列顺序逐个插入，插出来的树与先序序列完全对应。",
    ],
    io: "第一行 n，第二行 n 个整数（先序序列）；输出两行：中序序列、ASL 成功与失败（保留两位小数）。",
    pre: BST_PRE,
    post: `static void inOrder(BSTree T) {
    if (T == NULL) return;
    inOrder(T->lchild);
    printf("%d ", T->key);
    inOrder(T->rchild);
}

static void depthSum(BSTree T, int d, int *sum) {
    if (T == NULL) return;
    *sum += d;
    depthSum(T->lchild, d + 1, sum);
    depthSum(T->rchild, d + 1, sum);
}

static void failSum(BSTree T, int d, int *sum) {
    if (T == NULL) {
        *sum += d;
        return;
    }
    failSum(T->lchild, d + 1, sum);
    failSum(T->rchild, d + 1, sum);
}

static int nodes(BSTree T) {
    if (T == NULL) return 0;
    return 1 + nodes(T->lchild) + nodes(T->rchild);
}

int main(void) {
    int pre[128], n = 0, i, s1 = 0, s2 = 0;
    BSTree T;
    if (scanf("%d", &n) != 1) return 0;
    if (n > 128) n = 128;
    for (i = 0; i < n; ++i) if (scanf("%d", &pre[i]) != 1) return 0;
    T = BuildFromPreOrder(pre, n);
    inOrder(T);
    printf("\\n");
    depthSum(T, 1, &s1);
    failSum(T, 1, &s2);
    printf("ASL succ %.2f fail %.2f\\n", n ? (double)s1 / n : 0.0, (double)s2 / (nodes(T) + 1));
    return 0;
}`,
    std: `BSTree BuildFromPreOrder(int pre[], int n) {
    int i;
    BSTree T = NULL;
    for (i = 0; i < n; ++i) T = BSTInsert(T, pre[i]);
    return T;
}`,
    cases: [
      { name: "教材序列", stdin: "10\n50 38 30 45 40 48 70 60 75 80\n" },
      { name: "单结点", stdin: "1\n42\n" },
      { name: "左斜", stdin: "4\n40 30 20 10\n" },
      { name: "空树", stdin: "0\n" },
    ],
  },

  "综合 7.3-11": {
    title: "带 count 域的二叉排序树中找第 k 小",
    sig: "BSTNode *Search_Small(BSTNode *t, int k)",
    ret: "返回第 k 小元素所在结点指针；k 超出 1..count 范围时返回 NULL。",
    vars: [
      "t->count：以 t 为根的子树结点总数，由 BuildCountBST 建树时算好。",
      "左子树结点数 lc 就是比 t 小的元素个数：k <= lc 往左找，k == lc+1 就是 t 自己，否则往右找第 k-lc-1 小。",
      "每层只走一边，平均复杂度 O(log n)。",
    ],
    io: "第一行 n，第二行 n 个待插入的关键字，第三行 k；输出第 k 小的值，越界输出 -1。",
    pre: BSTC_PRE,
    post: `int main(void) {
    BSTNode *T, *p;
    int n = 0, k = 0;
    if (scanf("%d", &n) != 1) return 0;
    T = BuildCountBST(n);
    if (scanf("%d", &k) != 1) return 0;
    p = Search_Small(T, k);
    printf("%d\\n", p == NULL ? -1 : p->key);
    return 0;
}`,
    std: `BSTNode *Search_Small(BSTNode *t, int k) {
    int lc;
    if (t == NULL) return NULL;
    if (k < 1 || k > t->count) return NULL;
    lc = (t->lchild != NULL) ? t->lchild->count : 0;
    if (k <= lc) return Search_Small(t->lchild, k);
    if (k == lc + 1) return t;
    return Search_Small(t->rchild, k - lc - 1);
}`,
    cases: [
      { name: "第 1 小", stdin: "7\n50 30 70 20 40 60 80\n1\n" },
      { name: "中间", stdin: "7\n50 30 70 20 40 60 80\n4\n" },
      { name: "最大", stdin: "7\n50 30 70 20 40 60 80\n7\n" },
      { name: "越界", stdin: "3\n5 3 8\n9\n" },
      { name: "链状树", stdin: "5\n10 20 30 40 50\n3\n" },
    ],
  },

  "综合 7.5-03": {
    title: "线性探测法构造散列表并统计查找长度",
    sig: "int LinearInsert(int HT[], int m, int key)",
    ret: "把 key 插入散列表 HT，返回插入这个元素时的探测次数（也就是它的查找成功长度）。",
    vars: [
      "HT：长度为 m 的散列表，空位用 -1 表示。",
      "m：表长，散列函数是 H(key) = key % m。",
      "h：当前探测到的下标，冲突时 h = (h+1) % m 往后挪一格。",
      "cnt：探测次数，从 1 起计。",
    ],
    io: "第一行 m n（表长与关键字个数），第二行 n 个关键字；输出第一行散列表内容，第二行 `ASL succ 总探测次数/n`。",
    pre: ARR_PRE,
    post: `int main(void) {
    int HT[64], m = 0, n = 0, i, key, total = 0;
    if (scanf("%d %d", &m, &n) != 2) return 0;
    if (m > 64) m = 64;
    for (i = 0; i < m; ++i) HT[i] = -1;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &key) != 1) return 0;
        total += LinearInsert(HT, m, key);
    }
    for (i = 0; i < m; ++i) printf("%d ", HT[i]);
    printf("\\nASL succ %d/%d\\n", total, n);
    return 0;
}`,
    std: `int LinearInsert(int HT[], int m, int key) {
    int h = key % m, cnt = 1;
    while (HT[h] != -1) {
        h = (h + 1) % m;
        ++cnt;
    }
    HT[h] = key;
    return cnt;
}`,
    cases: [
      { name: "教材八个数", stdin: "11 8\n1 13 12 34 38 33 27 22\n" },
      { name: "无冲突", stdin: "11 4\n0 1 2 3\n" },
      { name: "全冲突", stdin: "7 4\n7 14 21 28\n" },
      { name: "单个", stdin: "5 1\n9\n" },
    ],
  },

  "综合 7.5-04": {
    title: "链地址法散列表的查找长度",
    sig: "int ChainInsert(HNode *HT[], int p, int key)",
    ret: "把 key 尾插到它所在的链上，返回这个 key 在该链中的位置（从 1 数起），即查找成功时的比较次数。",
    vars: [
      "HT：长度为 p 的指针数组，每个元素是单链表头指针。",
      "p：散列函数 H(key) = key % p 中的模数。",
      "同一链上的元素按插入先后排列，位置越靠后查找越长。",
    ],
    io: "第一行 p n，第二行 n 个关键字；输出 p 行，每行是 `下标: 链上元素`，最后一行 `ASL succ 总次数/n`。",
    pre: HASH_CHAIN_PRE,
    post: `int main(void) {
    HNode *HT[64];
    int p = 0, n = 0, i, key, total = 0;
    if (scanf("%d %d", &p, &n) != 2) return 0;
    if (p > 64) p = 64;
    for (i = 0; i < p; ++i) HT[i] = NULL;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &key) != 1) return 0;
        total += ChainInsert(HT, p, key);
    }
    for (i = 0; i < p; ++i) {
        HNode *t;
        printf("%d:", i);
        for (t = HT[i]; t != NULL; t = t->next) printf(" %d", t->key);
        printf("\\n");
    }
    printf("ASL succ %d/%d\\n", total, n);
    return 0;
}`,
    std: `int ChainInsert(HNode *HT[], int p, int key) {
    int h = key % p, cnt = 1;
    HNode *q = (HNode *)malloc(sizeof(HNode));
    HNode *t;
    q->key = key;
    q->next = NULL;
    if (HT[h] == NULL) {
        HT[h] = q;
        return 1;
    }
    t = HT[h];
    while (t->next != NULL) {
        t = t->next;
        ++cnt;
    }
    t->next = q;
    return cnt + 1;
}`,
    cases: [
      { name: "教材十一个数", stdin: "13 11\n26 36 41 38 44 15 68 12 6 51 25\n" },
      { name: "无冲突", stdin: "7 3\n1 2 3\n" },
      { name: "全冲突", stdin: "5 5\n5 10 15 20 25\n" },
      { name: "单个", stdin: "3 1\n11\n" },
    ],
  },

  "综合 7.5-05": {
    title: "双散列法构造散列表",
    sig: "int DoubleInsert(int HT[], int m, int key)",
    ret: "按题给的再散列函数插入 key，返回这次插入的探测次数。",
    vars: [
      "HT：长度 m 的散列表，空位为 -1。",
      "H0(key) = key % m；第 i 次的增量是 REV(key+1) % 11 + 1。",
      "REV(x) 颠倒十进制各位，骨架里已给出，例如 REV(37)=73、REV(7)=7。",
    ],
    io: "第一行 m n，第二行 n 个关键码；输出第一行散列表内容，第二行 `ASL succ 总次数/n`。",
    pre: DOUBLE_HASH_PRE,
    post: `int main(void) {
    int HT[64], m = 0, n = 0, i, key, total = 0;
    if (scanf("%d %d", &m, &n) != 2) return 0;
    if (m > 64) m = 64;
    for (i = 0; i < m; ++i) HT[i] = -1;
    for (i = 0; i < n; ++i) {
        if (scanf("%d", &key) != 1) return 0;
        total += DoubleInsert(HT, m, key);
    }
    for (i = 0; i < m; ++i) printf("%d ", HT[i]);
    printf("\\nASL succ %d/%d\\n", total, n);
    return 0;
}`,
    std: `int DoubleInsert(int HT[], int m, int key) {
    int h = key % m, cnt = 1, d = REV(key + 1) % 11 + 1;
    while (HT[h] != -1) {
        h = (h + d) % m;
        ++cnt;
        if (cnt > m) break;
    }
    HT[h] = key;
    return cnt;
}`,
    cases: [
      { name: "教材八个数", stdin: "13 8\n2 8 31 20 19 18 53 27\n" },
      { name: "无冲突", stdin: "13 3\n1 2 3\n" },
      { name: "两两冲突", stdin: "7 6\n1 8 15 22 29 36\n" },
      { name: "单个", stdin: "13 1\n20\n" },
    ],
  },

  "综合 8.3-04": {
    title: "随机选择枢轴的快速排序划分",
    sig: "int Partition2(ElemType A[], int low, int high)",
    ret: "返回枢轴元素最终所在的下标。划分完成后 A[low..i-1] 都小于枢轴值，A[i+1..high] 都不小于枢轴值。",
    vars: [
      "A：待划分的子表；low、high：子表下界与上界。",
      "rand_Index：在 [low, high] 上随机取一个下标，把它交换到 A[low] 作为枢轴。",
      "i：小于枢轴区间的右边界，初始为 low；j 从 low+1 扫到 high，遇到小于枢轴的数就换到前面。",
    ],
    io: "第一行 n，第二行 n 个整数；输出 `pos=pivot=…` 与划分后的数组。种子已在 main 里固定为 srand(20261127)，同样写法每次都得到同样的划分。",
    pre: ARR_PRE,
    post: `int main(void) {
    int A[MAXN], n = 0, i, pos;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAXN) n = MAXN;
    for (i = 0; i < n; ++i) if (scanf("%d", &A[i]) != 1) return 0;
    srand(20261127);
    if (n > 0) {
        pos = Partition2(A, 0, n - 1);
        printf("pos=%d pivot=%d:", pos, A[pos]);
        for (i = 0; i < n; ++i) printf(" %d", A[i]);
    } else {
        printf("pos=-1 pivot=0:");
    }
    printf("\\n");
    return 0;
}`,
    std: `static void swapElem(ElemType *a, ElemType *b) {
    ElemType t = *a;
    *a = *b;
    *b = t;
}

int Partition2(ElemType A[], int low, int high) {
    int rand_Index = low + rand() % (high - low + 1);
    int i = low, j;
    ElemType pivot;
    swapElem(&A[rand_Index], &A[low]);
    pivot = A[low];
    for (j = low + 1; j <= high; ++j) {
        if (A[j] < pivot) {
            ++i;
            swapElem(&A[i], &A[j]);
        }
    }
    swapElem(&A[i], &A[low]);
    return i;
}`,
    cases: [
      { name: "乱序", stdin: "8\n49 38 65 97 76 13 27 49\n" },
      { name: "已有序", stdin: "6\n10 20 30 40 50 60\n" },
      { name: "单元素", stdin: "1\n7\n" },
      { name: "全相同", stdin: "5\n4 4 4 4 4\n" },
    ],
  },

  "综合 8.3-07": {
    title: "把集合划分成元素个数差最小、和差最大的两部分",
    sig: "int setPartition(int a[], int n)",
    ret: "返回 |S1 - S2| 的最大值，也就是 S2 的元素和减去 S1 的元素和。",
    vars: [
      "a：n 个正整数组成的集合，n >= 2。",
      "k = n/2：较小那一半分到的元素个数。",
      "先做一次快排式的划分，让前 k 个元素就是最小的 k 个；只有枢轴落在 k-1 位置时才算划分到位，否则只在那一侧继续。",
      "S1 是前 k 个元素之和，S2 是其余元素之和，两者个数差固定为 0（n 偶数）或 1（n 奇数），此时和差最大。",
    ],
    io: "第一行 n，第二行 n 个正整数；输出第一行返回值，第二行前 k 个元素，第三行其余元素。",
    pre: ARR_PRE,
    post: `int main(void) {
    int a[MAXN], n = 0, i, k, r;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAXN) n = MAXN;
    for (i = 0; i < n; ++i) if (scanf("%d", &a[i]) != 1) return 0;
    r = setPartition(a, n);
    k = n / 2;
    printf("%d\\n", r);
    for (i = 0; i < k; ++i) printf("%d ", a[i]);
    printf("\\n");
    for (i = k; i < n; ++i) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
    std: `static void swapI(int *x, int *y) {
    int t = *x;
    *x = *y;
    *y = t;
}

int setPartition(int a[], int n) {
    int pivotkey, low = 0, low0 = 0, high = n - 1, high0 = n - 1, k = n / 2, flag = 1, i, s1 = 0, s2 = 0;
    while (flag) {
        pivotkey = a[low];
        while (low < high) {
            while (low < high && a[high] >= pivotkey) --high;
            if (low != high) a[low] = a[high];
            while (low < high && a[low] <= pivotkey) ++low;
            if (low != high) a[high] = a[low];
        }
        a[low] = pivotkey;
        if (low == k - 1) flag = 0;
        else if (low < k - 1) {
            low0 = ++low;
            high = high0;
        } else {
            high0 = --high;
            low = low0;
        }
    }
    for (i = 0; i < k; ++i) s1 += a[i];
    for (i = k; i < n; ++i) s2 += a[i];
    return s2 - s1;
}`,
    cases: [
      { name: "教材示例", stdin: "8\n1 2 3 4 5 6 7 8\n" },
      { name: "乱序", stdin: "6\n13 2 9 4 20 7\n" },
      { name: "两个元素", stdin: "2\n5 1\n" },
      { name: "奇数个", stdin: "7\n9 8 7 6 5 4 3\n" },
    ],
  },

  "综合 8.6-05": {
    title: "计数式比较排序（稳定版）",
    sig: "void cmpCountSort(int a[], int b[], int n)",
    ret: "无返回值。把 a 中 n 个元素按非降序写入 b，相同元素保持原有先后次序（稳定）。",
    vars: [
      "a：待排序数组；b：输出数组，长度与 a 相同。",
      "count[i]：比 a[i] 大的元素个数（相等时按 a[i] <= a[j] 让后面的 count 加 1），所以 a[i] 的最终位置就是 count[i]。",
      "比较次数固定为 n(n-1)/2，与数据初态无关。",
    ],
    io: "第一行 n，第二行 n 个整数；输出排序后的序列。",
    pre: ARR_PRE,
    post: `int main(void) {
    int a[MAXN], b[MAXN], n = 0, i;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAXN) n = MAXN;
    for (i = 0; i < n; ++i) if (scanf("%d", &a[i]) != 1) return 0;
    cmpCountSort(a, b, n);
    for (i = 0; i < n; ++i) printf("%d ", b[i]);
    printf("\\n");
    return 0;
}`,
    std: `void cmpCountSort(int a[], int b[], int n) {
    int i, j, *count;
    count = (int *)malloc(sizeof(int) * (n > 0 ? n : 1));
    for (i = 0; i < n; ++i) count[i] = 0;
    for (i = 0; i < n - 1; ++i) {
        for (j = i + 1; j < n; ++j) {
            if (a[i] < a[j]) ++count[j];
            else ++count[i];
        }
    }
    for (i = 0; i < n; ++i) b[count[i]] = a[i];
    free(count);
}`,
    cases: [
      { name: "教材数组", stdin: "6\n25 -10 25 10 11 19\n" },
      { name: "有重复", stdin: "7\n3 1 3 2 1 3 2\n" },
      { name: "已逆序", stdin: "5\n9 7 5 3 1\n" },
      { name: "单元素", stdin: "1\n8\n" },
    ],
  },

  "综合 8.7-05": {
    title: "k 路归并的最佳归并树 WPL",
    sig: "int MergeWPL(int len[], int n, int k)",
    ret: "返回最佳归并树的带权路径长度，也就是各归并段长度乘以它所在层数之和。",
    vars: [
      "len：n 个初始归并段的长度；k：归并路数。",
      "先补若干个长度为 0 的虚段，使 (段数-1) % (k-1) == 0，这是构造严格 k 叉 Huffman 树的前提。",
      "每次取长度最小的 k 段合并，把合并结果放回，WPL 就是所有合并结果之和。",
    ],
    io: "第一行 n k，第二行 n 个长度；输出 WPL。",
    pre: ARR_PRE,
    post: `int main(void) {
    int len[256], n = 0, k = 0, i;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    if (n > 256) n = 256;
    for (i = 0; i < n; ++i) if (scanf("%d", &len[i]) != 1) return 0;
    printf("%d\\n", MergeWPL(len, n, k));
    return 0;
}`,
    std: `int MergeWPL(int len[], int n, int k) {
    int a[512], cnt = 0, i, j, wpl = 0, sum, t;
    if (n <= 0) return 0;
    if (k < 2) k = 2;
    for (i = 0; i < n; ++i) a[cnt++] = len[i];
    while ((cnt - 1) % (k - 1) != 0) a[cnt++] = 0;
    while (cnt > 1) {
        for (i = 1; i < cnt; ++i) {
            t = a[i];
            j = i - 1;
            while (j >= 0 && a[j] > t) {
                a[j + 1] = a[j];
                --j;
            }
            a[j + 1] = t;
        }
        sum = 0;
        for (i = 0; i < k; ++i) sum += a[i];
        wpl += sum;
        for (i = k; i < cnt; ++i) a[i - k] = a[i];
        cnt = cnt - k + 1;
        a[cnt - 1] = sum;
    }
    return wpl;
}`,
    cases: [
      { name: "教材十二段四路", stdin: "12 4\n30 44 8 6 3 20 60 18 9 62 68 85\n" },
      { name: "四段二路", stdin: "4 2\n30 44 8 6\n" },
      { name: "单段", stdin: "1 4\n50\n" },
      { name: "三段三路", stdin: "3 3\n1 2 3\n" },
    ],
  },

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
      { name: "五顶点图 1 到 4", stdin: "5 7\n1 2 1\n1 3 1\n1 5 1\n2 4 1\n2 5 1\n3 4 1\n4 5 1\n1 4\n" },
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
};











