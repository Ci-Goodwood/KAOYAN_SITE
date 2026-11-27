<template>
  <div>
    <div class="crumbs"><a href="#/">首页</a> / 学习</div>

    <div class="panel reveal" style="margin-bottom: 22px">
      <div class="site-note">PART 01</div>
      <h2 style="font-size: 22px; margin: 8px 0 6px">第一部分　数据结构与算法</h2>
      <div class="sub">
        共 {{ chapters.length }} 章、{{ sectionCount }} 节。点进每一节，知识点讲完即练。
      </div>
    </div>

    <div class="panel reveal">
      <div class="toolbar">
        <span class="hint">八个部分，点标题展开或收起</span>
        <div>
          <button class="btn ghost mini" @click="expandAll">全部展开</button>
          <button class="btn ghost mini" @click="collapseAll">全部收起</button>
        </div>
      </div>

      <div v-if="loading" class="empty">载入中…</div>
      <div v-else-if="error" class="empty">{{ error }}</div>

      <template v-else>
        <div
          v-for="(p, i) in parts"
          :key="p.id"
          class="part"
          :class="{ 'muted-part': !p.ready }"
        >
        <div
          class="part-head"
          :class="{ active: !!openParts[p.id] }"
          @click="togglePart(p.id)"
        >
          <div class="no">{{ two(i + 1) }}</div>
          <div class="ptitle">
            <h2>{{ p.title }}</h2>
            <div class="pmeta">
              {{ p.ready ? chapters.length + " 章 · " + sectionCount + " 节" : "内容筹备中" }}
            </div>
          </div>
          <span class="chev" :class="{ open: !!openParts[p.id] }">＋</span>
        </div>

        <div class="collapse" :class="{ open: !!openParts[p.id] }">
          <div>
            <template v-if="p.ready">
              <div v-for="(ch, ci) in chapters" :key="ch.id" class="chapter">
                <div class="chapter-head" @click="toggleChapter(ch.id)">
                  <h3>
                    <span class="idx">{{ two(ci + 1) }}</span>
                    <span>{{ ch.title }}</span>
                    <span class="tag">{{ (ch.sections || []).length }} 节</span>
                    <span class="tag">{{ ch.stats.single || 0 }} 单选</span>
                  </h3>
                  <span class="chev small" :class="{ open: !!openCh[ch.id] }">＋</span>
                </div>

                <div class="collapse" :class="{ open: !!openCh[ch.id] }">
                  <div>
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
              </div>
            </template>
            <div v-else class="empty-part">
              这一部分暂时空着，等后面的内容填进来。
            </div>
          </div>
        </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { fetchIndex } from "../lib/api.js";
import { refreshReveal } from "../lib/motion.js";

const parts = ref([]);
const chapters = ref([]);
const loading = ref(true);
const error = ref("");
const openParts = reactive({});
const openCh = reactive({});

const sectionCount = computed(() =>
  chapters.value.reduce((sum, ch) => sum + (ch.sections || []).length, 0)
);

function two(n) {
  return String(n).padStart(2, "0");
}

function togglePart(id) {
  openParts[id] = !openParts[id];
}

function toggleChapter(id) {
  openCh[id] = !openCh[id];
}

function expandAll() {
  parts.value.forEach((p) => {
    openParts[p.id] = true;
  });
  chapters.value.forEach((ch) => {
    openCh[ch.id] = true;
  });
}

function collapseAll() {
  Object.keys(openParts).forEach((k) => {
    openParts[k] = false;
  });
  Object.keys(openCh).forEach((k) => {
    openCh[k] = false;
  });
}

onMounted(async () => {
  try {
    const d = await fetchIndex();
    parts.value = d.parts || [];
    chapters.value = d.part1 || [];
    openParts.part1 = true;
  } catch (e) {
    error.value = String(e.message || e);
  } finally {
    loading.value = false;
    setTimeout(refreshReveal, 80);
  }
});
</script>
