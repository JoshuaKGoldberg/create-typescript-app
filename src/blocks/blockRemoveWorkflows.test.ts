import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockRemoveWorkflows } from "./blockRemoveWorkflows.js";
import { optionsBase } from "./options.fakes.js";

describe("blockRemoveWorkflows", () => {
	test("without addons or mode", () => {
		const creation = testBlock(blockRemoveWorkflows, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	test("with addons", () => {
		const creation = testBlock(blockRemoveWorkflows, {
			addons: {
				workflows: ["a", "b", "c"],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	test("with mode", () => {
		const creation = testBlock(blockRemoveWorkflows, {
			mode: "transition",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "files": undefined,
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});

	test("with addons and mode", () => {
		const creation = testBlock(blockRemoveWorkflows, {
			addons: {
				workflows: ["a", "b", "c"],
			},
			mode: "transition",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "files": [
			          ".github/workflows/a.yml",
			          ".github/workflows/b.yml",
			          ".github/workflows/c.yml",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});
});
