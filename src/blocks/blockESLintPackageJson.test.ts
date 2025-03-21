import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

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
			    {
			      "addons": {
			        "removedWorkflows": [
			          "lint-package-json",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "scripts": {
			            "lint:package-json": undefined,
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "dependencies": [
			          "npm-package-json-lint",
			          "npm-package-json-lint-config-default",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});
});
