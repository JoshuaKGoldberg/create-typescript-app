const paragraphCloser = "</p>";
const paragraphStarter = `<p align="center">`;

export async function readDescriptionFromReadme(
	getReadme: () => Promise<string>,
) {
	const readme = await getReadme();

	const paragraphStart = readme.indexOf(paragraphStarter);
	if (paragraphStart === -1) {
		return undefined;
	}

	const paragraphEnd = readme.indexOf(paragraphCloser);
	if (paragraphEnd < paragraphStart + paragraphStarter.length + 2) {
		return undefined;
	}

	return readme
		.slice(paragraphStart + paragraphStarter.length, paragraphEnd)
		.replaceAll(/\s+/gu, " ")
		.trim();
}
