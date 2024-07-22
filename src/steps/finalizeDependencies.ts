import { execaCommand } from "execa";

import { readPackageData, removeDependencies } from "../shared/packages.js";
import { Options } from "../shared/types.js";

export async function finalizeDependencies(options: Options) {
	const devDependencies = [
		"@eslint/js",
		"@eslint-community/eslint-plugin-eslint-comments",
		"@types/eslint-plugin-markdown",
		"@types/eslint__js",
		"eslint",
		"eslint-plugin-jsdoc",
		"eslint-plugin-n",
		"eslint-plugin-regexp",
		"husky",
		"lint-staged",
		"prettier",
		"prettier-plugin-curly",
		"prettier-plugin-sh",
		"prettier-plugin-packagejson",
		"tsup",
		"typescript",
		"typescript-eslint",
		...(options.excludeAllContributors ? [] : ["all-contributors-cli"]),
		...(options.excludeLintJson ? [] : ["eslint-plugin-jsonc"]),
		...(options.excludeLintJson && options.excludeLintPackageJson
			? []
			: ["jsonc-eslint-parser"]),
		...(options.excludeLintKnip ? [] : ["knip"]),
		...(options.excludeLintMd
			? []
			: [
					"eslint-plugin-markdown",
					"markdownlint",
					"markdownlint-cli",
					"sentences-per-line",
			  ]),
		...(options.excludeLintPackageJson ? [] : ["eslint-plugin-package-json"]),
		...(options.excludeLintPerfectionist
			? []
			: ["eslint-plugin-perfectionist"]),
		...(options.excludeLintSpelling ? [] : ["cspell"]),
		...(options.excludeLintYml ? [] : ["eslint-plugin-yml"]),
		...(options.excludeReleases
			? []
			: ["@release-it/conventional-changelog", "release-it"]),
		...(options.excludeTests
			? []
			: [
					"@vitest/coverage-v8",
					"console-fail-test",
					"eslint-plugin-vitest",
					"vitest",
			  ]),
	]
		.filter(Boolean)
		.sort()
		.map((packageName) => `${packageName}@latest`)
		.join(" ");

	await execaCommand(
		`pnpm add ${devDependencies} -D${options.offline ? " --offline" : ""}`,
	);

	if (!options.excludeAllContributors) {
		await execaCommand(`npx all-contributors-cli generate`);
		await removeDependencies(
			["all-contributors-cli", "all-contributors-for-repository"],
			(await readPackageData()).devDependencies,
			"-D",
		);
	}

	await execaCommand(`pnpm dedupe`);
}
