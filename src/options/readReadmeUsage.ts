const startUsage = "## Usage";

export async function readReadmeUsage(getReadme: () => Promise<string>) {
	const readme = await getReadme();

	const indexOfUsage = readme.indexOf(startUsage);
	if (indexOfUsage === -1) {
		return readme.trim() ? "" : undefined;
	}

	const remaining = readme.slice(indexOfUsage);
	const indexOfNextKnownHeading = remaining.search(
		/## (?:Development|Contributing|Contributors)/,
	);

	const usage = (
		indexOfNextKnownHeading === -1
			? remaining
			: remaining.slice(0, indexOfNextKnownHeading)
	).trim();

	return usage === startUsage ? undefined : usage;
}
