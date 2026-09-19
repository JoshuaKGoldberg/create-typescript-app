//#region src/options/readDocumentation.ts
async function readDocumentation(getDevelopmentDocumentation, getReadmeAdditional, getReadmeExplainer, getReadmeFootnotes, getReadmeUsage) {
	const [additional, explainer, footnotes, development, usage] = await Promise.all([
		getReadmeAdditional(),
		getReadmeExplainer(),
		getReadmeFootnotes(),
		getDevelopmentDocumentation(),
		getReadmeUsage()
	]);
	return {
		development,
		readme: {
			additional,
			explainer,
			footnotes,
			usage
		}
	};
}
//#endregion
export { readDocumentation };
