export const indicatorsTemplatedBy = [
	/> .* This package (?:is|was) (?:based|build|templated) (?:on|with)/,
	/<!-- You can remove this notice/,
];

export async function readReadmeFootnotes(getReadme: () => Promise<string>) {
	const readme = await getReadme();
	if (!readme) {
		return undefined;
	}

	const indexOfLastTemplatedBy = Math.max(
		0,
		...indicatorsTemplatedBy.flatMap((indicator) =>
			Array.from(
				readme.matchAll(new RegExp(indicator, "g")),
				(match) => match.index,
			),
		),
	);
	if (!indexOfLastTemplatedBy) {
		return undefined;
	}

	const indexOfNextLine = readme.indexOf("\n", indexOfLastTemplatedBy);

	return readme.slice(indexOfNextLine).trim() || undefined;
}
