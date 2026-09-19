//#region src/options/readDescriptionFromReadme.ts
const paragraphCloser = "</p>";
const paragraphStarter = `<p align="center">`;
async function readDescriptionFromReadme(getReadme) {
	const readme = await getReadme();
	const paragraphStart = readme.indexOf(paragraphStarter);
	if (paragraphStart === -1) return;
	const paragraphEnd = readme.indexOf(paragraphCloser);
	if (paragraphEnd < paragraphStart + paragraphStarter.length + 2) return;
	return readme.slice(paragraphStart + paragraphStarter.length, paragraphEnd).replaceAll(/\s+/gu, " ").trim();
}
//#endregion
export { readDescriptionFromReadme };
