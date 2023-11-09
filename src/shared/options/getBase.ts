import { readPackageData } from "../packages.js";
import { OptionsBase } from "../types.js";

const commonScripts = new Set(["lint:knip", "should-semantic-release", "test"]);

const everythingScripts = new Set([
	"lint:md",
	"lint:package-json",
	"lint:packages",
	"lint:spelling",
]);
export async function getBase(): Promise<OptionsBase> {
	const scripts = Object.keys((await readPackageData()).scripts ?? {});

	if (
		scripts.reduce(
			(acc, curr) => (everythingScripts.has(curr) ? acc + 1 : acc),
			0,
		) >= 3
	) {
		return "everything";
	}

	if (
		scripts.reduce(
			(acc, curr) => (commonScripts.has(curr) ? acc + 1 : acc),
			0,
		) >= 2
	) {
		return "common";
	}

	return "minimum";
}
