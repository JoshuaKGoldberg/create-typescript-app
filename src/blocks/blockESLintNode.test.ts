import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test, vi } from "vitest";

import { blockESLintNode } from "./blockESLintNode.ts";
import { optionsBase } from "./options.fakes.ts";

vi.mock("../utils/resolveBin.ts", () => ({
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
			          {
			            "extends": [
			              "n.configs["flat/recommended"]",
			            ],
			            "files": [
			              "**/*.{js,ts}",
			            ],
			            "rules": [
			              {
			                "comment": "Relative imports should include their file extensions",
			                "entries": {
			                  "n/file-extension-in-import": [
			                    "error",
			                    "always",
			                  ],
			                },
			              },
			            ],
			          },
			          {
			            "extends": [
			              "tseslint.configs.disableTypeChecked",
			            ],
			            "files": [
			              "**/*.md/*.ts",
			            ],
			            "rules": {
			              "n/no-missing-import": "off",
			            },
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
			      "block": [Function],
			    },
			  ],
			}
		`);
	});
});
