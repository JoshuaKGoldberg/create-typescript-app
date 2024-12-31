import { PartialPackageData } from "../shared/types.js";
import { sourcePackageJson } from "./blocks/sourcePackageJson.js";
import { readDescriptionFromReadme } from "./readDescriptionFromReadme.js";

export async function readDescription(
	getPackageData: () => Promise<PartialPackageData>,
	getReadme: () => Promise<string>,
) {
	const { description: inferred } = await getPackageData();
	if (!inferred) {
		return undefined;
	}

	const { description: existing } = sourcePackageJson;
	const fromReadme = await readDescriptionFromReadme(getReadme);

	if (fromReadme?.replaceAll(/<\s*(?:\/\s*)?\w+\s*>/gu, "") === inferred) {
		return fromReadme;
	}

	return existing === inferred ? undefined : inferred;
}
