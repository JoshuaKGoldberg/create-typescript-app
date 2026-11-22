import { z } from "zod";

import { base } from "../base.ts";
import { getPackageDependencies } from "../data/packageData.ts";
import { formatFile } from "../utils/formatFile.ts";
import { blockCSpell } from "./blockCSpell.ts";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.ts";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockRemoveDependencies } from "./blockRemoveDependencies.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.ts";
import { blockVSCode } from "./blockVSCode.ts";
import { formatIgnoreFile } from "./files/formatIgnoreFile.ts";
import { withPreviously } from "./files/withPreviously.ts";
import { CommandPhase } from "./phases.ts";

export const blockPrettier = base.createBlock({
	about: {
		name: "Prettier",
	},
	produce({ props }) {
		const { ignores, overrides, plugins, runBefore } = props;

		return {
			extensions: [
				blockCSpell({
					ignorePaths: [".all-contributorsrc"],
				}),
				blockDevelopmentDocs({
					sections: {
						Formatting: {
							contents: `
[Prettier](https://prettier.io) is used to format code.
It should be applied automatically when you save files in VS Code or make a Git commit.

To manually reformat all files, you can run:

\`\`\`shell
pnpm format --write
\`\`\`
`,
						},
					},
				}),
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Format Check",
							steps: [
								...runBefore.map((run) => ({ run })),
								{ run: "pnpm format --list-different" },
							],
						},
					],
				}),
				blockPackageJson({
					properties: {
						devDependencies: getPackageDependencies(
							...plugins.filter((plugin) => !plugin.startsWith(".")),
							"husky",
							"prettier",
							"pretty-quick",
						),
						scripts: {
							format: "prettier .",
							prepare: "husky",
						},
					},
				}),
				blockVSCode({
					extensions: ["esbenp.prettier-vscode"],
					settings: { "editor.defaultFormatter": "esbenp.prettier-vscode" },
				}),
			],
			files: {
				".husky": {
					".gitignore": "_\n",
					"pre-commit": ["npx pretty-quick --staged\n", { executable: true }],
				},
				".prettierignore": formatIgnoreFile(
					// Addons such as blockNcc may also ignore the default /dist
					Array.from(
						new Set(["/.husky", "/dist", "/pnpm-lock.yaml", ...ignores]),
					).sort(),
				),
				"prettier.config.ts": withPreviously(
					formatFile(
						"prettier.config.ts",
						`import type { Config } from "prettier";

export default ${JSON.stringify({
							...(overrides.length && { overrides: overrides.sort() }),
							...(plugins.length && { plugins: plugins.sort() }),
							useTabs: true,
						})} satisfies Config;
`,
					),
					[".prettierrc.json"],
				),
			},
			scripts: [
				{
					commands: [...runBefore, "pnpm format --write"],
					phase: CommandPhase.Format,
				},
			],
		};
	},
	props: {
		ignores: z.array(z.string()).default([]),
		overrides: z
			.array(
				z.object({
					files: z.string(),
					options: z.object({
						parser: z.string(),
					}),
				}),
			)
			.default([]),
		plugins: z.array(z.string()).default([]),
		runBefore: z.array(z.string()).default([]),
	},
	transition() {
		return {
			extensions: [
				blockPackageJson({
					properties: {
						"lint-staged": undefined,
					},
				}),
				blockRemoveDependencies({
					dependencies: [
						"eslint-config-prettier",
						"eslint-plugin-prettier",
						"lint-staged",
					],
				}),
				blockRemoveFiles({
					files: [
						".lintstagedrc*",
						".prettierrc*",
						"lint-staged.config.*",
						"prettier.config.{c,j,m}*",
					],
				}),
				blockRemoveWorkflows({
					workflows: ["format", "prettier"],
				}),
			],
		};
	},
});
