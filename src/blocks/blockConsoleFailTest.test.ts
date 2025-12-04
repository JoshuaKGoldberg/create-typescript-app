import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockConsoleFailTest } from "./blockConsoleFailTest.js";
import { optionsBase } from "./options.fakes.js";

describe("blockConsoleFailTest", () => {
	test("production", () => {
		const creation = testBlock(blockConsoleFailTest, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "console-fail-test": "0.6.1",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "additionalDocs": "
			Note that [console-fail-test](https://github.com/JoshuaKGoldberg/console-fail-test) is enabled for all test runs.
			Calls to \`console.log\`, \`console.warn\`, and other console methods will cause a test to fail.
			",
			        "setupFiles": [
			          "console-fail-test/setup",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});
});
