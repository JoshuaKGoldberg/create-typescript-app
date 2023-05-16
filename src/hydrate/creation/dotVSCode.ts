/* spellchecker: disable */
export function createDotVSCode() {
	return {
		"extensions.json": JSON.stringify(
			{
				recommendations: [
					"DavidAnson.vscode-markdownlint",
					"dbaeumer.vscode-eslint",
					"esbenp.prettier-vscode",
					"streetsidesoftware.code-spell-checker",
				],
			},
			null,
			4
		),
		"launch.json": JSON.stringify(
			{
				configurations: [
					{
						args: ["run", "${relativeFile}"],
						autoAttachChildProcesses: true,
						console: "integratedTerminal",
						name: "Debug Current Test File",
						program: "${workspaceRoot}/node_modules/vitest/vitest.mjs",
						request: "launch",
						skipFiles: ["<node_internals>/**", "**/node_modules/**"],
						smartStep: true,
						type: "node",
					},
				],
				version: "0.2.0",
			},
			null,
			4
		),
		"settings.json": JSON.stringify(
			{
				"editor.codeActionsOnSave": {
					"source.fixAll.eslint": true,
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
				"typescript.tsdk": "node_modules/typescript/lib",
			},
			null,
			4
		),
	};
}
