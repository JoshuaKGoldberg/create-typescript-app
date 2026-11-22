import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockPnpmDedupe } from "./blockPnpmDedupe.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockPnpmDedupe, () => {
	test("without mode", () => {
		const creation = testBlock(blockPnpmDedupe, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Dedupe Check",
			            "sequential": true,
			            "steps": [
			              {
			                "run": "pnpm dedupe --check",
			              },
			            ],
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "cleanupCommands": [
			          "pnpm dedupe --prefer-offline",
			        ],
			      },
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
			  "extensions": [
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Dedupe Check",
			            "sequential": true,
			            "steps": [
			              {
			                "run": "pnpm dedupe --check",
			              },
			            ],
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "cleanupCommands": [
			          "pnpm dedupe --prefer-offline",
			        ],
			      },
			    },
			    {
			      "block": "[Block Remove Workflows]",
			      "props": {
			        "workflows": [
			          "lint-packages",
			        ],
			      },
			    },
			  ],
			}
		`);
	});
});
