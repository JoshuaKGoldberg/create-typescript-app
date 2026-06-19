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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "cleanupCommands": [
			          "pnpm dedupe",
			        ],
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "cleanupCommands": [
			          "pnpm dedupe",
			        ],
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
