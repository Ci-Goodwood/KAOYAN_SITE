<template>
  <table class="mdtable">
    <tbody>
      <tr v-for="(row, i) in rows" :key="i">
        <td v-for="(cell, j) in cells(row)" :key="j" v-html="inline(cell)"></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { inline, renderTableRow } from "../lib/render.js";

defineProps({ rows: { type: Array, default: () => [] } });

function cells(row) {
  return renderTableRow(row);
}
</script>
