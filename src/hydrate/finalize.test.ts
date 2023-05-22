import { beforeEach, describe, expect, it, vi } from "vitest";

import { finalize } from "./finalize.js";

const mockExecaCommand = vi.fn();

vi.mock("execa", () => ({
	get execaCommand() {
		return mockExecaCommand;
	},
}));

describe("finalize", () => {
	beforeEach(() => {
		console.log = vi.fn();
	});

	it("installs the base list of commands when no options are enabled", async () => {
		await finalize({ releases: false, unitTests: false });

		expect(mockExecaCommand).toHaveBeenCalledWith(
			[
				"pnpm add",
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
				"-D",
			].join(" "),
			{ stdio: "inherit" }
		);
	});

	it("installs the full list of commands when both options are enabled", async () => {
		await finalize({ releases: true, unitTests: true });

		expect(mockExecaCommand).toHaveBeenCalledWith(
			[
				"pnpm add",
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
				"release-it",
				"@vitest/coverage-istanbul",
				"console-fail-test",
				"eslint-plugin-no-only-tests",
				"eslint-plugin-vitest",
				"vitest",
				"-D",
			].join(" "),
			{ stdio: "inherit" }
		);
	});
});
