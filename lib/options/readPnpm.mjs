//#region src/options/readPnpm.ts
async function readPnpm(packageData) {
	const { packageManager } = await packageData();
	return packageManager?.startsWith("pnpm@") ? packageManager.slice(5) : "11.22.0";
}
//#endregion
export { readPnpm };
