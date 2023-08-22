import { $ } from "execa";

import { readFileSafe } from "./readFileSafe.js";
import { PartialPackageData } from "./types.js";

export async function readPackageData() {
	return JSON.parse(
		await readFileSafe("./package.json", "{}"),
	) as PartialPackageData;
}

export async function removeDependencies(
	packageNames: string[],
	packageData: PartialPackageData,
) {
	await $`pnpm remove ${packageNames.filter(
		packageExists(packageData.dependencies),
	)}`;
}

export async function removeDevDependencies(
	packageNames: string[],
	packageData: PartialPackageData,
) {
	await $`pnpm remove ${packageNames.filter(
		packageExists(packageData.devDependencies),
	)} -D`;
}

function packageExists(listing: Record<string, string> = {}) {
	return (packageName: string) => packageName in listing;
}
