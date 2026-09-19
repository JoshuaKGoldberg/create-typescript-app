import * as fs from "node:fs/promises";
//#region src/options/readFileAsJson.ts
async function readFileAsJson(filePath) {
	try {
		return JSON.parse((await fs.readFile(filePath)).toString());
	} catch (error) {
		throw new Error(`Could not read file from ${filePath} as JSON. Please ensure the file exists and is valid JSON.`, { cause: error });
	}
}
//#endregion
export { readFileAsJson };
