<template>
  <div>
    <div class="crumbs"><a href="#/">首页</a> / 关于</div>

    <div class="panel">
      <div class="site-note">ABOUT</div>
      <h2 style="font-size: 22px; margin: 8px 0 10px">这个站是干什么的</h2>
      <div class="footlist">
        <p>端wood赐的考研站，第一部分是数据结构与算法，按原书八章逐节展开；第二到第四部分是计算机组成原理、操作系统、计算机网络，第五到第八部分是高数（上）、高数（下）、线性代数、概率论与数理统计，框架已就位，内容待补。</p>
        <p>正文按原文顺序原样呈现，不删改；每道习题都放在它对应的知识点讲完之后，学完一段就练一段。</p>
        <p>美术风格与版式取自友站 gczyws.xyz，保持同一套视觉语言。</p>
      </div>
    </div>

    <div class="panel">
      <h2>算法题怎么判</h2>
      <div class="sub">只写函数本体，服务端补全 main。</div>
      <div class="footlist">
        <p>提交的代码里不要出现 main 和 #include，服务端会把题目自带的输入输出骨架拼在你函数的前后，再把标准解跑一遍作为期望输出，逐组比对。</p>
        <p>判题接口就是本站域名下的一个 POST 接口，早先那个单独的 C 语言判题站已经并到这里：</p>
      </div>
      <pre class="apicode">POST /api/judge
Content-Type: application/json

{ "problemId": "综合 2.2-02", "code": "void Reverse(SqList *L) { ... }" }</pre>
      <div class="footlist">
        <p>返回字段：ok 表示是否全部通过，passed/total 是用例计数，results 里每组有 status（OK / TLE / RE / OLE）、expected（标准答案跑出来的输出）、actual（你的输出）。</p>
      </div>
    </div>

    <div class="panel">
      <h2>技术栈</h2>
      <div class="sub">Vue 3 + Node.js（Express），跑在一台旧手机上。</div>
      <div class="footlist">
        <p>前端用 Vue 3 单页，后端 Express 托管静态文件与数据接口；编译器是 Termux 里的 clang，配合 prlimit 与 timeout 限时限内存，避免一道死循环题把整台机器拖垮。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
