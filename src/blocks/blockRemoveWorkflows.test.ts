import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test } from "vitest";

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

	test("with reusable workflows and mode", () => {
		const creation = testBlock(blockRemoveWorkflows, {
			mode: "transition",
			options: optionsBase,
			props: {
				reusable: ["b"],
				workflows: ["a", "b"],
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
			        ],
			      },
			    },
			  ],
			}
		`);
	});

	describe("intake", () => {
		it("returns undefined when there are no workflows", () => {
			expect(testIntake(blockRemoveWorkflows, { files: {} })).toBeUndefined();
		});

		it("returns undefined when no workflow is reusable", () => {
			const actual = testIntake(blockRemoveWorkflows, {
				files: {
					".github": {
						workflows: {
							"format.yaml": ["on:\n  pull_request: ~"],
							"lint.yaml": ["on: push"],
							"tsc.yaml": ["invalid: ]"],
						},
					},
				},
			});

			expect(actual).toBeUndefined();
		});

		it.each([
			["a string", "on: workflow_call"],
			["an array", "on: [push, workflow_call]"],
			["an object", "on:\n  workflow_call:\n    inputs: {}"],
		])("returns a reusable workflow's name when on is %s", (_, contents) => {
			const actual = testIntake(blockRemoveWorkflows, {
				files: {
					".github": {
						workflows: {
							"format.yml": [contents],
							"lint.yaml": ["on: push"],
						},
					},
				},
			});

			expect(actual).toEqual({ reusable: ["format"] });
		});
	});
});
