import { swallowError } from "../utils/swallowError.mjs";
import { inputFromFile } from "input-from-file";
//#region src/options/readFunding.ts
async function readFunding(take) {
	return swallowError(await take(inputFromFile, { filePath: ".github/FUNDING.yaml" }))?.split(":")[1]?.trim();
}
//#endregion
export { readFunding };
