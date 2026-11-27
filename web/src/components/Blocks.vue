<template>
  <div class="blocks">
    <template v-for="(b, i) in blocks" :key="i">
      <p v-if="b.t === 'p'" v-html="inline(b.text)"></p>
      <p v-else-if="b.t === 'bullet'" class="bullet" v-html="inline(b.text)"></p>
      <p v-else-if="b.t === 'sub'" class="subhead" v-html="inline(b.text)"></p>
      <p v-else-if="b.t === 'formula'" class="formula" v-html="inline(b.text)"></p>
      <CodeBlock v-else-if="b.t === 'code'" :code="b.body" />
      <MTable v-else-if="b.t === 'table'" :rows="b.rows" />
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { inline, toBlocks } from "../lib/render.js";
import CodeBlock from "./CodeBlock.vue";
import MTable from "./MTable.vue";

const props = defineProps({ raw: { type: String, default: "" } });
const blocks = computed(() => toBlocks(props.raw));
</script>
