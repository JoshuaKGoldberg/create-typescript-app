import { swallowErrorAsync } from "../utils/swallowErrorAsync.mjs";
import { inputFromFileJSON } from "input-from-file-json";
//#region src/options/readWords.ts
async function readWords(take) {
	return (await swallowErrorAsync(take(inputFromFileJSON, { filePath: "./cspell.json" })) || {}).words;
}
//#endregion
export { readWords };
