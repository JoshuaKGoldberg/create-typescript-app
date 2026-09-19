import { intakeFile } from "./intakeFile.mjs";
import JSON5 from "json5";
//#region src/blocks/intake/intakeFileAsJson.ts
function intakeFileAsJson(files, filePath) {
	const file = intakeFile(files, filePath);
	try {
		return file && JSON5.parse(file[0]);
	} catch {
		return;
	}
}
//#endregion
export { intakeFileAsJson };
