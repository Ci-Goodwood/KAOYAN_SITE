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
