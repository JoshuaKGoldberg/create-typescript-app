import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockPnpmDedupe } from "./blockPnpmDedupe.ts";
import { optionsBase } from "./options.fakes.ts";

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
			        "jobs": [
			          {
			            "name": "Dedupe Check",
			            "steps": [
			              {
			                "run": "pnpm dedupe --check",
			              },
			            ],
			          },
			        ],
			      },
			      "block": "[Block GitHub Actions CI]",
			    },
			    {
			      "addons": {
			        "cleanupCommands": [
			          "pnpm dedupe",
			        ],
			      },
			      "block": "[Block Package JSON]",
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
			        "jobs": [
			          {
			            "name": "Dedupe Check",
			            "steps": [
			              {
			                "run": "pnpm dedupe --check",
			              },
			            ],
			          },
			        ],
			      },
			      "block": "[Block GitHub Actions CI]",
			    },
			    {
			      "addons": {
			        "cleanupCommands": [
			          "pnpm dedupe",
			        ],
			      },
			      "block": "[Block Package JSON]",
			    },
			    {
			      "addons": {
			        "workflows": [
			          "lint-packages",
			        ],
			      },
			      "block": "[Block Remove Workflows]",
			    },
			  ],
			}
		`);
	});
});
