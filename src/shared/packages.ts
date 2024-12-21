import { execaCommand } from "execa";
import path from "node:path";

import { readFileSafe } from "./readFileSafe.js";
import { PartialPackageData } from "./types.js";

export async function readPackageData(directory: string) {
	return (
		(JSON.parse(
			await readFileSafe(path.join(directory, "package.json"), "{}"),
		) as PartialPackageData | undefined) ?? {}
	);
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
