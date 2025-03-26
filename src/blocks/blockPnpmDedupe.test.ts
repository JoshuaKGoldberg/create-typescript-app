import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockPnpmDedupe } from "./blockPnpmDedupe.js";
import { optionsBase } from "./options.fakes.js";

describe("blockPnpmDedupe", () => {
	test("without mode", () => {
		const creation = testBlock(blockPnpmDedupe, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "sections": {
			          "Linting": {
			            "contents": {
			              "items": [
			                "- \`pnpm lint:packages\` ([pnpm dedupe --check](https://pnpm.io/cli/dedupe)): Checks for unnecessarily duplicated packages in the \`pnpm-lock.yml\` file",
			              ],
			            },
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Lint Packages",
			            "steps": [
			              {
			                "run": "pnpm lint:packages",
			              },
			            ],
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "cleanupCommands": [
			          "pnpm dedupe",
			        ],
			        "properties": {
			          "scripts": {
			            "lint:packages": "pnpm dedupe --check",
			          },
			        },
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});

	test("transition mode", () => {
		const creation = testBlock(blockPnpmDedupe, {
			mode: "transition",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "sections": {
			          "Linting": {
			            "contents": {
			              "items": [
			                "- \`pnpm lint:packages\` ([pnpm dedupe --check](https://pnpm.io/cli/dedupe)): Checks for unnecessarily duplicated packages in the \`pnpm-lock.yml\` file",
			              ],
			            },
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Lint Packages",
			            "steps": [
			              {
			                "run": "pnpm lint:packages",
			              },
			            ],
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "cleanupCommands": [
			          "pnpm dedupe",
			        ],
			        "properties": {
			          "scripts": {
			            "lint:packages": "pnpm dedupe --check",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "workflows": [
			          "lint-packages",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});
});
