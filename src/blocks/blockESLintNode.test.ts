import { testBlock } from "create-testers";
import { describe, expect, test, vi } from "vitest";

import { blockESLintNode } from "./blockESLintNode.js";
import { optionsBase } from "./options.fakes.js";

vi.mock("../utils/resolveBin.js", () => ({
	resolveBin: (bin: string) => `path/to/${bin}`,
}));

describe("blockESLintNode", () => {
	test("when options.usage does not have a repository import", () => {
		const creation = testBlock(blockESLintNode, {
			options: { ...optionsBase, usage: `...` },
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

	test("when options.usage does have a repository import", () => {
		const creation = testBlock(blockESLintNode, {
			options: {
				...optionsBase,
				usage: `\`\`\`ts
import { greet } from "${optionsBase.repository}";

greet();
\`\`\`
				`,
			},
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
			            "rules": {
			              "n/no-missing-import": [
			                "error",
			                {
			                  "allowModules": [
			                    "test-repository",
			                  ],
			                },
			              ],
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
