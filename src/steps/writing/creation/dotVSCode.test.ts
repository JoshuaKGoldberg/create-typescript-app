import { describe, expect, it } from "vitest";

import { Options } from "../../../shared/types.js";
import { createDotVSCode } from "./dotVSCode.js";

/* spellchecker: disable */
function fakeOptions(
	getExcludeValue: (exclusionName: string) => boolean,
	bin?: string | undefined,
) {
	return {
		access: "public",
		author: "TestAuthor",
		base: "everything",
		...(bin ? { bin } : {}),
		description: "Test description.",
		directory: ".",
		email: {
			github: "github@email.com",
			npm: "npm@email.com",
		},
		...Object.fromEntries(
			[
				"excludeCompliance",
				"excludeAllContributors",
				"excludeLintESLint",
				"excludeLintJSDoc",
				"excludeLintJson",
				"excludeLintKnip",
				"excludeLintMd",
				"excludeLintPackageJson",
				"excludeLintPackages",
				"excludeLintPerfectionist",
				"excludeLintRegex",
				"excludeLintSpelling",
				"excludeLintStrict",
				"excludeLintStylistic",
				"excludeLintYml",
				"excludeReleases",
				"excludeRenovate",
				"excludeTests",
			].map((key) => [key, getExcludeValue(key)]),
		),
		mode: "create",
		owner: "TestOwner",
		repository: "test-repository",
		skipGitHubApi: true,
		skipInstall: true,
		skipRemoval: true,
		title: "Test Title",
	} satisfies Options;
}

describe("createDotVSCode", () => {
	it("creates a minimal config when all exclusions are enabled", async () => {
		expect(await createDotVSCode(fakeOptions(() => true)))
			.toMatchInlineSnapshot(`
				{
				  "extensions.json": "{ "recommendations": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"] }
				",
				  "settings.json": "{
					"editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
					"editor.defaultFormatter": "esbenp.prettier-vscode",
					"editor.formatOnSave": true,
					"editor.rulers": [80],
					"eslint.probe": [
						"javascript",
						"javascriptreact",
						"json",
						"jsonc",
						"markdown",
						"typescript",
						"typescriptreact",
						"yaml"
					],
					"eslint.rules.customizations": [{ "rule": "*", "severity": "warn" }],
					"eslint.useFlatConfig": true,
					"typescript.tsdk": "node_modules/typescript/lib"
				}
				",
				  "tasks.json": "{
					"tasks": [
						{
							"detail": "Build the project",
							"label": "build",
							"script": "build",
							"type": "npm"
						}
					],
					"version": "2.0.0"
				}
				",
				}
			`);
	});

	it("creates a full config when all exclusions are disabled and bin is provided", async () => {
		expect(await createDotVSCode(fakeOptions(() => false, "bin/index.js")))
			.toMatchInlineSnapshot(`
				{
				  "extensions.json": "{
					"recommendations": [
						"DavidAnson.vscode-markdownlint",
						"dbaeumer.vscode-eslint",
						"esbenp.prettier-vscode",
						"streetsidesoftware.code-spell-checker",
						"vitest.explorer"
					]
				}
				",
				  "launch.json": "{
					"configurations": [
						{
							"args": ["run", "\${relativeFile}"],
							"autoAttachChildProcesses": true,
							"console": "integratedTerminal",
							"name": "Debug Current Test File",
							"program": "\${workspaceRoot}/node_modules/vitest/vitest.mjs",
							"request": "launch",
							"skipFiles": ["<node_internals>/**", "**/node_modules/**"],
							"smartStep": true,
							"type": "node"
						},
						{
							"name": "Debug Program",
							"preLaunchTask": "build",
							"program": "bin/index.js",
							"request": "launch",
							"skipFiles": ["<node_internals>/**"],
							"type": "node"
						}
					],
					"version": "0.2.0"
				}
				",
				  "settings.json": "{
					"editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
					"editor.defaultFormatter": "esbenp.prettier-vscode",
					"editor.formatOnSave": true,
					"editor.rulers": [80],
					"eslint.probe": [
						"javascript",
						"javascriptreact",
						"json",
						"jsonc",
						"markdown",
						"typescript",
						"typescriptreact",
						"yaml"
					],
					"eslint.rules.customizations": [{ "rule": "*", "severity": "warn" }],
					"eslint.useFlatConfig": true,
					"typescript.tsdk": "node_modules/typescript/lib"
				}
				",
				  "tasks.json": "{
					"tasks": [
						{
							"detail": "Build the project",
							"label": "build",
							"script": "build",
							"type": "npm"
						}
					],
					"version": "2.0.0"
				}
				",
				}
			`);
	});

	it("creates a full config when all exclusions are disabled and bin is not provided", async () => {
		expect(await createDotVSCode(fakeOptions(() => false)))
			.toMatchInlineSnapshot(`
				{
				  "extensions.json": "{
					"recommendations": [
						"DavidAnson.vscode-markdownlint",
						"dbaeumer.vscode-eslint",
						"esbenp.prettier-vscode",
						"streetsidesoftware.code-spell-checker",
						"vitest.explorer"
					]
				}
				",
				  "launch.json": "{
					"configurations": [
						{
							"args": ["run", "\${relativeFile}"],
							"autoAttachChildProcesses": true,
							"console": "integratedTerminal",
							"name": "Debug Current Test File",
							"program": "\${workspaceRoot}/node_modules/vitest/vitest.mjs",
							"request": "launch",
							"skipFiles": ["<node_internals>/**", "**/node_modules/**"],
							"smartStep": true,
							"type": "node"
						}
					],
					"version": "0.2.0"
				}
				",
				  "settings.json": "{
					"editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
					"editor.defaultFormatter": "esbenp.prettier-vscode",
					"editor.formatOnSave": true,
					"editor.rulers": [80],
					"eslint.probe": [
						"javascript",
						"javascriptreact",
						"json",
						"jsonc",
						"markdown",
						"typescript",
						"typescriptreact",
						"yaml"
					],
					"eslint.rules.customizations": [{ "rule": "*", "severity": "warn" }],
					"eslint.useFlatConfig": true,
					"typescript.tsdk": "node_modules/typescript/lib"
				}
				",
				  "tasks.json": "{
					"tasks": [
						{
							"detail": "Build the project",
							"label": "build",
							"script": "build",
							"type": "npm"
						}
					],
					"version": "2.0.0"
				}
				",
				}
			`);
	});

	it("creates a minimal config including launch.json when all exclusions are enabled and bin is provided", async () => {
		expect(await createDotVSCode(fakeOptions(() => true, "bin/index.js")))
			.toMatchInlineSnapshot(`
				{
				  "extensions.json": "{ "recommendations": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"] }
				",
				  "launch.json": "{
					"configurations": [
						{
							"name": "Debug Program",
							"preLaunchTask": "build",
							"program": "bin/index.js",
							"request": "launch",
							"skipFiles": ["<node_internals>/**"],
							"type": "node"
						}
					],
					"version": "0.2.0"
				}
				",
				  "settings.json": "{
					"editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
					"editor.defaultFormatter": "esbenp.prettier-vscode",
					"editor.formatOnSave": true,
					"editor.rulers": [80],
					"eslint.probe": [
						"javascript",
						"javascriptreact",
						"json",
						"jsonc",
						"markdown",
						"typescript",
						"typescriptreact",
						"yaml"
					],
					"eslint.rules.customizations": [{ "rule": "*", "severity": "warn" }],
					"eslint.useFlatConfig": true,
					"typescript.tsdk": "node_modules/typescript/lib"
				}
				",
				  "tasks.json": "{
					"tasks": [
						{
							"detail": "Build the project",
							"label": "build",
							"script": "build",
							"type": "npm"
						}
					],
					"version": "2.0.0"
				}
				",
				}
			`);
	});
});
