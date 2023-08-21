import type { PartialPackageData } from "./types.js";

import { getNpmAuthor } from "../../shared/getNpmAuthor.js";

export async function readAuthorIfExists(
	existingPackage: PartialPackageData,
): Promise<string | undefined> {
	const fromPackage =
		typeof existingPackage.author === "string"
			? existingPackage.author.split("<")[0].trim()
			: existingPackage.author?.name;

	return fromPackage ?? (await getNpmAuthor());
}
