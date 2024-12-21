import { testBlock } from "create-testers";
import { describe, expect, test } from "vitest";

import { blockRepositoryBranchRuleset } from "./blockRepositoryBranchRuleset.js";
import { optionsBase } from "./options.fakes.js";

describe("blockRepositoryBranchRuleset", () => {
	test("without addons", () => {
		const creation = testBlock(blockRepositoryBranchRuleset, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "id": "branch-ruleset",
			      "send": [Function],
			    },
			  ],
			}
		`);
	});

	// TODO for improving the "requests" snapshots:
	// https://github.com/JoshuaKGoldberg/create/issues/65

	test("with addons", () => {
		const creation = testBlock(blockRepositoryBranchRuleset, {
			addons: {
				requiredStatusChecks: ["build", "test"],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "id": "branch-ruleset",
			      "send": [Function],
			    },
			  ],
			}
		`);
	});
});
