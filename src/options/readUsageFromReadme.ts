const startUsage = "## Usage";

export function readUsageFromReadme(readme: string) {
	const indexOfUsage = readme.indexOf(startUsage);
	if (indexOfUsage === -1) {
		return undefined;
	}

	const offset = indexOfUsage + startUsage.length;
	const indexOfNextKnownHeading = readme
		.slice(offset)
		.search(/## (?:Development|Contributing|Contributors)/);
	if (indexOfNextKnownHeading === -1) {
		return readme.slice(offset);
	}

	const usage = readme.slice(offset, indexOfNextKnownHeading + offset).trim();

	return usage ? usage : undefined;
}
