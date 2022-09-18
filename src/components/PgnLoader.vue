<template>
  <q-card dark flat bordered class="custom-card">
    <q-card-section>
      <q-file
        v-model="file"
        accept=".pgn"
        dark
        outlined
        label="Load PGN"
        @update:model-value="loadPgnFile"
        :max-file-size="maxFileSize"
        @rejected="onFileRejected"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useChessStore } from "src/stores/chess-store";
const { setPgnFile, setPgnFileLoading } = useChessStore();
const $q = useQuasar();
const maxFileSize = "	1048576"; // 1MB

const file = ref(null);
const onFileRejected = (ev) => {
  console.log("rejected", ev);
  $q.notify({
    type: "negative",
    message: `File upload failed. Max file size is 1MB.`,
  });
};

function loadPgnFile() {
  setPgnFileLoading(true);
  const fileReader = new Worker(
    new URL("../scripts/fileLoader.js", import.meta.url),
    { type: "module" }
  );
  fileReader.onmessage = (ev) => {
    const gamesArr = ev.data;
    setPgnFile(gamesArr);
    setPgnFileLoading(false);
    return fileReader.terminate();
  };
  fileReader.postMessage(file.value);
}
</script>

<!-- TODO: Quasar offers some nice UI options. -->
