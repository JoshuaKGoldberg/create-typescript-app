const indicatorAfterAllContributors = /<!--\s*ALL-CONTRIBUTORS-LIST:END\s*-->/;
const indicatorAfterAllContributorsSpellCheck =
	/<!--\s*spellchecker:\s*enable\s*-->/;

const indicatorBeforeTemplatedBy =
	/> .* This package was templated with |<!-- You can remove this notice/;

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

	const templatedByMatch = indicatorBeforeTemplatedBy.exec(readme);

	return readme
		.slice(
			indexAfterContributors.index + indexAfterContributors[0].length,
			templatedByMatch?.index,
		)
		.trim();
}
