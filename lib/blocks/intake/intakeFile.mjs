//#region src/blocks/intake/intakeFile.ts
function intakeFile(files, filePath) {
	if (!filePath.length) return;
	const nextFilePath = (typeof filePath[0] === "string" ? [filePath[0]] : filePath[0]).find((candidate) => candidate in files);
	if (!nextFilePath) return;
	const entry = files[nextFilePath];
	if (filePath.length === 1) return Array.isArray(entry) ? entry : void 0;
	return typeof entry === "object" && !Array.isArray(entry) ? intakeFile(entry, filePath.slice(1)) : void 0;
}
//#endregion
export { intakeFile };
