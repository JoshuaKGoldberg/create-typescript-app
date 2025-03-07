import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockRepositoryBranchRuleset } from "./blockRepositoryBranchRuleset.js";
import { optionsBase } from "./options.fakes.js";

describe("blockRepositoryBranchRuleset", () => {
	test("without addons when mode is undefined", () => {
		const creation = testBlock(blockRepositoryBranchRuleset, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	// TODO for improving the "requests" snapshots:
	// https://github.com/JoshuaKGoldberg/bingo/issues/65

	test("without addons when mode is setup", () => {
		const creation = testBlock(blockRepositoryBranchRuleset, {
			mode: "setup",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "id": "branch-ruleset-create",
			      "send": [Function],
			    },
			  ],
			}
		`);
	});

	test("without addons when mode is transition", () => {
		const creation = testBlock(blockRepositoryBranchRuleset, {
			mode: "transition",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "id": "branch-ruleset-update",
			      "send": [Function],
			    },
			  ],
			}
		`);
	});

	test("with addons when mode is undefined", () => {
		const creation = testBlock(blockRepositoryBranchRuleset, {
			addons: {
				requiredStatusChecks: ["build", "test"],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	test("with addons when mode is setup", () => {
		const creation = testBlock(blockRepositoryBranchRuleset, {
			addons: {
				requiredStatusChecks: ["build", "test"],
			},
			mode: "setup",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "id": "branch-ruleset-create",
			      "send": [Function],
			    },
			  ],
			}
		`);
	});

	test("with addons when mode is transition", () => {
		const creation = testBlock(blockRepositoryBranchRuleset, {
			addons: {
				requiredStatusChecks: ["build", "test"],
			},
			mode: "setup",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "id": "branch-ruleset-create",
			      "send": [Function],
			    },
			  ],
			}
		`);
	});

	test("with addons and a rulesetId option when mode is transition", () => {
		const creation = testBlock(blockRepositoryBranchRuleset, {
			addons: {
				requiredStatusChecks: ["build", "test"],
			},
			mode: "setup",
			options: {
				...optionsBase,
				rulesetId: "1234",
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "id": "branch-ruleset-create",
			      "send": [Function],
			    },
			  ],
			}
		`);
	});
});
