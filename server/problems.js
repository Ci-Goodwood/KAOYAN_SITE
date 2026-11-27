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
};
