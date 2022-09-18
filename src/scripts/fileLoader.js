// Accepts file and returns array.
import { pgnToArray } from "./pgnParser";

onmessage = (file) => {
  let reader = new FileReader();
  reader.onerror = (error) => {
    console.error(error);
  };
  reader.onloadend = () => {
    const gamesArr = pgnToArray(reader.result);
    postMessage(gamesArr);
    reader = null;
  };
  reader.readAsText(file.data, "utf-8");
};
