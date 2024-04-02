import { readPackageData } from "../packages.js";
import { OptionsBase } from "../types.js";

const commonScripts = new Set(["lint:knip", "test"]);

const everythingScripts = new Set([
	"lint:md",
	"lint:packages",
	"lint:spelling",
]);

export async function getBase(): Promise<OptionsBase> {
	const scripts = Object.keys((await readPackageData()).scripts ?? {});

	if (scripts.filter((script) => everythingScripts.has(script)).length >= 3) {
		return "everything";
	}

	if (scripts.filter((script) => commonScripts.has(script)).length >= 2) {
		return "common";
	}

	return "minimum";
}
