import { intakeFile } from "./intakeFile.mjs";
import { load } from "js-yaml";
//#region src/blocks/intake/intakeFileAsYaml.ts
function intakeFileAsYaml(files, filePath) {
	const file = intakeFile(files, filePath) ?? intakeFile(files, [...filePath.slice(0, filePath.length - 1), filePath[filePath.length - 1].replace(/\.yaml$/i, ".yml")]);
	try {
		return file && load(file[0]);
	} catch {
		return;
	}
}
//#endregion
export { intakeFileAsYaml };
