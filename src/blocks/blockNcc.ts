import { z } from "zod";

import { base } from "../base.ts";
import { formatFile } from "../utils/formatFile.ts";
import { blockCSpell } from "./blockCSpell.ts";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.ts";
import { blockESLint } from "./blockESLint.ts";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { blockGitHubIssueTemplates } from "./blockGitHubIssueTemplates.ts";
import { blockGitignore } from "./blockGitignore.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockPrettier } from "./blockPrettier.ts";
import { blockReleaseIt } from "./blockReleaseIt.ts";
import { blockTypeScript } from "./blockTypeScript.ts";
import { blockVitest } from "./blockVitest.ts";

export const blockNcc = base.createBlock({
	about: {
		name: "ncc",
	},
	addons: {
		build: z.string().optional(),
		entry: z.string().optional(),
	},
	intake({ options }) {
		const scripts = options.packageData?.scripts;

		return {
			// Existing tsc builds may use their own settings, such as a tsconfig.build.json
			build: scripts?.build?.match(/^tsc\b/) ? scripts.build : undefined,
			entry: scripts?.["build:release"]?.match(/ncc build (.+) -o dist/)?.[1],
		};
	},
	produce({ addons, options }) {
		const { build, entry = "src/index.ts" } = addons;

		return {
			addons: [
				blockCSpell({
					ignorePaths: ["dist", "lib"],
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
					ignores: ["dist", "lib"],
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
					ignores: ["/dist/**/*.d.ts", "/dist/**/*.d.ts.map", "/lib"],
				}),
				blockPackageJson({
					properties: {
						devDependencies: {
							"@vercel/ncc": "^0.38.3",
						},
						files: ["lib/"],
						scripts: {
							build: build ?? "tsc --project tsconfig.build.json",
							"build:release": `rm -rf dist && ncc build ${entry} -o dist`,
						},
					},
				}),
				blockPrettier({
					ignores: ["/dist", "/lib"],
				}),
				blockReleaseIt({
					builders: [
						{
							order: 0,
							run: "pnpm build",
						},
					],
				}),
				blockTypeScript({
					outDir: "lib",
				}),
				blockVitest({
					exclude: ["lib"],
				}),
			],
			...(!build && {
				files: {
					// Test files don't need to be built into the published lib/
					"tsconfig.build.json": formatFile(
						"tsconfig.build.json",
						JSON.stringify({
							exclude: ["src/**/*.test.ts"],
							extends: "./tsconfig.json",
						}),
					),
				},
			}),
		};
	},
	setup() {
		return {
			addons: [
				blockPackageJson({
					properties: {
						// tsc builds the package's entry point into lib/, not ncc's dist/
						exports: { ".": "./lib/index.js" },
					},
				}),
			],
		};
	},
	transition() {
		return {
			addons: [
				// dist/ holds the committed ncc bundle, so it must not be ignored
				blockGitignore({
					removals: ["/dist", "dist", "dist/"],
				}),
			],
		};
	},
});
