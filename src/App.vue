<template>
  <router-view />
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { useChessStore } from "./stores/chess-store";
const { initEngine, killEngine } = useChessStore();
onMounted(() => {
  initEngine();
  // don't need to kill worker as engine will terminate when leaving the site and should be available at all times otherwise.
});
onBeforeUnmount(() => {
  killEngine();
  console.log("kill engines");
});
</script>
