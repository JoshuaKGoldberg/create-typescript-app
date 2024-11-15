import { schema } from "../schema.js";
import { removeTrailingSlash } from "../utils/removeTrailingSlash.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockESLint } from "./blockESLint.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockVSCode } from "./blockVSCode.js";
import { MetadataFileType } from "./metadata.js";

function removeTrailingSlashFromGlob(value: { glob: string }) {
	return removeTrailingSlash(value.glob);
}

export const blockVitest = schema.createBlock({
	about: {
		name: "Vitest",
	},
	produce({ created }) {
		const exclude = JSON.stringify(
			created.metadata.files
				.filter((value) => value.type === MetadataFileType.Built)
				.map(removeTrailingSlashFromGlob),
		);
		const include = JSON.stringify(
			created.metadata.files
				.filter((value) => value.type === MetadataFileType.Source)
				.map(removeTrailingSlashFromGlob),
		);

		return {
			addons: [
				blockESLint({
					extensions: [
						{
							extends: ["vitest.configs.recommended"],
							files: ["**/*.test.*"],
							rules: {
								"@typescript-eslint/no-unsafe-assignment": "off",
								"@typescript-eslint/no-unsafe-call": "off",
							},
						},
					],
					imports: [{ source: "@vitest/eslint-plugin", specifier: "vitest" }],
				}),
				blockDevelopmentDocs({
					sections: {
						Testing: `
		[Vitest](https://vitest.dev) is used for tests.
		You can run it locally on the command-line:
		
		\`\`\`shell
		pnpm run test
		\`\`\`
		
		Add the \`--coverage\` flag to compute test coverage and place reports in the \`coverage/\` directory:
		
		\`\`\`shell
		pnpm run test --coverage
		\`\`\`
		
		Note that [console-fail-test](https://github.com/JoshuaKGoldberg/console-fail-test) is enabled for all test runs.
		Calls to \`console.log\`, \`console.warn\`, and other console methods will cause a test to fail.
		
		### Debugging Tests
		
		This repository includes a [VS Code launch configuration](https://code.visualstudio.com/docs/editor/debugging) for debugging unit tests.
		To launch it, open a test file, then run _Debug Current Test File_ from the VS Code Debug panel (or press F5).
		`,
					},
				}),
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Test",
							steps: [
								{ run: "pnpm run test --coverage" },
								{ uses: "codecov/codecov-action@v3" },
							],
						},
					],
				}),
				blockPackageJson({
					properties: {
						devDependencies: {
							"@vitest/coverage-v8": "latest",
							"@vitest/eslint-plugin": "latest",
							"console-fail-test": "latest",
							vitest: "latest",
						},
						scripts: {
							test: "vitest",
						},
					},
				}),
				blockVSCode({
					debuggers: [
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
					extensions: ["vitest.explorer"],
				}),
			],
			files: {
				"vitest.config.ts": `import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		clearMocks: true,
		coverage: {
			all: true,
			exclude: ${exclude},
			include: ${include},
			reporter: ["html", "lcov"],
		},
		exclude: [${exclude.slice(1, exclude.length - 1)}, "node_modules"],
		setupFiles: ["console-fail-test/setup"],
	},
});
	`,
			},
			metadata: {
				files: [
					{
						glob: "coverage",
						type: MetadataFileType.Ignored,
					},
					{
						glob: "**/*.snap",
						type: MetadataFileType.Snapshot,
					},
					{
						glob: "src/**/*.test.*",
						type: MetadataFileType.Test,
					},
				],
			},
		};
	},
});
