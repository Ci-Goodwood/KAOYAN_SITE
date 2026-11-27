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
