import { readFileSafeAsJson } from "../shared/readFileSafeAsJson.js";

interface PackageWithVersion {
	version?: string;
}

export async function getVersionFromPackageJson(): Promise<string | undefined> {
	const path = new URL("../../package.json", import.meta.url);
	const data = (await readFileSafeAsJson(path)) as PackageWithVersion;

	if (typeof data === "object" && typeof data.version === "string") {
		return data.version;
	}

	return undefined;
}
