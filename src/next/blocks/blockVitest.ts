import { BlockPhase, MetadataFileType } from "create";

import { schema } from "../schema.js";

export const blockVitest = schema.createBlock({
	about: {
		name: "Vitest",
	},
	phase: BlockPhase.Test,
	produce({ created }) {
		const exclude = JSON.stringify(
			created.metadata
				.filter((value) => value.type === MetadataFileType.Built)
				.map((value) => value.glob),
		);
		const include = JSON.stringify(
			created.metadata
				.filter((value) => value.type === MetadataFileType.Source)
				.map((value) => value.glob),
		);

		return {
			documentation: {
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
			editor: {
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
			},
			files: {
				"vitest.config.ts": `import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		clearMocks: true,
		coverage: {
			all: true,
			exclude: ${exclude}
			include: ${include}
			reporter: ["html", "lcov"],
		},
		exclude: [${exclude}, "node_modules"],
		setupFiles: ["console-fail-test/setup"],
	},
});
	`,
			},
			jobs: [
				{
					name: "Test",
					steps: [
						{ run: "pnpm run test --coverage" },
						{ uses: "codecov/codecov-action@v3" },
					],
				},
			],
			metadata: [
				{
					glob: "coverage/",
					type: MetadataFileType.Ignored,
				},
				{
					glob: "**/*.snap",
					type: MetadataFileType.Snapshot,
				},
			],
		};
	},
});
