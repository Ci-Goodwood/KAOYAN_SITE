<template>
  <div>
    <div class="crumbs"><a href="#/">首页</a> / 学习</div>

    <div class="panel" style="margin-bottom: 22px">
      <div class="site-note">PART 01</div>
      <h2 style="font-size: 22px; margin: 8px 0 6px">第一部分　数据结构与算法</h2>
      <div class="sub">
        共 {{ chapters.length }} 章、{{ sectionCount }} 节。点进每一节，知识点讲完即练。
      </div>
    </div>

    <div v-if="loading" class="empty">载入中…</div>
    <div v-else-if="error" class="empty">{{ error }}</div>
    <div v-else class="panel">
      <div v-for="(ch, ci) in chapters" :key="ch.id" class="chapter">
        <h3>
          <span class="idx">{{ two(ci + 1) }}</span>
          <span>{{ ch.title }}</span>
          <span class="tag">{{ (ch.sections || []).length }} 节</span>
          <span class="tag">{{ ch.stats.single || 0 }} 单选</span>
          <span class="tag">{{ ch.stats.code || 0 }} 算法题</span>
        </h3>
        <div v-if="introOf(ch)" class="meta">{{ introOf(ch) }}</div>
        <div class="sec-list">
          <a
            v-for="(sec, si) in ch.sections || []"
            :key="si"
            class="sec-row"
            :href="`#/lesson/${ch.id}/${si}`"
          >
            <span class="sno">§{{ si + 1 }}</span>
            <span class="stitle">{{ sec.title }}</span>
            <span class="slead" v-if="sec.lead">{{ sec.lead }}</span>
            <span class="arrow">进入课堂 ↗</span>
          </a>
        </div>
      </div>
    </div>

    <div class="panel">
      <h2>后续部分</h2>
      <div class="sub">骨架已经排好，内容陆续上线。</div>
      <div class="part-head muted-part" v-for="(p, i) in laterParts" :key="p.id">
        <div class="no">{{ two(i + 2) }}</div>
        <div style="flex: 1"><h2>{{ p.title }}</h2></div>
        <span style="font-size: 12px; color: #999">筹备中</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { fetchIndex } from "../lib/api.js";

const chapters = ref([]);
const laterParts = ref([]);
const loading = ref(true);
const error = ref("");

const sectionCount = computed(() =>
  chapters.value.reduce((sum, ch) => sum + (ch.sections || []).length, 0)
);

function two(n) {
  return String(n).padStart(2, "0");
}

function introOf(ch) {
  const line = (ch.intro || []).find((l) => l.length > 24 && !/^[（(]/.test(l));
  if (!line) return "";
  return line.replace(/\*\*/g, "").slice(0, 120);
}

onMounted(async () => {
  try {
    const d = await fetchIndex();
    chapters.value = d.part1 || [];
    laterParts.value = (d.parts || []).filter((p) => !p.ready);
  } catch (e) {
    error.value = String(e.message || e);
  } finally {
    loading.value = false;
  }
});
</script>
