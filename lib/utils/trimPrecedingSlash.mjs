//#region src/utils/trimPrecedingSlash.ts
function trimPrecedingSlash(filePath) {
	return filePath?.replace(/^\.\//, "");
}
//#endregion
export { trimPrecedingSlash };
