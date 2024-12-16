import { execaCommand } from "execa";

import { readPackageData, removeDependencies } from "../shared/packages.js";
import { Options } from "../shared/types.js";

export async function finalizeDependencies(options: Options) {
	const devDependencies = [
		"@eslint/js",
		"@types/node",
		"eslint-plugin-n",
		"eslint",
		"husky",
		"lint-staged",
		"prettier-plugin-curly",
		"prettier-plugin-packagejson",
		"prettier-plugin-sh",
		"prettier",
		"tsup",
		"typescript-eslint",
		"typescript",
		...(options.excludeAllContributors ? [] : ["all-contributors-cli"]),
		...(options.excludeLintESLint
			? []
			: ["@eslint-community/eslint-plugin-eslint-comments"]),
		...(options.excludeLintJSDoc ? [] : ["eslint-plugin-jsdoc"]),
		...(options.excludeLintJson ? [] : ["eslint-plugin-jsonc"]),
		...(options.excludeLintKnip ? [] : ["knip"]),
		...(options.excludeLintMd
			? []
			: [
					"@types/eslint-plugin-markdown",
					"eslint-plugin-markdown",
					"markdownlint",
					"markdownlint-cli",
					"sentences-per-line",
				]),
		...(options.excludeLintPackageJson ? [] : ["eslint-plugin-package-json"]),
		...(options.excludeLintPerfectionist
			? []
			: ["eslint-plugin-perfectionist"]),
		...(options.excludeLintRegex ? [] : ["eslint-plugin-regexp"]),
		...(options.excludeLintSpelling ? [] : ["cspell"]),
		...(options.excludeLintYml ? [] : ["eslint-plugin-yml"]),
		...(options.excludeReleases
			? []
			: ["@release-it/conventional-changelog", "release-it"]),
		...(options.excludeTests
			? []
			: [
					"@vitest/coverage-v8",
					"@vitest/eslint-plugin",
					"console-fail-test",
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
			["all-contributors-cli"],
			(await readPackageData()).devDependencies,
			"-D",
		);
	}

	await execaCommand(`pnpm dedupe --offline`);
}
