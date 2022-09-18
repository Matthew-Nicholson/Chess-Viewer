// NOTE: Chessboard.vue subscribes to state.config and updates the board automatically. This is the only meaningful state in the app, as chessground's internal state is overwritten.

// Imports
import { Chess } from "chess.js";
const chess = new Chess();
import { defineStore } from "pinia";
import { nextTick } from "vue";

// Engines
import Engine from "../engine/uciEngine";
const engine = new Engine();

// Constants
const STARTING_POSITION =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const useChessStore = defineStore("Chess", {
  state: () => ({
    autoPlaySpeed: 40,
    engineBestMove: null,
    engineEnabled: false,
    engineEval: { type: null, value: null, depth: null }, // {type: 'cp' | 'mate' }
    engineLoadError: null, // True if either engine fails.
    engineReady: false,
    engineTargetDepth: 20,
    engineWorking: false,
    evalString: "",
    game: [{ fen: STARTING_POSITION }],
    gameIndex: 0, // Need to make sure gameIndex doesn't go out of bounds.
    headers: null,
    orientation: "white",
    pgnFile: [],
    pgnFileLoading: false,
  }),
  actions: {
    // Engine (initEngine must be run in App.vue for engine to work.)
    initEngine() {
      // All engine init stuff goes here.
      try {
        if (navigator.hardwareConcurrency < 2) {
          throw new Error("Browser not compatible.");
        }
        engine.onMessage((message) => {
          this.engineEventListener(message);
        });
        engine.sendMessage("setoption name Contempt value 0");
      } catch (error) {
        this.engineLoadError = true; // Shows compatibility warning to user.
      }
    },
    killEngine() {
      engine.stockfish.terminate();
    },
    dispatcher(event, message) {
      // engineId is 0 or 1
      // Switch in case we handle other UCI messages later.
      switch (event) {
        case "id":
          // Don't care.
          break;
        case "uciok":
          // Don't care.
          break;
        case "readyok":
          this.setEngineReady();
          break;
        case "bestmove":
          this.handleBestMove(message);
          break;
        case "copyprotection":
          // Don't care.
          break;
        case "registration":
          // Don't care.
          break;
        case "option":
          // Don't care.
          break;
        case "info":
          this.handleEvaluation(message);
          break;
        default:
          // Pretty sure entire UCI protocol is handled already.
          break;
      }
    },
    engineEventListener(message) {
      const messageAsArray = message.split(" ");
      const messageType = messageAsArray[0];
      this.dispatcher(messageType, message);
    },
    setEngineReady() {
      this.engineReady = true;
    },
    handleBestMove(message) {
      const msgAsArr = message.split(" ");
      const bestMove = msgAsArr[1];
      this.engineWorking = false;
      return (this.engineBestMove = bestMove);
    },
    handleEvaluation(message) {
      const msgAsArr = message.split(" ");
      const evaluation = {
        type: msgAsArr[8],
        value: msgAsArr[9],
        depth: msgAsArr[2],
      };
      const lineStart = msgAsArr.indexOf("pv") + 1;
      const line = msgAsArr.slice(lineStart);
      this.engineWorking = true;
      this.evalString = line.join(" ");
      return (this.engineEval = evaluation);
    },
    // resetEvaluation() {
    //   this.engineEval = { type: null, value: null, depth: null };
    // },
    evaluate() {
      // This is called automatically every time the board changes. No need to call manually.
      if (!this.engineEnabled) return;
      engine.stop();
      engine.setPosition(this.fen);
      // this.resetEvaluation();
      engine.evaluate(this.engineTargetDepth);
    },
    // Game navigation
    handleUserMove(from, to, capture) {
      //Works
      const isLegal = chess.move({ from: from, to: to, promotion: "q" });
      if (!isLegal) return false;
      const fen = chess.fen();
      this.gameIndex++;
      this.game.length = this.gameIndex;
      this.game.push({ ...isLegal, fen: fen });
      return this.game;
    },
    next() {
      //Works
      if (this.gameIndex > this.game.length - 2) return;
      this.gameIndex++;
      return chess.load(this.game[this.gameIndex].fen);
    },
    back() {
      //Works
      if (this.gameIndex === 0) return;
      this.gameIndex--;
      return chess.load(this.game[this.gameIndex].fen);
    },
    changePosition(index) {
      //Works
      this.gameIndex = index;
      return chess.load(this.game[this.gameIndex].fen);
    },
    // New game.
    loadPgn(pgn) {
      //Works
      const success = chess.load_pgn(pgn);
      if (!success) return false;
      const history = chess.history();
      this.headers = chess.header();
      chess.reset();
      const moves = [{ fen: STARTING_POSITION }];
      for (let i = 0; i < history.length; i++) {
        const move = chess.move(history[i]);
        const fen = chess.fen();
        moves.push({ ...move, fen: fen });
      }
      this.game = moves;
      this.gameIndex = 0;
      chess.reset();
      return true;
    },
    loadFen(fen) {
      //Works
      const success = chess.load(fen);
      if (!success) return false;
      this.game = [{ fen: chess.fen() }];
      this.gameIndex = 0;
    },
    // PGN
    setPgnFile(arr) {
      // Workaround JS limitation by removing and replacing array in two steps.
      this.pgnFile = null;
      nextTick(() => {
        return (this.pgnFile = arr);
      });
    },
    setPgnFileLoading(bool) {
      return (this.pgnFileLoading = bool);
    },
    // Misc.
    flipBoard() {
      //Works
      return this.orientation === "white"
        ? (this.orientation = "black")
        : (this.orientation = "white");
    },
  },
  getters: {
    fen(state) {
      // Used by chessground. This should be the single source of truth for all analysis.
      if (!state.game || state.gameIndex === null) return STARTING_POSITION;
      return state.game[state.gameIndex].fen;
    },
    gameOver(state) {
      return state.gameIndex === this.pgn.length;
    },
    sideToMove(state) {
      const fen = this.fen.split(" ");
      return fen[1]; // 'w' || 'b'
    },
    lastMove(state) {
      if (!state.gameIndex) return [];
      return [state.game[state.gameIndex].from, state.game[state.gameIndex].to];
    },
    pgn(state) {
      return state.game.slice(1);
    },
    evaluation(state) {
      if (!state.engineEnabled) return null;
      const modifier = this.sideToMove === "b" ? -1 : 1; // UCI protocol gives eval from side to move. We want eval to always be from white's perspective.
      if (!state.engineEval) return null;
      const isMate = state.engineEval.type === "mate";
      if (isMate) return 100 * modifier; // Eval bar cannot go over 99, so this will always max the bar.
      return (state.engineEval.value / 100) * modifier;
    },
    evaluationString(state) {
      const chess = new Chess();
      const evalString = state.evalString;
      if (!evalString) return "";
      const moves = evalString.split(" ");
      const formattedMoves = [];
      const didLoad = chess.load(state.game[state.gameIndex].fen);
      if (!didLoad) throw new Error("FEN did not load.");
      for (const move of moves) {
        const legalMove = chess.move(move, { sloppy: true });
        if (!legalMove) return;
        formattedMoves.push(legalMove.san);
      }
      return formattedMoves.join(" ");
    },
    depth(state) {
      if (!state.engineEnabled) return null;
      if (!state.engineEval) return null;
      return state.engineEval.depth;
    },
    // importedPgns(state) {
    //   return state.pgnFile;
    // },
  },
});
