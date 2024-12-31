import { PartialPackageData } from "../shared/types.js";
import { sourcePackageJson } from "./blocks/sourcePackageJson.js";

const paragraphStarter = `<p align="center">`;

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

export async function readDescriptionFromReadme(
	getReadme: () => Promise<string>,
) {
	const readme = await getReadme();

	const paragraphStart = readme.indexOf(paragraphStarter);
	if (paragraphStart === -1) {
		return undefined;
	}

	const paragraphEnd = readme.indexOf("</p>");
	if (paragraphEnd < paragraphStart + paragraphStarter.length + 2) {
		return undefined;
	}

	return readme
		.slice(paragraphStart + paragraphStarter.length, paragraphEnd)
		.replaceAll(/\s+/gu, " ")
		.trim();
}
