import { createRequire } from "node:module";
import semver from "semver";

import blockDependencies from "./blockDependencies/package.json" with { type: "json" };

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

function getBlockDependency(name: string) {
	const inner = blockDependencies.dependencies;

	return inner[name as keyof typeof inner] as string | undefined;
}

function getPackageDependency(name: string) {
	const version =
		getPackageInner("devDependencies", name) ??
		getPackageInner("dependencies", name) ??
		getBlockDependency(name);

	if (!version) {
		throw new Error(
			`'${name}' is not in package.json's dependencies or devDependencies, nor in src/data/blockDependencies/package.json.`,
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
