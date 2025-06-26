import { marked } from "marked";

import { packageData } from "../data/packageData.js";
import { PartialPackageData } from "../types.js";
import { htmlToTextSafe } from "../utils/htmlToTextSafe.js";
import { readDescriptionFromReadme } from "./readDescriptionFromReadme.js";

export async function readDescription(
	getPackageData: () => Promise<PartialPackageData>,
	getReadme: () => Promise<string>,
	getRepository: () => Promise<string | undefined>,
) {
	// If we there is no package.json yet, this is probably setup mode.
	const { description: fromPackageJson } = await getPackageData();
	if (!fromPackageJson) {
		return undefined;
	}

	// If only a a package.json exists, this is probably transition mode.
	// We can use the package.json's description as the only source of truth.
	const fromReadme = await readDescriptionFromReadme(getReadme);
	if (!fromReadme) {
		return marked.parseInline(fromPackageJson);
	}

	// If the package.json is create-typescript-app's but the repository isn't,
	// we're almost certainly in transition mode after cloning the template.
	if (
		(await getRepository()) !== "create-typescript-app" &&
		fromPackageJson === packageData.description
	) {
		return undefined;
	}

	const fromPackageJsonNormalized = htmlToTextSafe(
		await marked.parseInline(fromPackageJson),
	);
	const fromReadmeNormalized = htmlToTextSafe(fromReadme);

	// If the package.json and README.md don't match, we prefer the package.json,
	// as it's what is used in publishing to npm.
	if (fromReadmeNormalized !== fromPackageJsonNormalized) {
		return await marked.parseInline(fromPackageJson);
	}

	// Otherwise, if they do match, the README.md may have more rich HTML text.
	return fromReadme;
}
