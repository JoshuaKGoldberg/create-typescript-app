import { BlockPhase, MetadataFileType } from "create";

import { schema } from "../schema.js";

export const blockTSup = schema.createBlock({
	about: {
		name: "tsup",
	},
	phase: BlockPhase.Build,
	produce({ created }) {
		return {
			documentation: {
				Building: `
Run [**tsup**](https://tsup.egoist.dev) locally to build source files from \`src/\` into output files in \`lib/\`:

\`\`\`shell
pnpm build
\`\`\`

Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`lib/\` as you save files:

\`\`\`shell
pnpm build --watch
\`\`\`
`,
			},
			files: {
				"tsup.config.ts": `import { defineConfig } from "tsup";

export default defineConfig({
	bundle: false,
	clean: true,
	dts: true,
	entry: ${JSON.stringify([
		"src/**/*.ts",
		...created.metadata
			.filter(({ type }) => type === MetadataFileType.Test)
			.map((file) => `!${file.glob}`),
	])},
	format: "esm",
	outDir: "lib",
	sourcemap: true,
});
`,
			},
			jobs: [
				{
					name: "Build",
					steps: [{ run: "pnpm build" }, { run: "node ./lib/index.js" }],
				},
			],
			package: {
				scripts: {
					build: "tsup",
				},
			},
		};
	},
});
