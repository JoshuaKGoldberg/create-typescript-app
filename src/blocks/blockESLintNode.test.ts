import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test, vi } from "vitest";

import { blockESLintNode } from "./blockESLintNode.js";
import { optionsBase } from "./options.fakes.js";

vi.mock("../utils/resolveBin.js", () => ({
	resolveBin: (bin: string) => `path/to/${bin}`,
}));

describe("blockESLintNode", () => {
	test("production", () => {
		const creation = testBlock(blockESLintNode, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "extensions": [
			          "n.configs["flat/recommended"]",
			          {
			            "extends": [
			              "tseslint.configs.disableTypeChecked",
			            ],
			            "files": [
			              "**/*.md/*.ts",
			            ],
			            "rules": [
			              {
			                "entries": {
			                  "n/no-missing-import": "off",
			                },
			              },
			              {
			                "comment": "https://github.com/eslint-community/eslint-plugin-n/issues/472",
			                "entries": {
			                  "n/no-unpublished-bin": "off",
			                },
			              },
			            ],
			          },
			        ],
			        "imports": [
			          {
			            "source": "eslint-plugin-n",
			            "specifier": "n",
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
