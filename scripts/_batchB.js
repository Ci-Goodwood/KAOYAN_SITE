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
    n = (int)strlen(A);
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
