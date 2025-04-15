import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockESLintYML } from "./blockESLintYML.js";
import { optionsBase } from "./options.fakes.js";

describe("blockESLintYML", () => {
	test("production", () => {
		const creation = testBlock(blockESLintYML, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "extensions": [
			          {
			            "extends": [
			              "yml.configs["flat/standard"]",
			              "yml.configs["flat/prettier"]",
			            ],
			            "files": [
			              "**/*.{yml,yaml}",
			            ],
			            "rules": {
			              "yml/file-extension": [
			                "error",
			                {
			                  "extension": "yml",
			                },
			              ],
			              "yml/sort-keys": [
			                "error",
			                {
			                  "order": {
			                    "type": "asc",
			                  },
			                  "pathPattern": "^.*$",
			                },
			              ],
			              "yml/sort-sequence-values": [
			                "error",
			                {
			                  "order": {
			                    "type": "asc",
			                  },
			                  "pathPattern": "^.*$",
			                },
			              ],
			            },
			          },
			        ],
			        "imports": [
			          {
			            "source": "eslint-plugin-yml",
			            "specifier": "yml",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});
});
