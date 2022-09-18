<template>
  <q-card-actions class="nav-buttons no-wrap row justify-between">
    <q-btn
      @click="changePosition(0)"
      flat
      icon="first_page"
      class="nav-button"
    />
    <q-btn @click="back" flat icon="chevron_left" class="nav-button" />
    <q-btn
      v-if="!playing"
      flat
      icon="play_arrow"
      class="nav-button"
      @click="startAutoPlay"
    />
    <q-btn
      v-if="playing"
      flat
      icon="pause"
      class="nav-button"
      @click="playing = false"
    />
    <q-btn @click="next" flat icon="chevron_right" class="nav-button" />
    <q-btn
      @click="changePosition(pgn.length)"
      flat
      icon="last_page"
      class="nav-button"
    />
  </q-card-actions>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useChessStore } from "src/stores/chess-store";
import { storeToRefs } from "pinia";
const props = defineProps({
  color: {
    type: String,
    default: "#333333",
  },
});
const { next, back, changePosition } = useChessStore();
const { pgn, autoPlaySpeed, gameOver } = storeToRefs(useChessStore());
// Keyboard Navigation
function keyBoardNavigation(ev) {
  if (ev.key === "ArrowRight") {
    return next();
  }
  if (ev.key === "ArrowLeft") {
    return back();
  }
}
onMounted(() => {
  document.addEventListener("keydown", keyBoardNavigation);
});
onBeforeUnmount(() => {
  document.removeEventListener("keydown", keyBoardNavigation);
});

// AutoPlay
const playing = ref(false);
const autoPlay = () => {
  if (gameOver.value === true) return (playing.value = false);
  if (playing.value === true) {
    const minToMs = 60 * 1000;
    const timeout = Math.floor(minToMs / +autoPlaySpeed.value);
    next();
    return setTimeout(autoPlay, timeout);
  }
};
const startAutoPlay = () => {
  playing.value = true;
  return autoPlay();
};
</script>

<style>
.nav-buttons {
  max-width: 100%;
  color: v-bind(color);
}
.nav-button {
  font-size: calc(12px + 1vmin);
}
</style>
