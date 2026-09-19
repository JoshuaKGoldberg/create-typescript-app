import { base } from "../base.mjs";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.mjs";
import { blockPackageJson } from "./blockPackageJson.mjs";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.mjs";
import { blockCSpell } from "./blockCSpell.mjs";
import { blockESLint } from "./blockESLint.mjs";
import { blockPrettier } from "./blockPrettier.mjs";
import { z } from "zod";
//#region src/blocks/blockNcc.ts
const blockNcc = base.createBlock({
	about: { name: "ncc" },
	addons: { entry: z.string().optional() },
	intake({ options }) {
		return { entry: options.packageData?.scripts?.["build:release"]?.match(/ncc build (.+) -o dist/)?.[1] };
	},
	produce({ addons }) {
		const { entry = "src/index.ts" } = addons;
		return { addons: [
			blockCSpell({ ignorePaths: ["dist"] }),
			blockDevelopmentDocs({ sections: { Building: {
				contents: `
Run [TypeScript](https://typescriptlang.org) locally to type check and build source files from \`src/\` into output files in \`lib/\`:

\`\`\`shell
pnpm build
\`\`\`

Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`lib/\` as you save files:

\`\`\`shell
pnpm build --watch
\`\`\`
`,
				innerSections: [{
					contents: `
Run [\`@vercel/ncc\`](https://github.com/vercel/ncc) to create an output \`dist/\` to be used in production.

\`\`\`shell
pnpm build:release
\`\`\`
		`,
					heading: "Building for Release"
				}]
			} } }),
			blockESLint({ ignores: ["dist"] }),
			blockGitHubActionsCI({ jobs: [{
				name: "Build",
				steps: [{ run: "pnpm build" }]
			}, {
				name: "Build (Release)",
				steps: [{ run: "pnpm build:release" }]
			}] }),
			blockPackageJson({ properties: {
				devDependencies: { "@vercel/ncc": "^0.38.3" },
				scripts: {
					build: "tsc",
					"build:release": `ncc build ${entry} -o dist`
				}
			} }),
			blockPrettier({ ignores: ["/dist"] })
		] };
	}
});
//#endregion
export { blockNcc };
