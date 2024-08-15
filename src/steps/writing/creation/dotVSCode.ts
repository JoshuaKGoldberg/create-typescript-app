import { Options } from "../../../shared/types.js";
import { formatJson } from "./formatters/formatJson.js";

/* spellchecker: disable */
export async function createDotVSCode(options: Options) {
	return {
		"extensions.json": await formatJson({
			recommendations: [
				!options.excludeLintMd && "DavidAnson.vscode-markdownlint",
				"dbaeumer.vscode-eslint",
				"esbenp.prettier-vscode",
				!options.excludeLintSpelling && "streetsidesoftware.code-spell-checker",
				!options.excludeTests && "vitest.explorer",
			].filter(Boolean),
		}),
		...(options.excludeTests && !options.bin
			? {}
			: {
					"launch.json": await formatJson({
						configurations: [
							...(options.excludeTests
								? []
								: [
										{
											args: ["run", "${relativeFile}"],
											autoAttachChildProcesses: true,
											console: "integratedTerminal",
											name: "Debug Current Test File",
											program:
												"${workspaceRoot}/node_modules/vitest/vitest.mjs",
											request: "launch",
											skipFiles: ["<node_internals>/**", "**/node_modules/**"],
											smartStep: true,
											type: "node",
										},
									]),
							...(options.bin
								? [
										{
											name: "Debug Program",
											preLaunchTask: "build",
											program: options.bin,
											request: "launch",
											skipFiles: ["<node_internals>/**"],
											type: "node",
										},
									]
								: []),
						],
						version: "0.2.0",
					}),
				}),
		"settings.json": await formatJson({
			"editor.codeActionsOnSave": {
				"source.fixAll.eslint": "explicit",
			},
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
				"yaml",
			],
			"eslint.rules.customizations": [{ rule: "*", severity: "warn" }],
			"eslint.useFlatConfig": true,
			"typescript.tsdk": "node_modules/typescript/lib",
		}),
		"tasks.json": await formatJson({
			tasks: [
				{
					detail: "Build the project",
					label: "build",
					script: "build",
					type: "npm",
				},
			],
			version: "2.0.0",
		}),
	};
}
