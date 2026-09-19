//#region src/blocks/files/removeUsesQuotes.ts
function removeUsesQuotes(original) {
	return original.replaceAll(/ uses: '.+'/gu, (line) => line.replaceAll("'", ""));
}
//#endregion
export { removeUsesQuotes };
