import { indicatorsTemplatedBy } from "./readReadmeFootnotes.mjs";
//#region src/options/readReadmeAdditional.ts
const indicatorAfterAllContributors = /<!--\s*ALL-CONTRIBUTORS-LIST:END\s*-->/;
const indicatorAfterAllContributorsSpellCheck = /<!--\s*spellchecker:\s*enable\s*-->/;
async function readReadmeAdditional(getReadme) {
	const readme = await getReadme();
	if (!readme) return;
	const indexAfterContributors = indicatorAfterAllContributorsSpellCheck.exec(readme) ?? indicatorAfterAllContributors.exec(readme);
	if (!indexAfterContributors) return;
	const indexOfFirstTemplatedBy = indicatorsTemplatedBy.reduce((smallest, indicator) => {
		const indexOf = indicator.exec(readme)?.index;
		return indexOf ? Math.min(smallest, indexOf) : smallest;
	}, readme.length);
	return readme.slice(indexAfterContributors.index + indexAfterContributors[0].length, indexOfFirstTemplatedBy).trim();
}
//#endregion
export { readReadmeAdditional };
