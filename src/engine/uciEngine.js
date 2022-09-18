export default class Engine {
  constructor() {
    const wasmSupported =
      typeof WebAssembly === "object" &&
      WebAssembly.validate(
        Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00)
      );

    this.stockfish = new Worker(
      wasmSupported
        ? new URL("./stockfish.wasm.js", import.meta.url)
        : new URL("./stockfish.js", import.meta.url)
    );
    this.sendMessage = (message) => {
      this.stockfish.postMessage(message);
    };
    this.onMessage = (callback) => {
      this.stockfish.addEventListener("message", (e) => {
        callback(e.data);
      });
    };
    // Init engine
    this.sendMessage("uci");
    this.sendMessage("isready");
  }

  // SEND COMMANDS TO STOCKFISH
  // Helpers. Can be called directly, but requires you to use sendMessage strings, which are annoying.

  // Common sendMessage commands.
  setPosition(fenString) {
    this.sendMessage(`position fen ${fenString}`);
  }
  evaluate(depth = 20) {
    if (depth > 25) depth = 25;
    if (depth < 15) depth = 15;
    this.sendMessage(`go depth ${depth}`);
  }
  stop() {
    this.sendMessage("stop"); // Run when changing positions
  }
  quit() {
    this.sendMessage("quit"); // Good to run this before unmounting.
  }
}
