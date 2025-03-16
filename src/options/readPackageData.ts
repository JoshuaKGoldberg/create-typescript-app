import { PartialPackageData } from "../types.js";

export async function readPackageData(
	getPackageDataFull: () => Promise<PartialPackageData>,
) {
	const original = await getPackageDataFull();

	return {
		dependencies: original.dependencies,
		devDependencies: original.devDependencies,
		scripts: original.scripts,
	};
}
