import { Chess } from "chess.js";
const chess = new Chess();
export function getHeaders(pgn) {
  const game = chess.load_pgn(pgn, { sloppy: true });
  if (game) {
    return chess.header();
  }
}
