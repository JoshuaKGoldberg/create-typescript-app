import { z } from "zod";

import { base } from "../base.ts";
import { blockCSpell } from "./blockCSpell.ts";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.ts";
import { blockESLint } from "./blockESLint.ts";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { blockGitHubIssueTemplates } from "./blockGitHubIssueTemplates.ts";
import { blockGitignore } from "./blockGitignore.ts";
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
	produce({ addons, options }) {
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

Add \`--watch\` to run the builder in a watch mode that rebuilds changed files into \`lib/\` as you save them:

\`\`\`shell
pnpm build --watch
\`\`\`
`,
							innerSections: [
								{
									contents: `
Run [\`@vercel/ncc\`](https://github.com/vercel/ncc) to clear and recreate an output \`dist/\` to be used in production.

\`\`\`shell
pnpm build:release
\`\`\`

CI fails if the committed \`dist/\` doesn't match what \`pnpm build:release\` produces, not counting \`.d.ts\` files.
If that happens, run \`pnpm build:release\` and commit the changed files under \`dist/\`.
Renovate PRs that update bundled dependencies need the same: rebuild and commit \`dist/\` on their branch before they can merge.
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
									run: `# Verify dist/ is up to date
changes=$(git status --porcelain --untracked-files=all --ignored -- dist ':!*.d.ts' ':!*.d.ts.map')
if [ -n "$changes" ]; then
  echo "$changes"
  echo "::error::dist/ is out of date. Run 'pnpm build:release', then commit the files listed above. Files marked !! are gitignored and need 'git add --force'."
  exit 1
fi
`,
								},
							],
						},
					],
				}),
				blockGitHubIssueTemplates({
					checklists: {
						bug: [
							"I have checked the workflow run logs for errors.",
							`I have tried the [latest release](https://github.com/${options.owner}/${options.repository}/releases/latest) of this action and the issue persists.`,
						],
						feature: [
							`I have looked at the [latest release](https://github.com/${options.owner}/${options.repository}/releases/latest) of this action.`,
						],
					},
				}),
				blockGitignore({
					ignores: ["/dist/**/*.d.ts", "/dist/**/*.d.ts.map"],
				}),
				blockPackageJson({
					properties: {
						devDependencies: {
							"@vercel/ncc": "^0.38.3",
						},
						scripts: {
							build: "tsc",
							"build:release": `rm -rf dist && ncc build ${entry} -o dist`,
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
