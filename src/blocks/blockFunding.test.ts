import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockFunding } from "./blockFunding.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { optionsBase } from "./options.fakes.ts";

describe("blockFunding", () => {
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
