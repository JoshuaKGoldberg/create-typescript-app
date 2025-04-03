import { Documentation } from "../schemas.js";

export async function readDocumentation(
	getDevelopmentDocumentation: () => Promise<string | undefined>,
	getReadmeAdditional: () => Promise<string | undefined>,
	getReadmeExplainer: () => Promise<string | undefined>,
	getReadmeUsage: () => Promise<string>,
): Promise<Documentation> {
	const [additional, explainer, development, usage] = await Promise.all([
		getReadmeAdditional(),
		getReadmeExplainer(),
		getDevelopmentDocumentation(),
		getReadmeUsage(),
	]);

	return {
		development,
		readme: {
			additional,
			explainer,
			usage,
		},
	};
}
