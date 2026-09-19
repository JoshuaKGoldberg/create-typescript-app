//#region src/options/readKeywords.ts
async function readKeywords(getPackageData) {
	const { keywords } = await getPackageData();
	return keywords && Array.from(new Set((await getPackageData()).keywords)).sort();
}
//#endregion
export { readKeywords };
