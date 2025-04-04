export const indicatorsTemplatedBy = [
	/> .* This package (?:is|was) (?:based|build|templated) (?:on|with)/,
	/<!-- You can remove this notice/,
];

export async function readReadmeFootnotes(getReadme: () => Promise<string>) {
	const readme = await getReadme();
	if (!readme) {
		return undefined;
	}

	const indexOfLastTemplatedBy = indicatorsTemplatedBy.reduce(
		(largest, indicator) => {
			const indexOf = indicator.exec(readme)?.index;
			return indexOf ? Math.max(largest, indexOf) : largest;
		},
		0,
	);
	if (!indexOfLastTemplatedBy) {
		return undefined;
	}

	const indexOfNextLine = readme.indexOf("\n", indexOfLastTemplatedBy);

	return readme.slice(indexOfNextLine).trim() || undefined;
}
