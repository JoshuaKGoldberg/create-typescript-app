import { getNpmAuthor } from "../../shared/getNpmAuthor.js";
import { PartialPackageData } from "../../shared/types.js";

export async function readAuthorIfExists(
	existingPackage: PartialPackageData,
): Promise<string | undefined> {
	const fromPackage =
		typeof existingPackage.author === "string"
			? existingPackage.author.split("<")[0].trim()
			: existingPackage.author?.name;

	return fromPackage ?? (await getNpmAuthor());
}
