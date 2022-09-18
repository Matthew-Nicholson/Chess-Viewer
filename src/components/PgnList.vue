<template>
  <q-card dark flat bordered class="custom-card flex flex-center">
    <q-scroll-area v-if="chessStore.pgnFile?.length" class="scroll-area">
      <q-list bordered>
        <q-item
          clickable
          v-ripple
          v-for="(game, index) in chessStore.pgnFile"
          :key="index"
          @click="
            chessStore.loadPgn(game);
            activeGame = index;
          "
          :active="activeGame === index"
          active-class="active-game q-ma-xs text-white"
        >
          <PgnListItem :game="game"></PgnListItem>
        </q-item>
      </q-list>
    </q-scroll-area>
    <p v-else class="text-grey-6 text-caption">No games</p>
    <q-inner-loading
      dark
      :showing="pgnFileLoading"
      label="File loading..."
      label-class="text-grey-6"
    >
      <q-spinner color="accent" size="3em" />
    </q-inner-loading>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useChessStore } from "src/stores/chess-store";
import { storeToRefs } from "pinia";
import PgnListItem from "src/components/PgnListItem.vue";
const chessStore = useChessStore();
const activeGame = ref(null);
const { pgnFileLoading } = storeToRefs(chessStore);
</script>

<style>
.scroll-area {
  width: 100%;
  height: 100%;
}
.active-game {
  border: thin solid #cf5c36;
}
</style>
