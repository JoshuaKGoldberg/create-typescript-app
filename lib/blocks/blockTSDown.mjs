import { getPackageDependencies } from "../data/packageData.mjs";
import { base } from "../base.mjs";
import { CommandPhase } from "./phases.mjs";
import { blockRemoveFiles } from "./blockRemoveFiles.mjs";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.mjs";
import { blockPackageJson } from "./blockPackageJson.mjs";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.mjs";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.mjs";
import { blockRemoveDependencies } from "./blockRemoveDependencies.mjs";
import { blockESLint } from "./blockESLint.mjs";
import { blockReleaseIt } from "./blockReleaseIt.mjs";
import { intakeFileDefineConfig } from "./intake/intakeFileDefineConfig.mjs";
import { z } from "zod";
import removeUndefinedObjects from "remove-undefined-objects";
//#region src/blocks/blockTSDown.ts
const zEntry = z.array(z.string());
const zProperties = z.record(z.unknown());
const blockTSDown = base.createBlock({
	about: { name: "TSDown" },
	addons: {
		entry: zEntry.default([]),
		properties: zProperties.default({}),
		runInCI: z.array(z.string()).default([])
	},
	intake({ files }) {
		const rawData = intakeFileDefineConfig(files, ["tsdown.config.ts"]) ?? intakeFileDefineConfig(files, ["tsup.config.ts"]);
		if (!rawData) return;
		const { entry: rawEntry, ...rest } = rawData;
		return {
			entry: zEntry.safeParse(rawEntry).data,
			properties: removeUndefinedObjects({
				...zProperties.safeParse(rest).data,
				bundle: void 0,
				clean: rest.clean === false ? false : void 0,
				format: rest.format === "esm" ? void 0 : rest.format
			})
		};
	},
	produce({ addons, options }) {
		const { entry, properties, runInCI } = addons;
		return {
			addons: [
				blockDevelopmentDocs({ sections: { Building: { contents: `
Run [**tsdown**](https://tsdown.dev) locally to build source files from \`src/\` into output files in \`lib/\`:

\`\`\`shell
pnpm build
\`\`\`

Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`lib/\` as you save files:

\`\`\`shell
pnpm build --watch
\`\`\`
` } } }),
				blockESLint({ beforeLint: `Note that you'll need to run \`pnpm build\` before \`pnpm lint\` so that lint rules which check the file system can pick up on any built files.` }),
				blockGitHubActionsCI({ jobs: [{
					name: "Build",
					steps: [{ run: "pnpm build" }, ...runInCI.map((run) => ({ run }))]
				}] }),
				blockPackageJson({ properties: {
					devDependencies: getPackageDependencies("tsdown"),
					scripts: { build: "tsdown" }
				} }),
				blockReleaseIt({ builders: [{
					order: 0,
					run: "pnpm build"
				}] })
			],
			files: { "tsdown.config.ts": `import { defineConfig } from "tsdown";

export default defineConfig(${JSON.stringify({
				entry: Array.from(/* @__PURE__ */ new Set(["src/**/*.ts", ...entry])),
				outDir: "lib",
				unbundle: true,
				...properties
			})});
` },
			scripts: options.bin ? [{
				commands: ["pnpm build"],
				phase: CommandPhase.Build
			}] : void 0
		};
	},
	transition() {
		return { addons: [
			blockRemoveDependencies({ dependencies: [
				"@babel/cli",
				"@babel/core",
				"@babel/preset-typescript",
				"babel"
			] }),
			blockRemoveFiles({ files: [
				".babelrc*",
				"babel.config.*",
				"dist",
				"lib",
				"tsup.config.*"
			] }),
			blockRemoveWorkflows({ workflows: ["build", "tsup"] })
		] };
	}
});
//#endregion
export { blockTSDown };
