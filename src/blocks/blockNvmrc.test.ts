import { testBlock } from "bingo-stratum-testers";
import { describe, expect, it } from "vitest";

import { blockNvmrc } from "./blockNvmrc.js";
import { blockPrettier } from "./blockPrettier.js";
import { optionsBase } from "./options.fakes.js";

describe("blockNvmrc", () => {
	it("only includes blockPackageJson addons when options.node does not exist", () => {
		const creation = testBlock(blockNvmrc, { options: optionsBase });

		expect(creation).toEqual({
			addons: [
				blockPrettier({
					overrides: [{ files: ".nvmrc", options: { parser: "yaml" } }],
				}),
			],
		});
	});

	it("also includes files when options.node.pinned exists", () => {
		const creation = testBlock(blockNvmrc, {
			options: {
				...optionsBase,
				node: { minimum: ">=20.19.0", pinned: "24.3.0" },
			},
		});

		expect(creation).toEqual({
			addons: [
				blockPrettier({
					overrides: [{ files: ".nvmrc", options: { parser: "yaml" } }],
				}),
			],
			files: {
				".nvmrc": `24.3.0\n`,
			},
		});
	});
});
