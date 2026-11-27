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
