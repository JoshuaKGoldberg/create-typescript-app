import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test, vi } from "vitest";

import { blockESLintNode } from "./blockESLintNode.ts";
import { optionsBase } from "./options.fakes.ts";

vi.mock("../utils/resolveBin.ts", () => ({
	resolveBin: (bin: string) => `path/to/${bin}`,
}));

describe(blockESLintNode, () => {
	test("production", () => {
		const creation = testBlock(blockESLintNode, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block ESLint]",
			      "props": {
			        "extensions": [
			          {
			            "extends": [
			              "n.configs["flat/recommended"]",
			            ],
			            "files": [
			              "**/*.{js,ts}",
			            ],
			          },
			          {
			            "files": [
			              "**/*.test.*",
			              "eslint.config.*",
			            ],
			            "rules": {
			              "n/no-unsupported-features/node-builtins": "off",
			            },
			          },
			        ],
			        "imports": [
			          {
			            "source": "eslint-plugin-n",
			            "specifier": "n",
			          },
			        ],
			      },
			    },
			  ],
			}
		`);
	});
});
