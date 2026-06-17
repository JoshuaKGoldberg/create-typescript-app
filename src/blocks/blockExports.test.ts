import { testBlock } from "bingo-stratum-testers";
import { describe, expect, it } from "vitest";

import { blockExports } from "./blockExports.js";
import { optionsBase } from "./options.fakes.js";

describe(blockExports, () => {
	it("without addons", () => {
		const creation = testBlock(blockExports, { options: optionsBase });

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "properties": {
			          "exports": {
			            ".": "./lib/index.js",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "runInCI": [
			          "node ./lib/index.js",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});

	it("with addons", () => {
		const creation = testBlock(blockExports, {
			addons: {
				filePath: "other.js",
				runArgs: ["--version"],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "properties": {
			          "exports": {
			            ".": "./other.js",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "runInCI": [
			          "node other.js --version",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});
});
