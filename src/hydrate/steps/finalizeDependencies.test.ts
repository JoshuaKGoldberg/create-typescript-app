import { describe, expect, it, vi } from "vitest";

import { finalizeDependencies } from "./finalizeDependencies.js";

const mockExecaCommand = vi.fn();

vi.mock("execa", () => ({
	get execaCommand() {
		return mockExecaCommand;
	},
}));

describe("finalize", () => {
	it("installs the base list of commands when no options are enabled", async () => {
		await finalizeDependencies({ releases: false, unitTests: false });

		expect(mockExecaCommand).toHaveBeenCalledWith(
			[
				"pnpm add",
				"@types/eslint@latest",
				"@typescript-eslint/eslint-plugin@latest",
				"@typescript-eslint/parser@latest",
				"all-contributors-cli@latest",
				"cspell@latest",
				"eslint@latest",
				"eslint-config-prettier@latest",
				"eslint-plugin-deprecation@latest",
				"eslint-plugin-eslint-comments@latest",
				"eslint-plugin-import@latest",
				"eslint-plugin-jsdoc@latest",
				"eslint-plugin-jsonc@latest",
				"eslint-plugin-markdown@latest",
				"eslint-plugin-perfectionist@latest",
				"eslint-plugin-regexp@latest",
				"eslint-plugin-yml@latest",
				"husky@latest",
				"jsonc-eslint-parser@latest",
				"knip@latest",
				"lint-staged@latest",
				"markdownlint@latest",
				"markdownlint-cli@latest",
				"npm-package-json-lint@latest",
				"npm-package-json-lint-config-default@latest",
				"prettier@latest",
				"prettier-plugin-curly@latest",
				"prettier-plugin-packagejson@latest",
				"sentences-per-line@latest",
				"should-semantic-release@latest",
				"typescript@latest",
				"yaml-eslint-parser@latest",
				"-D",
			].join(" "),
			{ stdio: "inherit" }
		);
	});

	it("installs the full list of commands when both options are enabled", async () => {
		await finalizeDependencies({ releases: true, unitTests: true });

		expect(mockExecaCommand).toHaveBeenCalledWith(
			[
				"pnpm add",
				"@types/eslint@latest",
				"@typescript-eslint/eslint-plugin@latest",
				"@typescript-eslint/parser@latest",
				"all-contributors-cli@latest",
				"cspell@latest",
				"eslint@latest",
				"eslint-config-prettier@latest",
				"eslint-plugin-deprecation@latest",
				"eslint-plugin-eslint-comments@latest",
				"eslint-plugin-import@latest",
				"eslint-plugin-jsdoc@latest",
				"eslint-plugin-jsonc@latest",
				"eslint-plugin-markdown@latest",
				"eslint-plugin-perfectionist@latest",
				"eslint-plugin-regexp@latest",
				"eslint-plugin-yml@latest",
				"husky@latest",
				"jsonc-eslint-parser@latest",
				"knip@latest",
				"lint-staged@latest",
				"markdownlint@latest",
				"markdownlint-cli@latest",
				"npm-package-json-lint@latest",
				"npm-package-json-lint-config-default@latest",
				"prettier@latest",
				"prettier-plugin-curly@latest",
				"prettier-plugin-packagejson@latest",
				"sentences-per-line@latest",
				"should-semantic-release@latest",
				"typescript@latest",
				"yaml-eslint-parser@latest",
				"release-it@latest",
				"@vitest/coverage-istanbul@latest",
				"console-fail-test@latest",
				"eslint-plugin-no-only-tests@latest",
				"eslint-plugin-vitest@latest",
				"vitest@latest",
				"-D",
			].join(" "),
			{ stdio: "inherit" }
		);
	});
});
