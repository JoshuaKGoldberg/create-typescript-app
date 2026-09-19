import * as fs from "node:fs/promises";
//#region src/options/readFileSafe.ts
async function readFileSafe(filePath, fallback) {
	try {
		return (await fs.readFile(filePath)).toString();
	} catch {
		return fallback;
	}
}
//#endregion
export { readFileSafe };
