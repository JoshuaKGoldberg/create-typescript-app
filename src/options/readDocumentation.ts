import { Documentation } from "../schemas.js";

export async function readDocumentation(
	getDevelopmentDocumentation: () => Promise<string | undefined>,
	getReadmeAdditional: () => Promise<string | undefined>,
	getReadmeExplainer: () => Promise<string | undefined>,
	getReadmeFootnotes: () => Promise<string | undefined>,
	getReadmeUsage: () => Promise<string | undefined>,
): Promise<Documentation> {
	const [additional, explainer, footnotes, development, usage] =
		await Promise.all([
			getReadmeAdditional(),
			getReadmeExplainer(),
			getReadmeFootnotes(),
			getDevelopmentDocumentation(),
			getReadmeUsage(),
		]);

	return {
		development,
		readme: {
			additional,
			explainer,
			footnotes,
			usage,
		},
	};
}
