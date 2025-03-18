import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test, vi } from "vitest";

import { blockESLintPackageJson } from "./blockESLintPackageJson.js";
import { optionsBase } from "./options.fakes.js";

describe("blockESLintPackageJson", () => {
	test("production", () => {
		const creation = testBlock(blockESLintPackageJson, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "extensions": [
			          "packageJson.configs.recommended",
			        ],
			        "imports": [
			          {
			            "source": "eslint-plugin-package-json",
			            "specifier": "packageJson",
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
