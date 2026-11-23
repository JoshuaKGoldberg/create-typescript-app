import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockESLintPackageJson } from "./blockESLintPackageJson.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockESLintPackageJson, () => {
	test("without mode", () => {
		const creation = testBlock(blockESLintPackageJson, {
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
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "properties": {
			          "scripts": {
			            "lint:package-json": undefined,
			          },
			        },
			      },
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
			  "extensions": [
			    {
			      "block": "[Block ESLint]",
			      "props": {
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
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "properties": {
			          "scripts": {
			            "lint:package-json": undefined,
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block CSpell]",
			      "props": {
			        "wordRemovals": [
			          "npmpackagejsonlintrc",
			        ],
			      },
			    },
			    {
			      "block": "[Block Remove Files]",
			      "props": {
			        "files": [
			          ".npmpackagejsonlintrc*",
			        ],
			      },
			    },
			    {
			      "block": "[Block Remove Dependencies]",
			      "props": {
			        "dependencies": [
			          "npm-package-json-lint",
			          "npm-package-json-lint-config-default",
			        ],
			      },
			    },
			    {
			      "block": "[Block Remove Workflows]",
			      "props": {
			        "workflows": [
			          "lint-package-json",
			        ],
			      },
			    },
			  ],
			}
		`);
	});
});
