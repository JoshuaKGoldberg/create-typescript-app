import { indicatorsTemplatedBy } from "./readReadmeFootnotes.js";

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

	const indexOfFirstTemplatedBy = indicatorsTemplatedBy.reduce(
		(smallest, indicator) => {
			const indexOf = indicator.exec(readme)?.index;
			return indexOf ? Math.min(smallest, indexOf) : smallest;
		},
		readme.length,
	);

	return readme
		.slice(
			indexAfterContributors.index + indexAfterContributors[0].length,
			indexOfFirstTemplatedBy,
		)
		.trim();
}
