import { z } from "zod";

import { base } from "../base.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockVSCode } from "./blockVSCode.js";
import { getPackageDependencies } from "./packageData.js";

export const blockCSpell = base.createBlock({
	about: {
		name: "CSpell",
	},
	addons: {
		ignores: z.array(z.string()).default([]),
		words: z.array(z.string()).default([]),
	},
	produce({ addons }) {
		const { ignores, words } = addons;

		return {
			addons: [
				blockDevelopmentDocs({
					sections: {
						Linting: {
							contents: {
								items: [
									`- \`pnpm lint:spelling\` ([cspell](https://cspell.org)): Spell checks across all source files`,
								],
							},
						},
					},
				}),
				blockVSCode({
					extensions: ["streetsidesoftware.code-spell-checker"],
				}),
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Lint Spelling",
							steps: [{ run: "pnpm lint:spelling" }],
						},
					],
				}),
				blockPackageJson({
					properties: {
						scripts: {
							"lint:spelling": 'cspell "**" ".github/**/*"',
						},
					},
				}),
			],
			files: {
				"cspell.json": JSON.stringify({
					dictionaries: ["typescript"],
					ignorePaths: [
						".github",
						"CHANGELOG.md",
						"lib",
						"node_modules",
						"pnpm-lock.yaml",
						...ignores,
					].sort(),
					...(words.length && { words: words.sort() }),
				}),
			},
			package: {
				devDependencies: getPackageDependencies("cspell"),
				scripts: {
					"lint:spelling": 'cspell "**" ".github/**/*"',
				},
			},
		};
	},
});
