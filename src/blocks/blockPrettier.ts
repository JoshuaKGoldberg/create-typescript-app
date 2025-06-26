import { z } from "zod";

import { base } from "../base.js";
import { getPackageDependencies } from "../data/packageData.js";
import { blockCSpell } from "./blockCSpell.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockRemoveDependencies } from "./blockRemoveDependencies.js";
import { blockRemoveFiles } from "./blockRemoveFiles.js";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.js";
import { blockVSCode } from "./blockVSCode.js";
import { formatIgnoreFile } from "./files/formatIgnoreFile.js";
import { CommandPhase } from "./phases.js";

export const blockPrettier = base.createBlock({
	about: {
		name: "Prettier",
	},
	addons: {
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
	produce({ addons }) {
		const { ignores, overrides, plugins, runBefore } = addons;

		return {
			addons: [
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
							name: "Prettier",
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
							"lint-staged",
							"prettier",
						),
						"lint-staged": {
							"*": "prettier --ignore-unknown --write",
						},
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
					"pre-commit": ["npx lint-staged\n", { executable: true }],
				},
				".prettierignore": formatIgnoreFile(
					["/.husky", "/lib", "/pnpm-lock.yaml", ...ignores].sort(),
				),
				".prettierrc.json": JSON.stringify({
					$schema: "http://json.schemastore.org/prettierrc",
					...(overrides.length && { overrides: overrides.sort() }),
					...(plugins.length && { plugins: plugins.sort() }),
					useTabs: true,
				}),
			},
			scripts: [
				{
					commands: [...runBefore, "pnpm format --write"],
					phase: CommandPhase.Format,
				},
			],
		};
	},
	transition() {
		return {
			addons: [
				blockRemoveDependencies({
					dependencies: ["eslint-config-prettier", "eslint-plugin-prettier"],
				}),
				blockRemoveFiles({
					files: [
						".prettierrc",
						".prettierrc.{c*,js,m*,t*}",
						"prettier.config*",
					],
				}),
				blockRemoveWorkflows({
					workflows: ["format", "prettier"],
				}),
			],
		};
	},
});
