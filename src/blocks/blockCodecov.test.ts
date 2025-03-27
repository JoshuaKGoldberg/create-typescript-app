import { testBlock } from "bingo-stratum-testers";
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
			        "badges": [
			          {
			            "alt": "🧪 Coverage",
			            "href": "https://codecov.io/gh/test-owner/test-repository",
			            "src": "https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage",
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

	test("transition mode", () => {
		const creation = testBlock(blockCodecov, {
			mode: "transition",
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
				        "badges": [
				          {
				            "alt": "🧪 Coverage",
				            "href": "https://codecov.io/gh/test-owner/test-repository",
				            "src": "https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage",
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
				    {
				      "addons": {
				        "files": [
				          ".github/codecov.yml",
				          "codecov.yml",
				        ],
				      },
				      "block": [Function],
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
			      	        "badges": [
			      	          {
			      	            "alt": "🧪 Coverage",
			      	            "href": "https://codecov.io/gh/test-owner/test-repository",
			      	            "src": "https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage",
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
