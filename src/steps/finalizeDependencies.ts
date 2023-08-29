import { execaCommand } from "execa";

import { readPackageData, removeDependencies } from "../shared/packages.js";
import { Options } from "../shared/types.js";

export async function finalizeDependencies(options: Options) {
	const devDependencies = [
		"@types/eslint",
		"@typescript-eslint/eslint-plugin",
		"@typescript-eslint/parser",
		"eslint",
		"eslint-config-prettier",
		"eslint-plugin-deprecation",
		"eslint-plugin-eslint-comments",
		"eslint-plugin-import",
		"eslint-plugin-jsdoc",
		"eslint-plugin-n",
		"eslint-plugin-regexp",
		"husky",
		"lint-staged",
		"prettier",
		"prettier-plugin-curly",
		"prettier-plugin-packagejson",
		"tsup",
		"typescript",
		...(options.excludeContributors ? [] : ["all-contributors-cli"]),
		...(options.excludeLintJson
			? []
			: ["eslint-plugin-jsonc", "jsonc-eslint-parser"]),
		...(options.excludeLintKnip ? [] : ["knip"]),
		...(options.excludeLintMd
			? []
			: [
					"eslint-plugin-markdown",
					"markdownlint",
					"markdownlint-cli",
					"sentences-per-line",
			  ]),
		...(options.excludeLintPackageJson
			? []
			: ["npm-package-json-lint", "npm-package-json-lint-config-default"]),
		...(options.excludeLintPerfectionist
			? []
			: ["eslint-plugin-perfectionist"]),
		...(options.excludeLintSpelling ? [] : ["cspell"]),
		...(options.excludeLintYml
			? []
			: ["eslint-plugin-yml", "yaml-eslint-parser"]),
		...(options.excludeReleases
			? []
			: ["release-it", "should-semantic-release"]),
		...(options.excludeTests
			? []
			: [
					"@vitest/coverage-v8",
					"console-fail-test",
					"eslint-plugin-no-only-tests",
					"eslint-plugin-vitest",
					"vitest",
			  ]),
	]
		.filter(Boolean)
		.sort()
		.map((packageName) => `${packageName}@latest`)
		.join(" ");

	await execaCommand(`pnpm add ${devDependencies} -D`);

	if (!options.excludeContributors) {
		await execaCommand(`npx all-contributors-cli generate`);
		await removeDependencies(
			["all-contributors-cli", "all-contributors-for-repository"],
			(await readPackageData()).devDependencies,
			"-D",
		);
	}

	await execaCommand("pnpm run format:write");
}
