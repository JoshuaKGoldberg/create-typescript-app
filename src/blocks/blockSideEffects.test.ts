import { testBlock } from "bingo-stratum-testers";
import { describe, expect, it } from "vitest";

import { blockSideEffects } from "./blockSideEffects.js";
import { optionsBase } from "./options.fakes.js";

describe(blockSideEffects, () => {
	it("without addons", () => {
		const creation = testBlock(blockSideEffects, { options: optionsBase });

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "properties": {
			          "sideEffects": false,
			        },
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});

	it("with addons (boolean)", () => {
		const creation = testBlock(blockSideEffects, {
			addons: {
				sideEffects: true,
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "properties": {
			          "sideEffects": true,
			        },
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});

	it("with addons (Array)", () => {
		const creation = testBlock(blockSideEffects, {
			addons: {
				sideEffects: ["./main.js"],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "properties": {
			          "sideEffects": [
			            "./main.js",
			          ],
			        },
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});
});
