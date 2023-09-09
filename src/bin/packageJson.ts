import { readFileSafeAsJson } from "../shared/readFileSafeAsJson.js";

export async function getVersionFromPackageJson(): Promise<string | undefined> {
	const data = (await readFileSafeAsJson("package.json")) as any;

	if (
		typeof data === "object" &&
		data !== null &&
		typeof data.version === "string"
	) {
		return data.version;
	}

	return undefined;
}
