<template>
  <div class="q-mt-xs row no-wrap">
    <q-slider
      v-model="autoPlaySpeed"
      :min="10"
      :max="200"
      label
      :label-value="`Moves/min: ${autoPlaySpeed}`"
      color="blue-grey-9"
    />
    <q-btn
      flat
      round
      size="0.69rem"
      color="grey-6"
      icon="screen_rotation_alt"
      @click="chessStore.flipBoard"
      class="q-ml-md"
    >
      <q-tooltip
        transition-show="fade"
        :delay="420"
        class="tooltip q-pa-xs text-white"
        :offset="[0, 3]"
      >
        Flip board
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useChessStore } from "src/stores/chess-store";
const chessStore = useChessStore();
const { autoPlaySpeed } = storeToRefs(chessStore);
</script>

<style>
.tooltip {
  background: rgba(0, 0, 0, 0.69);
}
</style>
