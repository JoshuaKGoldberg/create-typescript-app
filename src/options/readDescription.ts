import { packageData } from "../data/packageData.js";
import { PartialPackageData } from "../types.js";
import { readDescriptionFromReadme } from "./readDescriptionFromReadme.js";

export async function readDescription(
	getPackageData: () => Promise<PartialPackageData>,
	getReadme: () => Promise<string>,
) {
	const { description: inferred } = await getPackageData();
	if (!inferred) {
		return undefined;
	}

	const { description: existing } = packageData;
	const fromReadme = await readDescriptionFromReadme(getReadme);

	if (fromReadme?.replaceAll(/<\s*(?:\/\s*)?\w+\s*>/gu, "") === inferred) {
		return fromReadme;
	}

	return existing === inferred ? undefined : inferred;
}
