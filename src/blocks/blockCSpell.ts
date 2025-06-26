import JSON5 from "json5";
import { getObjectStringsDeep } from "object-strings-deep";
import { z } from "zod";

import { base } from "../base.js";
import { getPackageDependencies } from "../data/packageData.js";
import { resolveBin } from "../utils/resolveBin.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.js";
import { blockVSCode } from "./blockVSCode.js";
import { intakeFile } from "./intake/intakeFile.js";
import { CommandPhase } from "./phases.js";

const filesGlob = `"**" ".github/**/*"`;

const addons = {
	ignorePaths: z.array(z.string()).default([]),
	words: z.array(z.string()).default([]),
};

const zAddons = z.object(addons);

export const blockCSpell = base.createBlock({
	about: {
		name: "CSpell",
	},
	addons,
	intake({ files }) {
		const cspellJson = intakeFile(files, ["cspell.json"]);
		if (!cspellJson) {
			return undefined;
		}

		const { data } = zAddons.safeParse(JSON5.parse<unknown>(cspellJson[0]));
		if (!data) {
			return undefined;
		}

		return data;
	},
	produce({ addons, options }) {
		const { ignorePaths, words } = addons;

		const allWords = Array.from(
			new Set([...(options.words ?? []), ...words]),
		).sort();

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
						devDependencies: getPackageDependencies("cspell"),
						scripts: {
							"lint:spelling": `cspell ${filesGlob}`,
						},
					},
				}),
			],
			files: {
				"cspell.json": JSON.stringify({
					dictionaries: ["npm", "node", "typescript"],
					ignorePaths: Array.from(
						new Set([
							".github",
							"CHANGELOG.md",
							"lib",
							"node_modules",
							"pnpm-lock.yaml",
							...ignorePaths,
						]),
					).sort(),
					...(allWords.length && { words: allWords }),
				}),
			},
		};
	},
	setup({ options }) {
		const wordArgs = getObjectStringsDeep(options)
			.map((word) => `--words "${word.replaceAll(`"`, " ")}"`)
			.join(" ");

		return {
			scripts: [
				{
					commands: [
						`node ${resolveBin("cspell-populate-words/bin/index.mjs")} ${wordArgs}`,
					],
					phase: CommandPhase.Process,
				},
			],
		};
	},
	transition() {
		return {
			addons: [
				blockRemoveWorkflows({
					workflows: ["lint-spelling", "spelling"],
				}),
			],
		};
	},
});
