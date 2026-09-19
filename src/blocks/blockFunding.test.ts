import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockFunding } from "./blockFunding.js";
import { blockRemoveFiles } from "./blockRemoveFiles.js";
import { optionsBase } from "./options.fakes.js";

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
