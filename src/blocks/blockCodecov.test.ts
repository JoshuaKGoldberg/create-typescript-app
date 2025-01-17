import { testBlock } from "create-testers";
import { describe, expect, test } from "vitest";

import { blockCodecov } from "./blockCodecov.js";
import { optionsBase } from "./options.fakes.js";

describe("blockCodecov", () => {
	test("without addons or mode", () => {
		const creation = testBlock(blockCodecov, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "apps": [
			          {
			            "name": "Codecov",
			            "url": "https://github.com/apps/codecov",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "actionSteps": [
			          {
			            "if": "always()",
			            "uses": "codecov/codecov-action@v3",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});

	test("migration mode", () => {
		const creation = testBlock(blockCodecov, {
			mode: "migrate",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "apps": [
			          {
			            "name": "Codecov",
			            "url": "https://github.com/apps/codecov",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "actionSteps": [
			          {
			            "if": "always()",
			            "uses": "codecov/codecov-action@v3",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "scripts": [
			    {
			      "commands": [
			        "rm .github/codecov.yml codecov.yml",
			      ],
			      "phase": 0,
			      "silent": true,
			    },
			  ],
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockCodecov, {
			addons: {
				env: {
					CODECOV_TOKEN: "${{ secrets.CODECOV_TOKEN }}",
				},
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "apps": [
			          {
			            "name": "Codecov",
			            "url": "https://github.com/apps/codecov",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "actionSteps": [
			          {
			            "env": {
			              "CODECOV_TOKEN": "\${{ secrets.CODECOV_TOKEN }}",
			            },
			            "if": "always()",
			            "uses": "codecov/codecov-action@v3",
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
