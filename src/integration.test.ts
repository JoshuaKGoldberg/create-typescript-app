import prettier from "@prettier/sync";
import { prepareOptions } from "bingo";
import { intake, IntakeDirectory } from "bingo-fs";
import { producePreset } from "bingo-stratum";
import { diffCreatedDirectory } from "bingo-testers";
import { expect, test, vi } from "vitest";

import {
	base,
	BaseOptions,
	blockAreTheTypesWrong,
	blockESLint,
	blockExports,
	blockTemplatedWith,
	presets,
} from "./index.ts";

vi.mock("./options/readGitDefaults.ts", async () => {
	const { default: gitUrlParse } = await import("git-url-parse");
	return {
		readGitDefaults: () =>
			gitUrlParse("https://github.com/JoshuaKGoldberg/create-typescript-app"),
	};
});

vi.mock("./utils/resolveBin.ts", () => ({
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
// Most addons are inferred from the files on disk by each block's intake();
// only the ones without an intake need to be listed here.
// If you change one of those on disk, you'll need to manually update here too.
// TODO: Eventually the create engine will be able to infer them:
//   https://github.com/JoshuaKGoldberg/bingo/issues/128
//
// For example, if you change blockTypeScript's target from "ES2023" to "ES2024",
// you'll also need to update the ./tsconfig.json on disk in the same way.
test("Producing the everything preset matches the files in this repository", async () => {
	const actual = (await intake(".", {
		exclude: /node_modules|^\.git$/,
	})) as IntakeDirectory;

	const created = producePreset(presets.everything, {
		files: actual,
		options: (await prepareOptions(base)) as BaseOptions,
		refinements: {
			addons: [
				blockESLint({
					explanations: [
						`👋 Hi! This ESLint configuration contains a lot more stuff than many repos'!
You can read from it to see all sorts of linting goodness, but don't worry -
it's not something you need to exhaustively understand immediately. 💙

If you're interested in learning more, see the 'getting started' docs on:
- ESLint: https://eslint.org
- typescript-eslint: https://typescript-eslint.io`,
					],
					extensions: [
						{
							files: ["**/*.{js,ts}"],
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
											{
												allowBoolean: true,
												allowNullish: true,
												allowNumber: true,
											},
										],
										"n/no-unsupported-features/node-builtins": [
											"error",
											{
												allowExperimental: true,
												ignores: ["import.meta.dirname"],
											},
										],
									},
								},
							],
						},
					],
				}),
				blockExports({
					runArgs: ["--version"],
				}),
			],
			blocks: {
				add: [blockAreTheTypesWrong],
				exclude: [blockTemplatedWith],
			},
		},
	});

	const processText = (text: string, filePath: string) =>
		/all-contributorsrc|js|md|ts|yaml/.test(filePath)
			? prettier.format(text, { filepath: filePath, useTabs: true })
			: text;

	expect(
		diffCreatedDirectory(actual, created.files, { processText }),
	).toBeUndefined();
});
