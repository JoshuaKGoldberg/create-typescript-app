import { testBlock } from "bingo-stratum-testers";
import { describe, expect, it } from "vitest";

import { blockMain } from "./blockMain.js";
import { optionsBase } from "./options.fakes.js";

describe("blockMain", () => {
	it("without addons", () => {
		const creation = testBlock(blockMain, { options: optionsBase });

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "properties": {
			          "main": "lib/index.js",
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "runInCI": [
			          "node lib/index.js",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});

	it("with addons", () => {
		const creation = testBlock(blockMain, {
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
			          "main": "other.js",
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
