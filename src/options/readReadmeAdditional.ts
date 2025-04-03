import { indicatorTemplatedBy } from "./readReadmeFootnotes.js";

const indicatorAfterAllContributors = /<!--\s*ALL-CONTRIBUTORS-LIST:END\s*-->/;
const indicatorAfterAllContributorsSpellCheck =
	/<!--\s*spellchecker:\s*enable\s*-->/;

export async function readReadmeAdditional(getReadme: () => Promise<string>) {
	const readme = await getReadme();
	if (!readme) {
		return undefined;
	}

	const indexAfterContributors =
		indicatorAfterAllContributorsSpellCheck.exec(readme) ??
		indicatorAfterAllContributors.exec(readme);
	if (!indexAfterContributors) {
		return undefined;
	}

	const templatedByMatch = indicatorTemplatedBy.exec(readme);

	return readme
		.slice(
			indexAfterContributors.index + indexAfterContributors[0].length,
			templatedByMatch?.index,
		)
		.trim();
}
