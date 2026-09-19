//#region src/options/readReadmeUsage.ts
const startUsage = "## Usage";
async function readReadmeUsage(getReadme) {
	const readme = await getReadme();
	const indexOfUsage = readme.indexOf(startUsage);
	if (indexOfUsage === -1) return;
	const offset = indexOfUsage + 8;
	const indexOfNextKnownHeading = readme.slice(offset).search(/## (?:Development|Contributing|Contributors)/);
	if (indexOfNextKnownHeading === -1) return readme.slice(offset) || void 0;
	return readme.slice(offset, indexOfNextKnownHeading + offset).trim() || void 0;
}
//#endregion
export { readReadmeUsage };
