import { describe, expect, it, vi } from "vitest";

import { Options } from "../../../shared/types.js";
import { writePackageJson } from "./writePackageJson.js";

const mockReadFileSafeAsJson = vi.fn();

vi.mock("../../../shared/readFileSafeAsJson.js", () => ({
	get readFileSafeAsJson() {
		return mockReadFileSafeAsJson;
	},
}));

const options = {
	access: "public",
	author: "test-author",
	base: "everything",
	description: "Test description.",
	directory: ".",
	email: {
		github: "github@email.com",
		npm: "npm@email.com",
	},
	excludeAllContributors: undefined,
	excludeCompliance: undefined,
	excludeLintJson: undefined,
	excludeLintKnip: undefined,
	excludeLintMd: undefined,
	excludeLintPackageJson: undefined,
	excludeLintPackages: undefined,
	excludeLintPerfectionist: undefined,
	excludeLintSpelling: undefined,
	excludeLintYml: undefined,
	excludeReleases: false,
	excludeRenovate: undefined,
	excludeTests: false,
	funding: undefined,
	logo: undefined,
	mode: "create",
	owner: "test-owner",
	repository: "test-repository",
	skipGitHubApi: false,
	skipInstall: undefined,
	skipRemoval: undefined,
	skipRestore: undefined,
	skipUninstall: undefined,
	title: "",
} satisfies Options;

describe("writePackageJson", () => {
	it("preserves existing dependencies when they exist", async () => {
		const dependencies = { abc: "1.2.3" };
		mockReadFileSafeAsJson.mockResolvedValue({ dependencies });

		const packageJson = await writePackageJson(options);

		expect(JSON.parse(packageJson)).toEqual(
			expect.objectContaining({ dependencies }),
		);
	});

	it("preserves existing devDependencies that aren't known to be unnecessary when they exist", async () => {
		const devDependencies = { abc: "1.2.3", jest: "4.5.6" };
		mockReadFileSafeAsJson.mockResolvedValue({ devDependencies });

		const packageJson = await writePackageJson(options);

		expect(JSON.parse(packageJson)).toEqual(
			expect.objectContaining({ devDependencies }),
		);
	});

	it("includes flattened keywords when they're specified", async () => {
		mockReadFileSafeAsJson.mockResolvedValue({});

		const keywords = ["abc", "def ghi", "jkl mno pqr"];
		const packageJson = await writePackageJson({ ...options, keywords });

		expect(JSON.parse(packageJson)).toEqual(
			expect.objectContaining({
				keywords: ["abc", "def", "ghi", "jkl", "mno", "pqr"],
			}),
		);
	});

	it("includes all optional portions when no exclusions are enabled", async () => {
		mockReadFileSafeAsJson.mockResolvedValue({});

		const packageJson = await writePackageJson(options);

		expect(JSON.parse(packageJson)).toMatchInlineSnapshot(`
			{
			  "author": {
			    "email": "npm@email.com",
			    "name": "test-author",
			  },
			  "description": "Test description.",
			  "devDependencies": {},
			  "engines": {
			    "node": ">=18",
			  },
			  "files": [
			    "lib/",
			    "package.json",
			    "LICENSE.md",
			    "README.md",
			  ],
			  "license": "MIT",
			  "lint-staged": {
			    "*": "prettier --ignore-unknown --write",
			  },
			  "main": "./lib/index.js",
			  "name": "test-repository",
			  "packageManager": "pnpm@8.7.0",
			  "publishConfig": {
			    "provenance": true,
			  },
			  "repository": {
			    "type": "git",
			    "url": "https://github.com/test-owner/test-repository",
			  },
			  "scripts": {
			    "build": "tsup",
			    "format": "prettier \\"**/*\\" --ignore-unknown",
			    "lint": "eslint . .*js --max-warnings 0 --report-unused-disable-directives",
			    "lint:knip": "knip",
			    "lint:md": "markdownlint \\"**/*.md\\" \\".github/**/*.md\\" --rules sentences-per-line",
			    "lint:package-json": "npmPkgJsonLint .",
			    "lint:packages": "pnpm dedupe --check",
			    "lint:spelling": "cspell \\"**\\" \\".github/**/*\\"",
			    "prepare": "husky install",
			    "should-semantic-release": "should-semantic-release --verbose",
			    "test": "vitest",
			    "tsc": "tsc",
			  },
			  "type": "module",
			  "version": "0.0.0",
			}
		`);
	});

	it("excludes all optional portions when all exclusions are enabled", async () => {
		mockReadFileSafeAsJson.mockResolvedValue({});

		const packageJson = await writePackageJson({
			...options,
			excludeAllContributors: true,
			excludeCompliance: true,
			excludeLintJson: true,
			excludeLintKnip: true,
			excludeLintMd: true,
			excludeLintPackageJson: true,
			excludeLintPackages: true,
			excludeLintPerfectionist: true,
			excludeLintSpelling: true,
			excludeLintYml: true,
			excludeReleases: true,
			excludeRenovate: true,
		});

		expect(JSON.parse(packageJson)).toMatchInlineSnapshot(`
			{
			  "author": {
			    "email": "npm@email.com",
			    "name": "test-author",
			  },
			  "description": "Test description.",
			  "devDependencies": {},
			  "engines": {
			    "node": ">=18",
			  },
			  "files": [
			    "lib/",
			    "package.json",
			    "LICENSE.md",
			    "README.md",
			  ],
			  "license": "MIT",
			  "lint-staged": {
			    "*": "prettier --ignore-unknown --write",
			  },
			  "main": "./lib/index.js",
			  "name": "test-repository",
			  "packageManager": "pnpm@8.7.0",
			  "publishConfig": {
			    "provenance": true,
			  },
			  "repository": {
			    "type": "git",
			    "url": "https://github.com/test-owner/test-repository",
			  },
			  "scripts": {
			    "build": "tsup",
			    "format": "prettier \\"**/*\\" --ignore-unknown",
			    "lint": "eslint . .*js --max-warnings 0 --report-unused-disable-directives",
			    "prepare": "husky install",
			    "tsc": "tsc",
			  },
			  "type": "module",
			  "version": "0.0.0",
			}
		`);
	});
});
