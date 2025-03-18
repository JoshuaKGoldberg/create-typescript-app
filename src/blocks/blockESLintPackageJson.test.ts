import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test, vi } from "vitest";

import { blockESLintPackageJson } from "./blockESLintPackageJson.js";
import { optionsBase } from "./options.fakes.js";

vi.mock("../utils/resolveBin.js", () => ({
	resolveBin: (bin: string) => `path/to/${bin}`,
}));

describe("blockESLintPackageJson", () => {
	test("production", () => {
		const creation = testBlock(blockESLintPackageJson, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "extensions": [
			          "packageJson",
			        ],
			        "imports": [
			          {
			            "source": "eslint-plugin-package-json",
			            "specifier": "packageJson",
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
