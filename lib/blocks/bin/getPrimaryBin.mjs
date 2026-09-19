//#region src/blocks/bin/getPrimaryBin.ts
function getPrimaryBin(bin, repository) {
	return typeof bin === "object" ? bin[repository] : bin;
}
//#endregion
export { getPrimaryBin };
