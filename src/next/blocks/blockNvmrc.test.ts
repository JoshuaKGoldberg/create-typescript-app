import { testBlock } from "create-testers";
import { describe, expect, it } from "vitest";

import { blockNvmrc } from "./blockNvmrc.js";
import { blockPackageJson } from "./blockPackageJson.js";
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

	it("also includes package when options.node exists without pinned", () => {
		const creation = testBlock(blockNvmrc, {
			options: { ...optionsBase, node: { minimum: "18.3.0" } },
		});

		expect(creation).toEqual({
			addons: [
				blockPrettier({
					overrides: [{ files: ".nvmrc", options: { parser: "yaml" } }],
				}),
				blockPackageJson({
					properties: {
						engine: {
							node: ">=18.3.0",
						},
					},
				}),
			],
		});
	});

	it("also includes files when options.node exists with pinned", () => {
		const creation = testBlock(blockNvmrc, {
			options: {
				...optionsBase,
				node: { minimum: "18.3.0", pinned: "20.12.2" },
			},
		});

		expect(creation).toEqual({
			addons: [
				blockPrettier({
					overrides: [{ files: ".nvmrc", options: { parser: "yaml" } }],
				}),
				blockPackageJson({
					properties: {
						engine: {
							node: ">=18.3.0",
						},
					},
				}),
			],
			files: {
				".nvmrc": `20.12.2\n`,
			},
		});
	});
});
