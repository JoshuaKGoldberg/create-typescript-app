import { createConfig } from "create";

import {
	blockAreTheTypesWrong,
	blockESLint,
	blockTemplatedWith,
	blockTSup,
	presets,
} from "./src/index.ts";

export default createConfig(presets.everything, {
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
			rules: [
				{
					comment:
						"These on-by-default rules work well for this repo if configured",
					entries: {
						"@typescript-eslint/no-unnecessary-condition": [
							"error",
							{ allowConstantLoopConditions: true },
						],
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
							{ allowExperimental: true },
						],
					},
				},
			],
		}),
		blockTSup({
			runArgs: ["--version"],
		}),
	],
	blocks: {
		add: [blockAreTheTypesWrong],
		exclude: [blockTemplatedWith],
	},
});
