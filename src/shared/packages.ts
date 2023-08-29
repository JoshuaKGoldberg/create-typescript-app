import { execaCommand } from "execa";

import { readFileSafe } from "./readFileSafe.js";
import { PartialPackageData } from "./types.js";

export async function readPackageData() {
	return JSON.parse(
		await readFileSafe("./package.json", "{}"),
	) as PartialPackageData;
}

export async function removeDependencies(
	packageNames: string[],
	existing: Record<string, string> = {},
	flags = "",
) {
	const present = packageNames.filter((packageName) => packageName in existing);

	if (present.length) {
		await execaCommand(
			`pnpm remove ${present.join(" ")}${flags ? ` ${flags}` : ""}`,
		);
	}
}
