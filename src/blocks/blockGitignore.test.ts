import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockGitignore } from "./blockGitignore.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockGitignore, () => {
	test("without addons", () => {
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

	test("with addons", () => {
		const creation = testBlock(blockGitignore, {
			addons: {
				ignores: ["/lib"],
			},
			options: optionsBase,
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

	test("with duplicate and negated addons", () => {
		const creation = testBlock(blockGitignore, {
			addons: {
				ignores: ["!/docs/keep.md", "/node_modules", "/docs", "*.log"],
			},
			options: optionsBase,
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

	describe("intake", () => {
		test("returns undefined when .gitignore does not exist", () => {
			const actual = testIntake(blockGitignore, {
				files: {},
			});

			expect(actual).toBeUndefined();
		});

		test("returns entries without blank lines, comments, or legacy entries", () => {
			const actual = testIntake(blockGitignore, {
				files: {
					".gitignore": [
						[
							"# Build output",
							"lib/",
							"/coverage",
							"",
							"node_modules/",
							"  .env  ",
							"*.log",
						].join("\n"),
					],
				},
			});

			expect(actual).toEqual({
				ignores: ["/coverage", ".env", "*.log"],
			});
		});
	});
});
