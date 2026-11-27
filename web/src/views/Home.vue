<template>
  <div>
    <div class="hero">
      <div class="site-note">READ · THINK · CONNECT</div>
      <h1>从理论出发，理解我们的世界。</h1>
      <p>
        端wood赐的考研站。第一部分是数据结构与算法，按原书章节逐节展开，知识点讲完就练；
        后面七部分留给组成原理、操作系统、网络和高数线代概统，陆续补齐。
      </p>
      <div class="statbar">
        <div class="stat"><b>8</b><i>学习部分</i></div>
        <div class="stat"><b>8</b><i>已上线章节</i></div>
        <div class="stat"><b>{{ sectionCount }}</b><i>互动课节</i></div>
        <div class="stat"><b>{{ singleCount }}</b><i>随堂单选</i></div>
        <div class="stat"><b>{{ codeCount }}</b><i>算法题</i></div>
      </div>
      <div class="hero-visual">
        <img src="/images/banner.jpg" alt="站点头图" />
      </div>
    </div>

    <div class="panel">
      <h2>学习板块</h2>
      <div class="sub">八个部分，数据结构与算法已经开放。</div>

      <div v-if="loading" class="empty">载入中…</div>
      <div v-else-if="error" class="empty">{{ error }}</div>
      <div v-else>
        <div
          v-for="(p, i) in parts"
          :key="p.id"
          class="part-head"
          :class="{ 'muted-part': !p.ready }"
        >
          <div class="no">{{ two(i + 1) }}</div>
          <div style="flex: 1">
            <h2>{{ p.title }}</h2>
          </div>
          <a v-if="p.ready" href="#/learning" class="btn" style="font-size: 12px; padding: 5px 14px">
            进入学习
          </a>
          <span v-else style="font-size: 12px; color: #999">筹备中</span>
        </div>
      </div>
    </div>

    <div class="panel">
      <h2>这里有哪几件事</h2>
      <div class="sub">习题跟着知识点走，学完一段就练一段。</div>
      <div class="footlist">
        <p><b>原文一字不差</b>　每一节正文都按原书顺序原样呈现，不做删改。</p>
        <p><b>随堂练习内嵌</b>　单选与算法题放在对应知识点讲完之后，不是堆在章末。</p>
        <p><b>算法题直接写函数</b>　只提交函数本体，后端补全 main，按标准答案跑用例判分，还能展开看标准答案。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { fetchIndex } from "../lib/api.js";

const parts = ref([]);
const totals = ref({});
const loading = ref(true);
const error = ref("");
const sectionCount = ref(0);

const singleCount = computed(() => totals.value.single || 0);
const codeCount = computed(() => totals.value.code || 0);

function two(n) {
  return String(n).padStart(2, "0");
}

onMounted(async () => {
  try {
    const d = await fetchIndex();
    parts.value = d.parts || [];
    totals.value = d.totals || {};
    sectionCount.value = (d.part1 || []).reduce(
      (sum, ch) => sum + (ch.sections || []).length,
      0
    );
  } catch (e) {
    error.value = String(e.message || e);
  } finally {
    loading.value = false;
  }
});
</script>
