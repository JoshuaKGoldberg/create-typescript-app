import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockESLintPackageJson } from "./blockESLintPackageJson.ts";
import { optionsBase } from "./options.fakes.ts";

describe("blockESLintPackageJson", () => {
	test("without mode", () => {
		const creation = testBlock(blockESLintPackageJson, {
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
			              "packageJson.configs.recommended",
			              "packageJson.configs.stylistic",
			            ],
			            "files": [
			              "package.json",
			            ],
			          },
			        ],
			        "imports": [
			          {
			            "source": "eslint-plugin-package-json",
			            "specifier": "packageJson",
			          },
			        ],
			      },
			      "block": "[Block ESLint]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "scripts": {
			            "lint:package-json": undefined,
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			  ],
			}
		`);
	});

	test("transition mode", () => {
		const creation = testBlock(blockESLintPackageJson, {
			mode: "transition",
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
			              "packageJson.configs.recommended",
			              "packageJson.configs.stylistic",
			            ],
			            "files": [
			              "package.json",
			            ],
			          },
			        ],
			        "imports": [
			          {
			            "source": "eslint-plugin-package-json",
			            "specifier": "packageJson",
			          },
			        ],
			      },
			      "block": "[Block ESLint]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "scripts": {
			            "lint:package-json": undefined,
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			    {
			      "addons": {
			        "files": [
			          ".npmpackagejsonlintrc*",
			        ],
			      },
			      "block": "[Block Remove Files]",
			    },
			    {
			      "addons": {
			        "dependencies": [
			          "npm-package-json-lint",
			          "npm-package-json-lint-config-default",
			        ],
			      },
			      "block": "[Block Remove Dependencies]",
			    },
			    {
			      "addons": {
			        "workflows": [
			          "lint-package-json",
			        ],
			      },
			      "block": "[Block Remove Workflows]",
			    },
			  ],
			}
		`);
	});
});
