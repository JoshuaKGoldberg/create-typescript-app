import prettier from "@prettier/sync";
import { produceBase, producePreset } from "create";
import { intakeFromDirectory } from "create-fs";
import { diffCreatedDirectory } from "create-testers";
import { expect, test } from "vitest";

import {
	base,
	BaseOptions,
	blockAreTheTypesWrong,
	blockCSpell,
	blockESLint,
	blockKnip,
	blockTemplatedWith,
	blockTSup,
	presets,
} from "./index.js";

// This test checks the `create` production using options inferred from disk,
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
//   https://github.com/JoshuaKGoldberg/create/issues/128
//
// For example, if you change blockTypeScript's target from "ES2022 to "ES2023",
// you'll also need to update the ./tsconfig.json on disk in the same way.
test("Producing the everything preset matches the files in this repository", async () => {
	const actual = await intakeFromDirectory(".", {
		exclude: /node_modules|^\.git$/,
	});

	const created = await producePreset(presets.everything, {
		addons: [
			blockCSpell({
				words: [
					"Anson",
					"apexskier",
					"dbaeumer",
					"joshuakgoldberg",
					"markdownlintignore",
					"mtfoley",
					"infile",
					"npmjs",
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
						},
					},
				],
			}),
			blockKnip({
				ignoreDependencies: ["all-contributors-cli", "cspell-populate-words"],
			}),
			blockTSup({
				runArgs: ["--version"],
			}),
		],
		blocks: {
			add: [blockAreTheTypesWrong],
			exclude: [blockTemplatedWith],
		},
		options: (await produceBase(base)) as BaseOptions,
	});

	const processText = (text: string, filePath: string) =>
		/all-contributorsrc|js|md|ts|yml/.test(filePath)
			? prettier.format(text, { filepath: filePath, useTabs: true })
			: text;

	// Right now, there is exactly one change: the altered beta release flow
	// TODO: That will be removed once releases switch back to stable:
	// https://github.com/JoshuaKGoldberg/create-typescript-app/issues/1831
	expect(diffCreatedDirectory(actual, created.files, processText))
		.toMatchInlineSnapshot(`
			{
			  ".github": {
			    "workflows": {
			      "ci.yml": "@@ -64,11 +64,9 @@
			     steps:
			       - uses: actions/checkout@v4
			       - uses: ./.github/actions/prepare
			       - run: pnpm run test --coverage
			-      - env:
			-          CODECOV_TOKEN: \${{ secrets.CODECOV_TOKEN }}
			-        if: always()
			+      - if: always()
			         uses: codecov/codecov-action@v3
			   type_check:
			     name: Type Check
			     runs-on: ubuntu-latest
			",
			      "release.yml": "@@ -14,13 +14,9 @@
			       - run: pnpm build
			       - env:
			           GITHUB_TOKEN: \${{ secrets.ACCESS_TOKEN }}
			           NPM_TOKEN: \${{ secrets.NPM_TOKEN }}
			-        run: |
			-          git config --global user.email "git@joshuakgoldberg.com"
			-          git config --global user.name "Josh Goldberg"
			-          npm config set //registry.npmjs.org/:_authToken $NPM_TOKEN
			-      - run: npx release-it --preRelease=beta
			+        uses: JoshuaKGoldberg/release-it-action@v0.2.2
			 
			 name: Release
			 
			 on:
			",
			    },
			  },
			  "README.md": "@@ -1,9 +1,9 @@
			 <h1 align="center">Create TypeScript App</h1>
			 
			 <p align="center">
			-  Quickstart-friendly TypeScript template with comprehensive, configurable, opinionated tooling.
			-  🎁
			+	Quickstart-friendly TypeScript template with comprehensive, configurable, opinionated tooling.
			+	🎁
			 </p>
			 
			 <p align="center">
			 	<!-- prettier-ignore-start -->
			@@ -64,9 +64,8 @@
			 Thanks! 💖
			 
			 ## Contributors
			 
			-<!-- spellchecker: disable -->
			 <!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
			 <!-- prettier-ignore-start -->
			 <!-- markdownlint-disable -->
			 <table>
			@@ -145,5 +144,4 @@
			 <!-- markdownlint-restore -->
			 <!-- prettier-ignore-end -->
			 
			 <!-- ALL-CONTRIBUTORS-LIST:END -->
			-<!-- spellchecker: enable -->
			",
			}
		`);
});
