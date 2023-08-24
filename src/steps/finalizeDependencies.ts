import { execaCommand } from "execa";

import { readPackageData, removeDevDependencies } from "../shared/packages.js";
import { InputValues } from "../shared/types.js";

export async function finalizeDependencies(values: InputValues) {
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
		...(values.excludeContributors ? [] : ["all-contributors-cli"]),
		...(values.excludeLintJson
			? []
			: ["eslint-plugin-jsonc", "jsonc-eslint-parser"]),
		...(values.excludeLintKnip ? [] : ["knip"]),
		...(values.excludeLintMd
			? []
			: [
					"eslint-plugin-markdown",
					"markdownlint",
					"markdownlint-cli",
					"sentences-per-line",
			  ]),
		...(values.excludeLintPackageJson
			? []
			: ["npm-package-json-lint", "npm-package-json-lint-config-default"]),
		...(values.excludeLintPerfectionist ? [] : ["eslint-plugin-perfectionist"]),
		...(values.excludeLintSpelling ? [] : ["cspell"]),
		...(values.excludeLintYml
			? []
			: ["eslint-plugin-yml", "yaml-eslint-parser"]),
		...(values.excludeReleases
			? []
			: ["release-it", "should-semantic-release"]),
		...(values.excludeTests
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

	if (!values.excludeContributors) {
		await execaCommand(`npx all-contributors-cli generate`);
		await removeDevDependencies(
			["all-contributors-cli", "all-contributors-for-repository"],
			await readPackageData(),
		);
	}

	await execaCommand("pnpm run format:write");
}
