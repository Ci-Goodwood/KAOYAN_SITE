<template>
  <div class="q">
    <div class="qid">{{ shortId }}</div>
    <Blocks class="stem" :raw="ex.stem" />

    <button
      v-for="(opt, idx) in ex.options || []"
      :key="idx"
      class="opt"
      :class="optClass(idx)"
      :disabled="picked !== null"
      @click="pick(idx)"
    >
      <span class="key">{{ letters[idx] }}.</span>{{ opt }}
    </button>

    <div v-if="!(ex.options || []).length" class="verdict">
      原文里这道题的选项没有切分出来，可以直接对照解析。
    </div>

    <div v-if="picked !== null" class="verdict" :class="verdictClass">
      <template v-if="ex.answer">
        {{ correct ? "回答正确。" : "回答错误。" }}正确答案是 {{ ex.answer }}。
      </template>
      <template v-else> 这道题的答案在原文里没有切出，以下是解析。 </template>
    </div>

    <div v-if="picked !== null && ex.explain" class="explain">
      <Blocks :raw="ex.explain" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Blocks from "./Blocks.vue";

const props = defineProps({ ex: { type: Object, required: true } });

const letters = ["A", "B", "C", "D", "E", "F"];
const picked = ref(null);

const shortId = computed(() => String(props.ex.id || "").replace(/^单选\s*/, ""));
const correct = computed(() => picked.value === props.ex.answer);
const verdictClass = computed(() =>
  props.ex.answer ? (correct.value ? "ok" : "bad") : ""
);

function pick(idx) {
  if (picked.value !== null) return;
  picked.value = letters[idx];
}

function optClass(idx) {
  if (picked.value === null) return "";
  const letter = letters[idx];
  if (props.ex.answer && letter === props.ex.answer) return "right";
  if (letter === picked.value && props.ex.answer && letter !== props.ex.answer) {
    return "wrong";
  }
  return "";
}
</script>
