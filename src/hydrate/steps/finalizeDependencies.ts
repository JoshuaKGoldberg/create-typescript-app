import { execaCommand } from "execa";

import { HydrationInputValues } from "../values/types.js";

export async function finalizeDependencies({
	releases,
	unitTests,
}: Pick<HydrationInputValues, "releases" | "unitTests">) {
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
		"typescript",
		"yaml-eslint-parser",
	];

	if (releases) {
		devDependencies.push("release-it");
	}

	if (unitTests) {
		devDependencies.push(
			"@vitest/coverage-istanbul",
			"console-fail-test",
			"eslint-plugin-no-only-tests",
			"eslint-plugin-vitest",
			"vitest"
		);
	}

	for (const command of [
		`pnpm add ${devDependencies.map(atLatest).join(" ")} -D`,
		`npx all-contributors generate`,
		`pnpm uninstall all-contributors-cli -D`,
		"pnpm run format:write",
	]) {
		await execaCommand(command, { stdio: "inherit" });
	}
}

const atLatest = (packageName: string) => `${packageName}@latest`;
