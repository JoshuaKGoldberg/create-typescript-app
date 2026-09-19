import { fileURLToPath } from "node:url";
//#region src/utils/resolveBin.ts
function resolveBin(bin) {
	return fileURLToPath(import.meta.resolve(bin));
}
//#endregion
export { resolveBin };
