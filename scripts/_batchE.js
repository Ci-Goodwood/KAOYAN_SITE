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
    int pre[MAXN], n = 0, i, s1 = 0, s2 = 0;
    BSTree T;
    if (scanf("%d", &n) != 1) return 0;
    if (n > MAXN) n = MAXN;
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
