import chalk from "chalk";
import { execaCommand } from "execa";

interface FinalizeOptions {
	releases: boolean;
	unitTests: boolean;
}

export async function finalize({ releases, unitTests }: FinalizeOptions) {
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
		"eslint-plugin-regexp",
		"eslint-plugin-simple-import-sort",
		"eslint-plugin-typescript-sort-keys",
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
		`pnpm add ${devDependencies.join(" ")} -D`,
		`npx all-contributors generate`,
		`pnpm uninstall all-contributors-cli -D`,
		"pnpm run format:write",
	]) {
		console.log(chalk.gray(`$ ${command}`));
		await execaCommand(command, { stdio: "inherit" });
	}
}
