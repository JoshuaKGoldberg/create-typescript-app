import { z } from "zod";

import { base } from "../base.ts";
import { blockCSpell } from "./blockCSpell.ts";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.ts";
import { blockESLint } from "./blockESLint.ts";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockPrettier } from "./blockPrettier.ts";

export const blockNcc = base.createBlock({
	about: {
		name: "ncc",
	},
	addons: {
		entry: z.string().optional(),
	},
	intake({ options }) {
		return {
			entry: options.packageData?.scripts?.["build:release"]?.match(
				/ncc build (.+) -o dist/,
			)?.[1],
		};
	},
	produce({ addons }) {
		const { entry = "src/index.ts" } = addons;

		return {
			addons: [
				blockCSpell({
					ignorePaths: ["dist"],
				}),
				blockDevelopmentDocs({
					sections: {
						Building: {
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
							innerSections: [
								{
									contents: `
Run [\`@vercel/ncc\`](https://github.com/vercel/ncc) to create an output \`dist/\` to be used in production.

\`\`\`shell
pnpm build:release
\`\`\`

CI fails if the committed \`dist/\` doesn't match what \`pnpm build:release\` produces.
If that happens, run \`pnpm build:release\` and commit all changes under \`dist/\`.
		`,
									heading: "Building for Release",
								},
							],
						},
					},
				}),
				blockESLint({
					ignores: ["dist"],
				}),
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Build",
							steps: [{ run: "pnpm build" }],
						},
						{
							name: "Build (Release)",
							steps: [
								{ run: "pnpm build:release" },
								{
									run: `if git check-ignore --no-index --quiet dist; then
  echo "::error::dist/ is gitignored, so new files in it can't be detected or committed. Remove dist from .gitignore."
  exit 1
fi
changes=$(git status --porcelain --untracked-files=all -- dist)
if [ -n "$changes" ]; then
  echo "$changes"
  echo "::error::dist/ is out of date. Run 'pnpm build:release', then commit all changes under dist/."
  exit 1
fi
`,
								},
							],
						},
					],
				}),
				blockPackageJson({
					properties: {
						devDependencies: {
							"@vercel/ncc": "^0.38.3",
						},
						scripts: {
							build: "tsc",
							"build:release": `ncc build ${entry} -o dist`,
						},
					},
				}),
				blockPrettier({
					ignores: ["/dist"],
				}),
			],
		};
	},
});
