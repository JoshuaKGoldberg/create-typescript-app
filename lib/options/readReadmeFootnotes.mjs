//#region src/options/readReadmeFootnotes.ts
const indicatorsTemplatedBy = [/> .* This package (?:is|was) (?:based|build|templated) (?:on|with)/, /<!-- You can remove this notice/];
async function readReadmeFootnotes(getReadme) {
	const readme = await getReadme();
	if (!readme) return;
	const indexOfLastTemplatedBy = indicatorsTemplatedBy.reduce((largest, indicator) => {
		const indexOf = indicator.exec(readme)?.index;
		return indexOf ? Math.max(largest, indexOf) : largest;
	}, 0);
	if (!indexOfLastTemplatedBy) return;
	const indexOfNextLine = readme.indexOf("\n", indexOfLastTemplatedBy);
	return readme.slice(indexOfNextLine).trim() || void 0;
}
//#endregion
export { indicatorsTemplatedBy, readReadmeFootnotes };
