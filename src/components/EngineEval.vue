<template>
  <q-card flat bordered dark class="q-pa-sm custom-card">
    <div class="row">
      <p class="text-small text-grey-5 q-ma-xs" v-if="chessStore.depth">
        Depth = {{ chessStore.depth }}/{{ chessStore.engineTargetDepth }}
      </p>
      <q-space />
      <q-toggle
        @click="evaluate"
        left-label
        dense
        size="30px"
        v-model="chessStore.engineEnabled"
        label="Engine analysis"
        class="q-ma-xs"
      />
    </div>
    <q-list separator class="">
      <q-item
        v-if="chessStore.evaluation"
        dense
        class="flex flex-center q-px-sm"
      >
        <q-chip
          dark
          dense
          class="col-shrink q-mx-none"
          :class="{
            'bg-black text-grey-2': chessStore.evaluation < 0,
            'bg-grey-2 text-black': chessStore.evaluation >= 0,
          }"
          :label="chessStore.evaluation.toFixed(2)"
        />
        <q-separator vertical class="bg-grey-7 q-ma-sm" />
        <p class="col q-mr-md q-my-none ellipsis text-small">
          {{ chessStore.evaluationString }}
        </p>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup>
import { useChessStore } from "src/stores/chess-store";
const chessStore = useChessStore();
function evaluate() {
  chessStore.evaluate(chessStore.fen);
}
</script>
