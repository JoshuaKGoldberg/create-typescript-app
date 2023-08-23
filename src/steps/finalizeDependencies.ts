import { execaCommand } from "execa";

import { InputValues } from "../shared/inputs.js";
import { readPackageData, removeDevDependencies } from "../shared/packages.js";

export async function finalizeDependencies({
	releases,
	unitTests,
}: Pick<InputValues, "releases" | "unitTests">) {
	const devDependencies = [
		"@types/eslint",
		"@typescript-eslint/eslint-plugin",
		"@typescript-eslint/parser",
		"all-contributors-cli",
		"cspell",
		"eslint",
		"eslint-config-prettier",
		"eslint-plugin-deprecation",
		"eslint-plugin-eslint-comments",
		"eslint-plugin-import",
		"eslint-plugin-jsdoc",
		"eslint-plugin-jsonc",
		"eslint-plugin-markdown",
		"eslint-plugin-n",
		"eslint-plugin-perfectionist",
		"eslint-plugin-regexp",
		"eslint-plugin-yml",
		"husky",
		"jsonc-eslint-parser",
		"knip",
		"lint-staged",
		"markdownlint",
		"markdownlint-cli",
		"npm-package-json-lint",
		"npm-package-json-lint-config-default",
		"prettier",
		"prettier-plugin-curly",
		"prettier-plugin-packagejson",
		"sentences-per-line",
		"should-semantic-release",
		"tsup",
		"typescript",
		"yaml-eslint-parser",
	];

	if (releases) {
		devDependencies.push("release-it");
	}

	if (unitTests) {
		devDependencies.push(
			"@vitest/coverage-v8",
			"console-fail-test",
			"eslint-plugin-no-only-tests",
			"eslint-plugin-vitest",
			"vitest",
		);
	}

	await execaCommand(`pnpm add ${devDependencies.map(atLatest).join(" ")} -D`);
	await execaCommand(`npx all-contributors-cli generate`);
	await removeDevDependencies(
		["all-contributors-cli", "all-contributors-for-repository"],
		await readPackageData(),
	);
	await execaCommand("pnpm run format:write");
}

const atLatest = (packageName: string) => `${packageName}@latest`;
