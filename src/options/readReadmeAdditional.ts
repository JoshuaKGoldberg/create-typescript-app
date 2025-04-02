const indicatorAfterContributors =
	/<!--\s*(?:spellchecker:\s*enable|ALL-CONTRIBUTORS-LIST:END)\s*-->/;

const indicatorBeforeTemplatedBy =
	/> .* This package was templated with |<!-- You can remove this notice/;

export async function readReadmeAdditional(getReadme: () => Promise<string>) {
	const readme = await getReadme();
	if (!readme) {
		return undefined;
	}

	const indexAfterContributors = indicatorAfterContributors.exec(readme);
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
