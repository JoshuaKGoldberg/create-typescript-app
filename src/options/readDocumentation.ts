import { Documentation } from "../schemas.js";

export async function readDocumentation(
	getDevelopmentDocumentation: () => Promise<string | undefined>,
	getReadmeAdditional: () => Promise<string | undefined>,
	getReadmeUsage: () => Promise<string>,
): Promise<Documentation> {
	const [additional, development, usage] = await Promise.all([
		getReadmeAdditional(),
		getDevelopmentDocumentation(),
		getReadmeUsage(),
	]);

	return {
		development,
		readme: {
			additional,
			usage,
		},
	};
}
