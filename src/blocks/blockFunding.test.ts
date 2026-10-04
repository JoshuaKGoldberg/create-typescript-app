import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockCSpell } from "./blockCSpell.ts";
import { blockFunding } from "./blockFunding.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { optionsBase } from "./options.fakes.ts";

describe("blockFunding", () => {
	test("marks FUNDING.yaml as previously FUNDING.yml", () => {
		const creation = testBlock(blockFunding, {
			options: { ...optionsBase, funding: "abc" },
		});

		expect(creation.files).toEqual({
			".github": {
				"FUNDING.yaml": [expect.any(String), { previously: ["FUNDING.yml"] }],
			},
		});
	});

	test("adds funding to CSpell words when funding exists", () => {
		const creation = testBlock(blockFunding, {
			options: { ...optionsBase, funding: "abc" },
		});

		expect(creation.addons).toEqual([blockCSpell({ words: ["abc"] })]);
	});

	test("does not add CSpell words when funding does not exist", () => {
		const creation = testBlock(blockFunding, {
			options: optionsBase,
		});

		expect(creation.addons).toEqual([]);
	});

	test("transition mode", () => {
		const creation = testBlock(blockFunding, {
			mode: "transition",
			options: optionsBase,
		});

		expect(creation.addons).toContainEqual(
			blockRemoveFiles({ files: [".github/FUNDING.yml"] }),
		);
	});
});
