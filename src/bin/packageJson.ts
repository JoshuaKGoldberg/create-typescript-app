import { readFileSafeAsJson } from "../shared/readFileSafeAsJson.js";

export async function getVersionFromPackageJson(): Promise<string | undefined> {
	const path = new URL("../../package.json", import.meta.url);
	const data = (await readFileSafeAsJson(path)) as any;

	if (
		typeof data === "object" &&
		data !== null &&
		typeof data.version === "string"
	) {
		return data.version;
	}

	return undefined;
}
