import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockGitignore } from "./blockGitignore.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockGitignore, () => {
	test("without props", () => {
		const creation = testBlock(blockGitignore, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    ".gitignore": "/node_modules
			",
			  },
			}
		`);
	});

	test("with props", () => {
		const creation = testBlock(blockGitignore, {
			options: optionsBase,
			props: {
				ignores: ["/lib"],
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    ".gitignore": "/lib
			/node_modules
			",
			  },
			}
		`);
	});

	test("with duplicate and negated props", () => {
		const creation = testBlock(blockGitignore, {
			options: optionsBase,
			props: {
				ignores: ["!/docs/keep.md", "/node_modules", "/docs", "*.log"],
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    ".gitignore": "*.log
			/docs
			/node_modules
			!/docs/keep.md
			",
			  },
			}
		`);
	});

	test("with existing entries and removals", () => {
		const creation = testBlock(blockGitignore, {
			options: optionsBase,
			props: {
				existing: [".env", "/lib", "node_modules/"],
				ignores: ["/lib"],
				removals: ["/lib", ".env"],
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    ".gitignore": "/lib
			/node_modules
			",
			  },
			}
		`);
	});

	describe("intake", () => {
		test("returns undefined when .gitignore does not exist", () => {
			const actual = testIntake(blockGitignore, {
				files: {},
			});

			expect(actual).toBeUndefined();
		});

		test("returns existing entries without blank lines or comments", () => {
			const actual = testIntake(blockGitignore, {
				files: {
					".gitignore": [
						["# Build output", "lib/", "", "  .env  ", "*.log"].join("\n"),
					],
				},
			});

			expect(actual).toEqual({
				existing: ["lib/", ".env", "*.log"],
			});
		});
	});
});
