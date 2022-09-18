<template>
  <div ref="board" id="chessground"></div>
</template>

<script setup>
import { Chessground } from "chessground";
import { onMounted, ref, reactive, watch, onUpdated } from "vue";
import "../assets/chessground.base.css";
import "../assets/chessground.brown.css";
import "../assets/chessground.cburnett.css";
import { storeToRefs } from "pinia";

import { useChessStore } from "src/stores/chess-store";
const chessStore = useChessStore();
const { fen, orientation, lastMove, sideToMove } = storeToRefs(chessStore);
let board = ref(null);
let cg = reactive({});
const props = defineProps({
  size: {
    type: String,
    default: "500px",
  },
  color: {
    type: String,
    default: "#b2c4d4",
  },
});

const config = reactive({
  fen: fen,
  orientation: orientation,
  lastMove: lastMove,
  events: {
    move: (from, to, capture) => {
      const result = chessStore.handleUserMove(from, to, capture);
      if (!result) {
        cg.set(config);
      }
    },
  },
});
watch(config, () => {
  cg.set(config);
  chessStore.evaluate(); // Try to evaluate the position every time it changes.
});
onMounted(() => {
  cg = Chessground(board.value, config);
});
</script>

<style>
#chessground {
  aspect-ratio: 1 / 1;
  height: v-bind(size);
  width: v-bind(size);
  max-height: 100vmin;
  max-width: 100vmin;
}

cg-board {
  background-color: v-bind(color);
}
cg-container {
  height: inherit !important; /* For some reason we lose a pixel or two.*/
  width: inherit !important; /* These settings force the board to fit perfectly in the 'board' ref.*/
  /* Might be an idea to do a PR for chessground and fix this for everyone. */
}
</style>
