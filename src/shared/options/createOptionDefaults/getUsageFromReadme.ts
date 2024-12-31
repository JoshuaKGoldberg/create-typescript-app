const startDevelopment = "## Development";
const startUsage = "## Usage";

export function getUsageFromReadme(readme: string) {
	const indexOfUsage = readme.indexOf(startUsage);
	if (indexOfUsage === -1) {
		return undefined;
	}

	const indexOfDevelopment = readme.indexOf(
		startDevelopment,
		indexOfUsage + startUsage.length,
	);
	if (indexOfDevelopment === -1) {
		return undefined;
	}

	const usage = readme
		.slice(indexOfUsage + startUsage.length, indexOfDevelopment)
		.trim();

	return usage ? usage : undefined;
}
