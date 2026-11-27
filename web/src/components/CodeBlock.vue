<template>
  <div class="codebox" :class="{ flat: !showBar }">
    <div v-if="showBar" class="bar">
      <span>{{ lang || "C" }}</span>
      <span style="cursor: pointer" @click="copy">{{ copied ? "已复制" : "复制" }}</span>
    </div>
    <pre v-html="html"></pre>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { highlightC } from "../lib/highlight.js";

const props = defineProps({
  code: { type: String, default: "" },
  lang: { type: String, default: "C" },
});

const html = computed(() => highlightC(props.code));
const copied = ref(false);
const showBar = computed(
  () => props.code.split("\n").filter((l) => l.trim()).length > 3
);

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1200);
  } catch (_) {
    /* 手机上可能没有剪贴板权限，忽略 */
  }
}
</script>
