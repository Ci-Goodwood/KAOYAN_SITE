<template>
  <header class="topbar">
    <a class="brand" href="#/">
      <img class="logo-mark" src="/images/logo.png" alt="端wood赐" />
      <span class="brandname">端wood赐</span><span class="sub">KAOYAN</span>
    </a>
    <nav class="navlinks">
      <a href="#/" :class="{ on: route.name === 'home' }">首页</a>
      <a
        href="#/learning"
        :class="{ on: route.name === 'learning' || route.name === 'lesson' }"
        >学习</a
      >
      <a href="#/about" :class="{ on: route.name === 'about' }">关于</a>
    </nav>
  </header>

  <main class="wrap">
    <Home v-if="route.name === 'home'" />
    <Learning v-else-if="route.name === 'learning'" />
    <Lesson
      v-else-if="route.name === 'lesson'"
      :chapter-id="route.chapter"
      :sec-index="route.sec"
      :key="route.chapter + '-' + route.sec"
    />
    <About v-else />

    <div class="footer">
      <span>端wood赐 · 考研站</span>
      <span>第一部分内容整理自《数据结构与算法》，一字未改。</span>
    </div>
  </main>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import Home from "./views/Home.vue";
import Learning from "./views/Learning.vue";
import Lesson from "./views/Lesson.vue";
import About from "./views/About.vue";

function parse() {
  const raw = (location.hash || "").replace(/^#/, "") || "/";
  const seg = raw.split("/").filter(Boolean);
  if (seg[0] === "learning") return { name: "learning" };
  if (seg[0] === "lesson") {
    return {
      name: "lesson",
      chapter: seg[1] || "ch1",
      sec: Number(seg[2] || 0),
    };
  }
  if (seg[0] === "about") return { name: "about" };
  return { name: "home" };
}

const route = ref(parse());

function onHash() {
  route.value = parse();
  window.scrollTo({ top: 0 });
}

onMounted(() => window.addEventListener("hashchange", onHash));
onUnmounted(() => window.removeEventListener("hashchange", onHash));
</script>
