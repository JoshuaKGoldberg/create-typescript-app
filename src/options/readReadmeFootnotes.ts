export const indicatorTemplatedBy =
	/> .* This package (?:is|was) (?:based|build|templated) (?:on|with) |<!-- You can remove this notice/;

export async function readReadmeFootnotes(getReadme: () => Promise<string>) {
	const readme = await getReadme();
	if (!readme) {
		return undefined;
	}

	const indexOfTemplatedBy = indicatorTemplatedBy.exec(readme)?.index;
	if (!indexOfTemplatedBy) {
		return undefined;
	}

	const indexOfNextLine = readme.indexOf("\n", indexOfTemplatedBy);

	return readme.slice(indexOfNextLine).trim() || undefined;
}
