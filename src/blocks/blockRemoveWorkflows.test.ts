import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockRemoveWorkflows } from "./blockRemoveWorkflows.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockRemoveWorkflows, () => {
	test("without props or mode", () => {
		const creation = testBlock(blockRemoveWorkflows, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	test("with props", () => {
		const creation = testBlock(blockRemoveWorkflows, {
			options: optionsBase,
			props: {
				workflows: ["a", "b", "c"],
			},
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
			  "extensions": [
			    {
			      "block": "[Block Remove Files]",
			      "props": {
			        "files": undefined,
			      },
			    },
			  ],
			}
		`);
	});

	test("with props and mode", () => {
		const creation = testBlock(blockRemoveWorkflows, {
			mode: "transition",
			options: optionsBase,
			props: {
				workflows: ["a", "b", "c"],
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block Remove Files]",
			      "props": {
			        "files": [
			          ".github/workflows/a.{yaml,yml}",
			          ".github/workflows/b.{yaml,yml}",
			          ".github/workflows/c.{yaml,yml}",
			        ],
			      },
			    },
			  ],
			}
		`);
	});
});
