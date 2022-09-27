# Chess viewer (chess-viewer)

Portable game notation (PGN) viewer and analysis board. Live demo at [chess.mattnicholson.ca](https://chess.mattnicholson.ca/).

[![Chess-Viewer-Minified.png](https://i.postimg.cc/GhQhgWQK/Chess-Viewer-Minified.png)](https://postimg.cc/jLDbLkBn)

# Installing

Chess viewer uses the Quasar CLI. Once installed, simply clone the repository, run ```npm install```, and then ```quasar dev```.

To build: ```quasar build```. Please note that you may have to manually move the stockfish.wasm file into dist/spa/assets (seems to be a rollup bug). 
