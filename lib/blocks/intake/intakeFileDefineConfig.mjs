import { intakeFile } from "./intakeFile.mjs";
import JSON5 from "json5";
//#region src/blocks/intake/intakeFileDefineConfig.ts
function intakeFileDefineConfig(files, filePath) {
	const file = intakeFile(files, filePath);
	if (!file) return;
	const normalized = file[0].replaceAll(/[\n\r]/g, "");
	const matched = /defineConfig\(\{(.+)\}\)\s*(?:;\s*)?$/u.exec(normalized);
	if (!matched) return;
	const rawData = tryParseJSON5(`{${matched[1]}}`);
	if (!rawData || typeof rawData !== "object") return;
	return rawData;
}
function tryParseJSON5(text) {
	try {
		return JSON5.parse(text);
	} catch {
		return;
	}
}
//#endregion
export { intakeFileDefineConfig };
