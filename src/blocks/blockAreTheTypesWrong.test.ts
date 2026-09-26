import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockAreTheTypesWrong } from "./blockAreTheTypesWrong.ts";
import { optionsBase } from "./options.fakes.ts";

describe("blockAreTheTypesWrong", () => {
	test("production", () => {
		const creation = testBlock(blockAreTheTypesWrong, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Are The Types Wrong?",
			            "steps": [
			              {
			                "run": "pnpm build",
			              },
			              {
			                "run": "npx --yes @arethetypeswrong/cli --pack . --ignore-rules cjs-resolves-to-esm --profile esm-only",
			              },
			            ],
			          },
			        ],
			      },
			      "block": "[Block GitHub Actions CI]",
			    },
			  ],
			}
		`);
	});
});
