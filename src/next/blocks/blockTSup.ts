import { z } from "zod";

import { schema } from "../schema.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockPackageJson } from "./blockPackageJson.js";

export const blockTSup = schema.createBlock({
	about: {
		name: "tsup",
	},
	args: {
		entry: z.array(z.string()).optional(),
	},
	produce({ args }) {
		const { entry = [] } = args;

		return {
			addons: [
				blockDevelopmentDocs({
					sections: {
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
				}),
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Build",
							steps: [{ run: "pnpm build" }, { run: "node ./lib/index.js" }],
						},
					],
				}),
				blockPackageJson({
					properties: {
						devDependencies: {
							tsup: "latest",
						},
						scripts: {
							build: "tsup",
						},
					},
				}),
			],
			files: {
				"tsup.config.ts": `import { defineConfig } from "tsup";

export default defineConfig({
	bundle: false,
	clean: true,
	dts: true,
	entry: ${JSON.stringify(["src/**/*.ts", ...entry])},
	format: "esm",
	outDir: "lib",
	sourcemap: true,
});
`,
			},
		};
	},
});
