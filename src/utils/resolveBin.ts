import { findPackageJSON } from "node:module";
import path from "node:path";

// TODO: try to see if we can avoid this altogether...
// https://github.com/JoshuaKGoldberg/create-typescript-app/issues/1992
export function resolveBin(bin: string) {
	const [packageName, ...segments] = bin.split("/");
	const packagePath = findPackageJSON(packageName, import.meta.url);
	if (!packagePath) {
		throw new Error(`Could not find package: ${packageName}`);
	}

	return path.join(path.dirname(packagePath), ...segments);
}
