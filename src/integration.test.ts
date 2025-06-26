import prettier from "@prettier/sync";
import { prepareOptions } from "bingo";
import { intake, IntakeDirectory } from "bingo-fs";
import { producePreset } from "bingo-stratum";
import { diffCreatedDirectory } from "bingo-testers";
import { expect, test, vi } from "vitest";

Error.stackTraceLimit = 9001;

import {
	base,
	BaseOptions,
	blockAreTheTypesWrong,
	blockCodecov,
	blockCSpell,
	blockESLint,
	blockKnip,
	blockMain,
	blockRenovate,
	blockTemplatedWith,
	presets,
} from "./index.js";

vi.mock("./utils/resolveBin.js", () => ({
	resolveBin: (bin: string) => `node_modules/${bin}`,
}));

// This test checks the Bingo production using options inferred from disk,
// along with some explicit addons and blocks specified.
// It ensures that result has no differences from the actual files on disk.
//
// If the test fails, it's most likely due to a block being changed without the
// corresponding file(s) on disk also being changed.
// You may need to manually update files on disk to match the block's output.
//
// The next most likely culprit for failures is changing file contents that are
// specified by the addons mentioned in the producePreset() call below.
// For now, if you change the output on disk, you'll need to manually update here too.
// TODO: Eventually the create engine will be able to infer them:
//   https://github.com/JoshuaKGoldberg/bingo/issues/128
//
// For example, if you change blockTypeScript's target from "ES2022 to "ES2023",
// you'll also need to update the ./tsconfig.json on disk in the same way.
test("Producing the everything preset matches the files in this repository", async () => {
	const actual = (await intake(".", {
		exclude: /node_modules|^\.git$/,
	})) as IntakeDirectory;

	const created = producePreset(presets.everything, {
		options: (await prepareOptions(base)) as BaseOptions,
		refinements: {
			addons: [
				blockCodecov({
					env: {
						CODECOV_TOKEN: "${{ secrets.CODECOV_TOKEN }}",
					},
				}),
				blockCSpell({
					words: [
						"Anson",
						"TSESTree",
						"apexskier",
						"attw",
						"dbaeumer",
						"infile",
						"joshuakgoldberg",
						"mshick",
						"octoguide",
						"stefanzweifel",
					],
				}),
				blockESLint({
					explanations: [
						`👋 Hi! This ESLint configuration contains a lot more stuff than many repos'!
You can read from it to see all sorts of linting goodness, but don't worry -
it's not something you need to exhaustively understand immediately. 💙

If you're interested in learning more, see the 'getting started' docs on:
- ESLint: https://eslint.org
- typescript-eslint: https://typescript-eslint.io`,
					],
					rules: [
						{
							comment:
								"These on-by-default rules work well for this repo if configured",
							entries: {
								"@typescript-eslint/prefer-nullish-coalescing": [
									"error",
									{ ignorePrimitives: true },
								],
								"@typescript-eslint/restrict-template-expressions": [
									"error",
									{ allowBoolean: true, allowNullish: true, allowNumber: true },
								],
								"n/no-unsupported-features/node-builtins": [
									"error",
									{ allowExperimental: true, ignores: ["import.meta.dirname"] },
								],
							},
						},
					],
				}),
				blockKnip({
					ignoreDependencies: [
						"all-contributors-cli",
						"cspell-populate-words",
						"remove-dependencies",
						"trash-cli",
					],
				}),
				blockMain({
					runArgs: ["--version"],
				}),
				blockRenovate({
					ignoreDeps: ["all-contributors-cli"],
				}),
			],
			blocks: {
				add: [blockAreTheTypesWrong],
				exclude: [blockTemplatedWith],
			},
		},
	});

	const processText = (text: string, filePath: string) =>
		/all-contributorsrc|js|md|ts|yml/.test(filePath)
			? prettier.format(text, { filepath: filePath, useTabs: true })
			: text;

	expect(
		diffCreatedDirectory(actual, created.files, processText),
	).toBeUndefined();
});
