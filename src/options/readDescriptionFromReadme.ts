const paragraphCloser = "</p>";
const paragraphStarter = `<p align="center">`;

export async function readDescriptionFromReadme(
	getReadme: () => Promise<string>,
) {
	const readme = await getReadme();

	const paragraphStart = readme.indexOf(paragraphStarter);
	if (paragraphStart === -1) {
		return;
	}

	const paragraphEnd = readme.indexOf(paragraphCloser);
	return paragraphEnd < paragraphStart + paragraphStarter.length + 2
		? undefined
		: readme
				.slice(paragraphStart + paragraphStarter.length, paragraphEnd)
				.replaceAll(/\s+/gu, " ")
				.trim();
}
