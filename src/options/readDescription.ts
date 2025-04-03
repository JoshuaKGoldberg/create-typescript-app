import { marked } from "marked";

import { packageData } from "../data/packageData.js";
import { PartialPackageData } from "../types.js";
import { htmlToTextSafe } from "../utils/htmlToTextSafe.js";
import { readDescriptionFromReadme } from "./readDescriptionFromReadme.js";

export async function readDescription(
	getPackageData: () => Promise<PartialPackageData>,
	getReadme: () => Promise<string>,
) {
	const { description: fromPackageJson } = await getPackageData();
	if (!fromPackageJson) {
		return undefined;
	}

	const fromReadme = await readDescriptionFromReadme(getReadme);
	if (!fromReadme) {
		return fromPackageJson;
	}

	const fromPackageJsonNormalized = htmlToTextSafe(
		await marked.parseInline(fromPackageJson),
	);
	const fromReadmeNormalized = htmlToTextSafe(fromReadme);
	if (fromReadmeNormalized === fromPackageJsonNormalized) {
		return fromReadme;
	}

	return fromPackageJson === packageData.description
		? undefined
		: await marked.parseInline(fromPackageJson);
}
