import { testBlock } from "create-testers";
import { describe, expect, test } from "vitest";

import { blockRepositoryBranchProtection } from "./blockRepositoryBranchProtection.js";
import { optionsBase } from "./options.fakes.js";

describe("blockRepositoryBranchProtection", () => {
	test("without addons", () => {
		const creation = testBlock(blockRepositoryBranchProtection, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "id": "branch-protection",
			      "send": [Function],
			    },
			  ],
			}
		`);
	});

	// TODO for improving the "requests" snapshots:
	// https://github.com/JoshuaKGoldberg/create/issues/65

	test("with addons", () => {
		const creation = testBlock(blockRepositoryBranchProtection, {
			addons: {
				requiredStatusChecks: ["build", "test"],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "id": "branch-protection",
			      "send": [Function],
			    },
			  ],
			}
		`);
	});
});
