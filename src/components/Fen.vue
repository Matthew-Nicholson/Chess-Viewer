<template>
  <q-card flat dark class="q-pa-sm">
    <q-card-section class="q-pa-none">
      <q-input
        dark
        borderless
        readonly
        dense
        type="text"
        ref="input"
        v-model="fen"
        label="FEN"
        class="text-small"
      >
        <template v-slot:append>
          <q-btn @click="copy" round flat size="11px" icon="content_copy" />
        </template>
      </q-input>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useChessStore } from "src/stores/chess-store";
import { storeToRefs } from "pinia";
const chessStore = useChessStore();
const { fen } = storeToRefs(chessStore);
const input = ref(null);
const copy = () => {
  console.log("copy");
  input.value.select();
  document.execCommand("copy");
};
</script>
