import { createRequire } from "node:module";
import semver from "semver";

const require = createRequire(import.meta.url);

export const packageData =
	// Importing from above src/ would expand the TS build rootDir
	require("../../package.json") as typeof import("../../package.json");

export function getPackageDependencies(...names: string[]) {
	return Object.fromEntries(
		names.map((name) => {
			return [name, getPackageDependency(name)];
		}),
	);
}

function getPackageDependency(name: string) {
	const version =
		getPackageInner("devDependencies", name) ??
		getPackageInner("dependencies", name);

	if (!version) {
		throw new Error(
			`'${name}' is neither in package.json's dependencies nor its devDependencies.`,
		);
	}

	return (
		(semver.validRange(version) && semver.minVersion(version)?.version) ||
		version
	);
}

function getPackageInner(
	key: "dependencies" | "devDependencies",
	name: string,
) {
	const inner = packageData[key];

	return inner[name as keyof typeof inner] as string | undefined;
}
