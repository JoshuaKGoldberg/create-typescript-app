import { testBlock } from "bingo-stratum-testers";
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
});
