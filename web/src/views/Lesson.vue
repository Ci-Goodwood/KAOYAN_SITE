<template>
  <div>
    <div class="crumbs">
      <a href="#/">首页</a> / <a href="#/learning">学习</a> /
      <a href="#/learning">{{ chapterTitle }}</a> /
      <span>{{ section ? section.title : "" }}</span>
    </div>

    <div v-if="loading" class="empty">载入中…</div>
    <div v-else-if="error" class="empty">{{ error }}</div>
    <div v-else-if="!section" class="empty">这一节不存在。</div>

    <div v-else>
      <div class="lesson-head">
        <div class="site-note">READ · THINK · CONNECT</div>
        <h1>{{ section.title }}</h1>
        <p v-if="lead" class="lead">{{ lead }}</p>
      </div>

      <div v-for="(tp, ti) in section.topics || []" :key="tp.id" class="topic">
        <div class="num">{{ two(ti + 1) }}</div>
        <div>
          <h2>{{ tp.title }}</h2>
          <Blocks :raw="(tp.content || []).join('\n')" />

          <div v-if="(tp.exercises || []).length" class="exblock">
            <div class="label">随堂练习 · {{ tp.title }}</div>
            <template v-for="ex in tp.exercises" :key="ex.id">
              <Quiz v-if="ex.kind === '单选'" :ex="ex" />
              <Problem v-else-if="ex.kind === '综合'" :ex="ex" />
              <div v-else class="q">
                <div class="qid">{{ ex.id }}</div>
                <Blocks :raw="ex.stem" />
                <div v-if="ex.explain" class="explain">
                  <Blocks :raw="ex.explain" />
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div v-if="(section.exercises || []).length" class="exblock">
        <div class="label">本节练习</div>
        <template v-for="ex in section.exercises" :key="ex.id">
          <Quiz v-if="ex.kind === '单选'" :ex="ex" />
          <Problem v-else-if="ex.kind === '综合'" :ex="ex" />
          <div v-else class="q">
            <div class="qid">{{ ex.id }}</div>
            <Blocks :raw="ex.stem" />
            <div v-if="ex.explain" class="explain">
              <Blocks :raw="ex.explain" />
            </div>
          </div>
        </template>
      </div>

      <div class="pager">
        <a v-if="prevIndex !== null" :href="`#/lesson/${chapterId}/${prevIndex}`" class="btn ghost">← 上一节</a>
        <span v-else></span>
        <a v-if="nextIndex !== null" :href="`#/lesson/${chapterId}/${nextIndex}`" class="btn ghost">下一节 →</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import Blocks from "../components/Blocks.vue";
import Quiz from "../components/Quiz.vue";
import Problem from "../components/Problem.vue";
import { fetchChapter } from "../lib/api.js";

const props = defineProps({
  chapterId: { type: String, default: "ch1" },
  secIndex: { type: Number, default: 0 },
});

const chapter = ref(null);
const loading = ref(true);
const error = ref("");

const chapterTitle = computed(() => (chapter.value ? chapter.value.title : "第一部分"));
const section = computed(() => {
  if (!chapter.value) return null;
  return (chapter.value.sections || [])[props.secIndex] || null;
});
const lead = computed(() => {
  if (!section.value) return "";
  const line = (section.value.intro || []).find((l) => l.trim().length > 8);
  return line ? line.replace(/\*\*/g, "").replace(/^·\s*/, "") : "";
});
const prevIndex = computed(() => (props.secIndex > 0 ? props.secIndex - 1 : null));
const nextIndex = computed(() => {
  if (!chapter.value) return null;
  const total = (chapter.value.sections || []).length;
  return props.secIndex + 1 < total ? props.secIndex + 1 : null;
});

function two(n) {
  return String(n).padStart(2, "0");
}

onMounted(async () => {
  try {
    const d = await fetchChapter(props.chapterId);
    chapter.value = d.chapter;
  } catch (e) {
    error.value = String(e.message || e);
  } finally {
    loading.value = false;
  }
});
</script>
