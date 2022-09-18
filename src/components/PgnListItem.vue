<template>
  <q-item-section>
    <q-item-label
      >◽{{ headers?.White }} ({{ headers?.WhiteElo }})</q-item-label
    >
    <q-item-label
      >◾{{ headers?.Black }} ({{ headers?.BlackElo }})</q-item-label
    >
  </q-item-section>
  <q-item-section side class="text-weight-light text-subtitle2">
    <q-chip dark :class="chipColor" dense size="md" :label="headers?.Result" />
  </q-item-section>
</template>

<script setup>
import { computed } from "vue";
import { getHeaders } from "../scripts/chessHeaders";
const props = defineProps(["game"]);
const headers = getHeaders(props.game);

const chipColor = computed(() => {
  const result = headers?.Result;
  let css;
  switch (result) {
    case "1-0":
      css = "bg-white text-black";
      break;
    case "0-1":
      css = "bg-black text-white";
      break;

    default:
      css = "bg-grey-8 text-grey-1";
  }
  return css;
});
</script>

// TODO: Maybe redo this so we don't need to import chess.js a million times.
