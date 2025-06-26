const startUsage = "## Usage";

export async function readReadmeUsage(getReadme: () => Promise<string>) {
	const readme = await getReadme();

	const indexOfUsage = readme.indexOf(startUsage);
	if (indexOfUsage === -1) {
		return undefined;
	}

	const offset = indexOfUsage + startUsage.length;
	const indexOfNextKnownHeading = readme
		.slice(offset)
		.search(/## (?:Development|Contributing|Contributors)/);
	if (indexOfNextKnownHeading === -1) {
		return readme.slice(offset) || undefined;
	}

	const usage = readme.slice(offset, indexOfNextKnownHeading + offset).trim();

	return usage || undefined;
}
