import { createConfig } from "create";

import {
	blockAreTheTypesWrong,
	blockCSpell,
	blockGitHubActionsCI,
	blockTemplatedBy,
	blockVitest,
} from "./src/next/blocks/index.js";
import { presetEverything } from "./src/next/presetEverything.js";

export default createConfig(presetEverything, {
	addons: [
		blockCSpell({
			ignores: ["/script/__snapshots__"],
			words: ["joshuakgoldberg", "wontfix"],
		}),
		blockGitHubActionsCI({
			jobs: [
				{
					name: "Test Creation Script",
					steps: [
						{ run: "pnpm run build" },
						{ run: "pnpm run test:create" },
						{
							if: "always()",
							uses: "codecov/codecov-action@v3",
							with: {
								files: "coverage-create/lcov.info",
								flags: "create",
							},
						},
					],
				},
				{
					name: "Test Initialization Script",
					steps: [
						{ run: "pnpm run build" },
						{ run: "pnpm run test:initialize" },
						{
							if: "always()",
							uses: "codecov/codecov-action@v3",
							with: {
								files: "coverage-initialize/lcov.info",
								flags: "initialize",
							},
						},
					],
				},
				{
					name: "Test Migration Script",
					steps: [
						{ run: "pnpm run build" },
						{ run: "pnpm run test:migrate" },
						{
							if: "always()",
							uses: "codecov/codecov-action@v3",
							with: {
								files: "coverage-migrate/lcov.info",
								flags: "migrate",
							},
						},
					],
				},
			],
		}),
		blockVitest({
			coverage: {
				directory: "coverage*",
				flags: "unit",
			},
		}),
	],
	blocks: {
		add: [blockAreTheTypesWrong],
		remove: [blockTemplatedBy],
	},
});
