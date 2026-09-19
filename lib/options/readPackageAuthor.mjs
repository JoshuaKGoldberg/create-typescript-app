import parse from "parse-author";
//#region src/options/readPackageAuthor.ts
async function readPackageAuthor(getPackageDataFull) {
	const packageData = await getPackageDataFull();
	switch (typeof packageData.author) {
		case "object": return packageData.author;
		case "string": return parse(packageData.author);
		default: return {};
	}
}
//#endregion
export { readPackageAuthor };
