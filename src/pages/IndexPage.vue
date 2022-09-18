<template>
  <q-page class="custom-bg noselect">
    <div class="row justify-evenly">
      <div class="col-3 column justify-evenly">
        <PgnLoader class="col-shrink q-mb-md"></PgnLoader>
        <PgnList class="col-grow"></PgnList>
        <SettingsBar></SettingsBar>
      </div>
      <div class="col-5">
        <div class="flex">
          <div class="col-shrink">
            <EvalBar
              numericEval
              height="100%"
              width="25px"
              black-color="#313131"
              eval-range="6"
              :evaluation="chessStore.evaluation"
            />
          </div>
          <div class="col-grow">
            <Chessboard color="#B6D6F6" size="100%" />
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="column full-height no-wrap justify-between">
          <EngineEval class="col-shrink q-mb-md"></EngineEval>
          <Pgn class="col-grow items-start"></Pgn>
          <span class="relative-position">
            <GameNavControls
              color="#f1f1f1"
              class="col-shrink justify-center q-pa-none"
            />
          </span>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from "vue";
import { useChessStore } from "src/stores/chess-store";
import { storeToRefs } from "pinia";
//Components
import Chessboard from "src/components/Chessboard.vue";
import GameInfo from "src/components/GameInfo.vue";
import EngineEval from "src/components/EngineEval.vue";
import GameNavControls from "src/components/GameNavControls.vue";
import Pgn from "src/components/Pgn.vue";
import Fen from "src/components/Fen.vue";
import EvalBar from "src/components/EvalBar.vue";
import PgnLoader from "src/components/PgnLoader.vue";
import PgnList from "src/components/PgnList.vue";
import SettingsBar from "src/components/SettingsBar.vue";

const chessStore = useChessStore();
const { headers } = storeToRefs(chessStore.headers);

const whiteName = computed(() => {
  if (headers && headers.White) {
    console.log("headers");
    return headers.White;
  } else {
    return "fsf";
  }
});
const blackName = computed(() => {
  if (headers && headers.Black) {
    return headers.Black;
  } else {
    return "yeet";
  }
});
const loadpgn = () => {
  console.log("loadpgn running");
  chessStore.loadPgn(`[Event "Lagos Friends of Chess op 1st"]
[Site "Lagos"]
[Date "2013.09.08"]
[Round "6"]
[White "Sorungbe, Ademola"]
[Black "Adu, Oladapo"]
[Result "0-1"]
[ECO "B87"]
[BlackElo "2214"]
[PlyCount "42"]
[EventDate "2013.09.06"]
[EventType "swiss"]
[EventRounds "6"]
[EventCountry "NGR"]
[SourceTitle "EXT 2015"]
[Source "ChessBase"]
[SourceDate "2014.11.20"]
[SourceVersion "1"]
[SourceVersionDate "2014.11.20"]
[SourceQuality "1"]

1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bc4 e6 7. Bb3 b5 8. Bg5
Be7 9. Qf3 Qb6 10. O-O-O Nbd7 11. e5 Bb7 12. Qh3 dxe5 13. Nf3 a5 14. a4 Nc5 15.
Nxe5 Nxb3+ 16. cxb3 b4 17. Nb5 Qc5+ 18. Kb1 Qxe5 19. Bxf6 Bxf6 20. Nd6+ Kf8 21.
Rd2 Bd5 0-1

`);
};
const getEvaluation = () => {
  console.log("get evaluation");
  const fen = chessStore.game[chessStore.gameIndex].fen;
  chessStore.evaluate(fen);
};
</script>

<style></style>
