<template>
  <div class="q">
    <div class="qid">{{ shortId }}</div>
    <Blocks class="stem" :raw="ex.stem" />

    <div v-if="ex.judge" class="judge-meta">
      <div><b>建议签名</b>　<code>{{ meta.sig }}</code></div>
      <div><b>返回值与结果</b>　{{ meta.ret }}</div>
      <div v-for="(v, i) in meta.vars || []" :key="i">· {{ v }}</div>
      <div v-if="meta.io"><b>输入输出</b>　{{ meta.io }}</div>
    </div>

    <div v-else class="judge-meta">
      这道题在本站暂未配置自动判题。可以先看标准答案，自己写好后对照检查。
    </div>

    <div v-if="ex.judge" class="editor-wrap">
      <div class="bar">
        <span>在这里写整个函数（不要 main、不要 #include）</span>
        <span>{{ code.length }}</span>
      </div>
      <textarea
        v-model="code"
        class="editor"
        spellcheck="false"
        placeholder="例如：&#10;void Reverse(SqList *L) {&#10;    ...&#10;}"
      ></textarea>
    </div>

    <div class="actions">
      <button
        v-if="ex.judge"
        class="btn"
        :class="{ loading: loading }"
        :disabled="loading"
        @click="submit"
      >
        {{ loading ? "判题中…" : "提交判题" }}
      </button>
      <button class="btn ghost" @click="showAnswer = !showAnswer">
        {{ showAnswer ? "收起标准答案" : "查看标准答案" }}
      </button>
      <button v-if="ex.judge" class="btn ghost" @click="reset">清空代码</button>
    </div>

    <div v-if="result" class="result" ref="resultBox">
      <div v-if="result.error" class="summary bad">{{ result.error }}</div>

      <div v-else-if="result.stage === 'compile'" class="summary bad">编译失败</div>
      <div v-if="result.stage === 'compile'" class="errlog">{{ result.log }}</div>

      <template v-else-if="result.results">
        <div class="summary" :class="result.ok ? 'ok' : 'bad'">
          {{ result.ok ? "全部通过" : "未通过" }}　{{ result.passed }} / {{ result.total }} 组用例
        </div>
        <div v-for="(c, i) in result.results" :key="i" class="case">
          <div class="ctitle">
            <span class="dot" :class="c.pass ? 'ok' : 'bad'"></span>
            <span>{{ c.name }}</span>
            <span style="font-weight: 400; color: #6b6b6b">
              {{ c.pass ? c.ms + " ms" : statusText(c.status) }}
            </span>
          </div>
          <template v-if="!c.pass">
            <div class="kv"><i>输入</i>{{ "\n" }}{{ c.stdin }}</div>
            <div class="kv"><i>标准答案输出</i>{{ "\n" }}{{ c.expected || "(空)" }}</div>
            <div class="kv"><i>你的输出</i>{{ "\n" }}{{ c.actual || "(空)" }}</div>
            <div v-if="c.stderr" class="errlog">{{ c.stderr }}</div>
          </template>
        </div>
      </template>
    </div>

    <div v-if="showAnswer" class="answer">
      <div class="explain">
        <Blocks v-if="ex.explain" :raw="ex.explain" />
        <p v-else>原文答案为空。</p>
      </div>
      <CodeBlock v-for="(c, i) in ex.code || []" :key="'c' + i" :code="c" />
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref } from "vue";
import Blocks from "./Blocks.vue";
import CodeBlock from "./CodeBlock.vue";
import { judge } from "../lib/api.js";

const props = defineProps({ ex: { type: Object, required: true } });

const shortId = computed(() =>
  String(props.ex.id || "").replace(/^综合\s*/, "")
);
const meta = computed(() => props.ex.judgeMeta || {});
const showAnswer = ref(false);
const loading = ref(false);
const result = ref(null);
const resultBox = ref(null);
const code = ref("");

const STATUS = {
  OK: "输出与标准答案不一致",
  TLE: "运行超时",
  RE: "运行错误（可能越界或崩溃）",
  OLE: "输出过多",
  SKIP: "未运行（前面的用例已超时或崩溃）",
};

function statusText(s) {
  return STATUS[s] || s || "";
}

function reset() {
  code.value = "";
  result.value = null;
}

async function submit() {
  if (loading.value) return;
  if (!code.value.trim()) {
    result.value = { error: "先写点代码再提交。" };
    return;
  }
  loading.value = true;
  result.value = null;
  try {
    result.value = await judge(props.ex.id, code.value);
  } catch (e) {
    result.value = { error: String(e.message || e) };
  } finally {
    loading.value = false;
  }
  if (result.value) {
    await nextTick();
    if (resultBox.value) {
      resultBox.value.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }
}
</script>
