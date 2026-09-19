import { inputFromFile } from "input-from-file";
//#region src/options/readEmailFromCodeOfConduct.ts
async function readEmailFromCodeOfConduct(take) {
	const codeOfConduct = await take(inputFromFile, { filePath: ".github/CODE_OF_CONDUCT.md" });
	return typeof codeOfConduct === "string" && codeOfConduct.includes("Contributor Covenant Code of Conduct") ? /for enforcement at[\r\n]+(.+)\.[\r\n]+All/.exec(codeOfConduct)?.[1] : void 0;
}
//#endregion
export { readEmailFromCodeOfConduct };
