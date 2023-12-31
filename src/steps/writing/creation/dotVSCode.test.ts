import { describe, expect, it } from "vitest";

import { Options } from "../../../shared/types.js";
import { createDotVSCode } from "./dotVSCode.js";

/* spellchecker: disable */
function fakeOptions(getExcludeValue: (exclusionName: string) => boolean) {
	return {
		access: "public",
		author: "TestAuthor",
		base: "everything",
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
				"excludeLintDeprecation",
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
				  "extensions.json": "{
				  "recommendations": [
				    "DavidAnson.vscode-markdownlint",
				    "dbaeumer.vscode-eslint",
				    "esbenp.prettier-vscode"
				  ]
				}
				",
				  "launch.json": "{
				  "configurations": [
				    {
				      "name": "Debug Program",
				      "preLaunchTask": "build",
				      "program": "lib/index.js",
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

	it("creates a full config when all exclusions are disabled", async () => {
		expect(await createDotVSCode(fakeOptions(() => false)))
			.toMatchInlineSnapshot(`
				{
				  "extensions.json": "{
				  "recommendations": [
				    "DavidAnson.vscode-markdownlint",
				    "dbaeumer.vscode-eslint",
				    "esbenp.prettier-vscode",
				    "streetsidesoftware.code-spell-checker"
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
				      "program": "lib/index.js",
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
