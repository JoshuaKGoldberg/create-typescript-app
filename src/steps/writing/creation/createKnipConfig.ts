import { readFileSafeAsJson } from "../../../shared/readFileSafeAsJson.js";
import { PartialPackageData } from "../../../shared/types.js";
import { formatJson } from "./formatters/formatJson.js";

export async function createKnipConfig() {
	const existingPackageJson = (await readFileSafeAsJson(
		"./package.json",
	)) as null | PartialPackageData;

	return await formatJson({
		$schema: `https://unpkg.com/knip@${existingPackageJson?.devDependencies?.knip ?? "latest"}/schema.json`,
		entry: ["src/index.ts!"],
		ignoreExportsUsedInFile: {
			interface: true,
			type: true,
		},
		project: ["src/**/*.ts!"],
	});
}
