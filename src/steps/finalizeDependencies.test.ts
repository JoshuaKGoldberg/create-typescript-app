import { describe, expect, it, vi } from "vitest";

import { Options } from "../shared/types.js";
import { finalizeDependencies } from "./finalizeDependencies.js";

const mockExecaCommand = vi.fn();

vi.mock("execa", () => ({
	get execaCommand() {
		return mockExecaCommand;
	},
}));

vi.mock("../shared/packages.js", () => ({
	readPackageData: () => [],
	removeDependencies: vi.fn(),
}));

const options = {
	author: undefined,
	base: "everything",
	createRepository: undefined,
	description: "Stub description.",
	email: undefined,
	excludeCompliance: undefined,
	excludeContributors: undefined,
	excludeLintJson: undefined,
	excludeLintKnip: undefined,
	excludeLintMd: undefined,
	excludeLintPackageJson: undefined,
	excludeLintPackages: undefined,
	excludeLintPerfectionist: undefined,
	excludeLintSpelling: undefined,
	excludeLintYml: undefined,
	excludeReleases: undefined,
	excludeRenovate: undefined,
	excludeTests: undefined,
	funding: undefined,
	owner: "StubOwner",
	repository: "stub-repository",
	skipGitHubApi: false,
	skipInstall: undefined,
	skipRemoval: undefined,
	skipRestore: undefined,
	skipUninstall: undefined,
	title: "Stub Title",
} satisfies Options;

describe("finalize", () => {
	it("installs the full list of commands when no options are enabled", async () => {
		await finalizeDependencies(options);

		expect(mockExecaCommand.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "pnpm add @types/eslint@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest @vitest/coverage-v8@latest all-contributors-cli@latest console-fail-test@latest cspell@latest eslint@latest eslint-config-prettier@latest eslint-plugin-deprecation@latest eslint-plugin-eslint-comments@latest eslint-plugin-import@latest eslint-plugin-jsdoc@latest eslint-plugin-jsonc@latest eslint-plugin-markdown@latest eslint-plugin-n@latest eslint-plugin-no-only-tests@latest eslint-plugin-perfectionist@latest eslint-plugin-regexp@latest eslint-plugin-vitest@latest eslint-plugin-yml@latest husky@latest jsonc-eslint-parser@latest knip@latest lint-staged@latest markdownlint@latest markdownlint-cli@latest npm-package-json-lint@latest npm-package-json-lint-config-default@latest prettier@latest prettier-plugin-curly@latest prettier-plugin-packagejson@latest release-it@latest sentences-per-line@latest should-semantic-release@latest tsup@latest typescript@latest vitest@latest yaml-eslint-parser@latest -D",
			  ],
			  [
			    "npx all-contributors-cli generate",
			  ],
			  [
			    "pnpm run format:write",
			  ],
			]
		`);
	});

	it("installs the base list of commands when all options are enabled", async () => {
		await finalizeDependencies({
			...options,
			excludeCompliance: true,
			excludeContributors: true,
			excludeLintJson: true,
			excludeLintKnip: true,
			excludeLintMd: true,
			excludeLintPackageJson: true,
			excludeLintPackages: true,
			excludeLintPerfectionist: true,
			excludeLintSpelling: true,
			excludeLintYml: true,
			excludeReleases: true,
			excludeRenovate: undefined,
			excludeTests: true,
		});

		expect(mockExecaCommand.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "pnpm add @types/eslint@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint@latest eslint-config-prettier@latest eslint-plugin-deprecation@latest eslint-plugin-eslint-comments@latest eslint-plugin-import@latest eslint-plugin-jsdoc@latest eslint-plugin-n@latest eslint-plugin-regexp@latest husky@latest lint-staged@latest prettier@latest prettier-plugin-curly@latest prettier-plugin-packagejson@latest tsup@latest typescript@latest -D",
			  ],
			  [
			    "pnpm run format:write",
			  ],
			]
		`);
	});
});
