<template>
  <q-card
    dark
    flat
    bordered
    class="full-width q-pa-sm text-subtitle1 text-white custom-card"
  >
    <q-scroll-area class="pgn-scroll-wrapper">
      <span
        @click="chessStore.changePosition(index + 1)"
        v-for="(move, index) in pgn"
        :key="index"
        class="q-pa-xs q-pr-sm cursor-pointer"
        :class="{ 'bg-grey-1 text-black': index + 1 === gameIndex }"
      >
        <span v-if="index % 2 === 0">{{ index / 2 + 1 }}.</span>
        {{ move.san }}
      </span>
      <span v-if="headers">{{ headers.Result }}</span>
    </q-scroll-area>
  </q-card>
</template>

<script setup>
// import { computed, watch, reactive } from 'vue';
import { storeToRefs } from "pinia";

import { useChessStore } from "src/stores/chess-store";
const chessStore = useChessStore();
const { pgn, gameIndex, headers } = storeToRefs(chessStore);
</script>

<style>
.pgn-scroll-wrapper {
  width: 100%;
  height: 100%;
}
</style>
