import { z } from "zod";

import { schema } from "../schema.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockVSCode } from "./blockVSCode.js";
import { MetadataFileType } from "./metadata.js";

export const blockPrettier = schema.createBlock({
	about: {
		name: "Prettier",
	},
	args: {
		plugins: z.array(z.string()).optional(),
	},
	produce({ args, created }) {
		return {
			addons: [
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Prettier",
							steps: [{ run: "pnpm format --list-different" }],
						},
					],
				}),
				blockPackageJson({
					properties: {
						devDependencies: {
							...(args.plugins &&
								Object.fromEntries(
									args.plugins.map((plugin) => [plugin, "latest"]),
								)),
							husky: "latest",
							"lint-staged": "latest",
							prettier: "latest",
						},
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
			documentation: {
				Formatting: `
[Prettier](https://prettier.io) is used to format code.
It should be applied automatically when you save files in VS Code or make a Git commit.

To manually reformat all files, you can run:

\`\`\`shell
pnpm format --write
\`\`\`
`,
			},
			files: {
				".husky": {
					".gitignore": "_",
					"pre-commit": "npx lint-staged",
				},
				".prettierignore": [
					".husky",
					"lib",
					"pnpm-lock.yaml",
					...created.metadata.files
						.filter((value) => value.type === MetadataFileType.Ignored)
						.map((value) => value.glob),
				]
					.sort()
					.join("\n"),
				".prettierrc.json": JSON.stringify({
					$schema: "http://json.schemastore.org/prettierrc",
					overrides: created.metadata.files
						.filter(
							(value) =>
								value.type === MetadataFileType.Config && value.language,
						)
						.map((value) => ({
							files: value.glob,
							options: { parser: value.language },
						})),
					...(args.plugins && { plugins: args.plugins }),
					useTabs: true,
				}),
			},
		};
	},
});
