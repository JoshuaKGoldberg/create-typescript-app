import JSON5 from "json5";
import { getObjectStringsDeep } from "object-strings-deep";
import { z } from "zod";

import { base } from "../base.ts";
import { getPackageDependencies } from "../data/packageData.ts";
import { formatFile } from "../utils/formatFile.ts";
import { resolveBin } from "../utils/resolveBin.ts";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.ts";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.ts";
import { blockVSCode } from "./blockVSCode.ts";
import { intakeFile } from "./intake/intakeFile.ts";
import { CommandPhase } from "./phases.ts";

const filesGlob = `"**" ".github/**/*"`;

const props = {
	ignorePaths: z.array(z.string()).default([]),
	words: z.array(z.string()).default([]),
};

const zProps = z.object(props);

export const blockCSpell = base.createBlock({
	about: {
		name: "CSpell",
	},
	intake({ files }) {
		const cspellJson = intakeFile(files, ["cspell.json"]);
		if (!cspellJson) {
			return undefined;
		}

		const { data } = zProps.safeParse(JSON5.parse<unknown>(cspellJson[0]));
		if (!data) {
			return undefined;
		}

		return {
			...data,
			// Older versions of this Block ignored .github, which kept the
			// lint:spelling script's ".github/**/*" glob from checking anything.
			ignorePaths: data.ignorePaths.filter(
				(ignorePath) => ignorePath !== ".github",
			),
		};
	},
	produce({ options, props }) {
		const { ignorePaths, words } = props;

		const allWords = Array.from(
			new Set([...(options.words ?? []), ...words]),
		).sort();

		return {
			extensions: [
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
				"cspell.json": formatFile(
					"cspell.json",
					JSON.stringify({
						dictionaries: ["npm", "node", "typescript"],
						ignorePaths: Array.from(
							new Set([
								"CHANGELOG.md",
								"dist",
								"node_modules",
								"pnpm-lock.yaml",
								...ignorePaths,
							]),
						).sort(),
						...(allWords.length && { words: allWords }),
					}),
				),
			},
		};
	},
	props,
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
			extensions: [
				blockRemoveWorkflows({
					workflows: ["lint-spelling", "spelling"],
				}),
			],
		};
	},
});
