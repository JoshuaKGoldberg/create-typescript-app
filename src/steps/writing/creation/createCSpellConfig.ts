import { Options } from "../../../shared/types.js";
import { formatJson } from "./formatters/formatJson.js";

export async function createCSpellConfig(
	options: Pick<
		Options,
		| "excludeAllContributors"
		| "excludeLintMd"
		| "excludeTemplatedBy"
		| "excludeTests"
	>,
) {
	const words = [
		"tseslint",
		!options.excludeLintMd && "markdownlint",
		!options.excludeTemplatedBy && "joshuakgoldberg",
		!options.excludeTests && "vitest",
	]
		.filter(Boolean)
		.sort();

	return await formatJson({
		dictionaries: ["npm", "node", "typescript"],
		ignorePaths: [
			...(options.excludeAllContributors ? [] : [".all-contributorsrc"]),
			".github",
			"CHANGELOG.md",
			...(options.excludeTests ? [] : ["coverage"]),
			"lib",
			"node_modules",
			"pnpm-lock.yaml",
		],
		words,
	});
}
