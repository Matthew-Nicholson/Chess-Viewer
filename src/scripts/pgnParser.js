import { Chess } from "chess.js";
const chess = new Chess(); // For testing/normalizing.
export const pgnToArray = (file) => {
  if (!file) return false;
  // Tested on chess.com, lichess.org, and Chessbase games.
  // Chessbase PGN's are often incorrectly disambiguated and need to be trashed.
  file = file.trim(); // Otherwise our last array element might be newlines.
  // NOTE: THE LINE BELOW, ON IT'S OWN, WORKS.
  // return file.split(/(?<=1-0|1\/2-1\/2|0-1|\*)(?!")/g);
  // ================================================
  // NOTE: THE COMMENTED OUT CODE WORKS AS WELL, AND IS FASTER. NOT SURE WE NEED TO VALIDATE GAMES UNTIL WE TRY TO LOAD THEM.
  // 5000 games takes 17 seconds with this code, and less than 1 second without.
  const games = file.split(/(?<=1-0|1\/2-1\/2|0-1|\*)(?!")/g);
  if (!games) return false;
  const passingGames = [];
  for (let i = 0; i < games.length; i++) {
    let canLoad = chess.load_pgn(games[i], { sloppy: true });
    if (canLoad) {
      passingGames.push(chess.pgn());
    }
  }
  if (!passingGames.length) return false;
  return passingGames;

  // ================================================
};
