import { MetadataFileType } from "create";
import { testBlock } from "create-testers";
import { describe, expect, it } from "vitest";

import { blockNvmrc } from "./blockNvmrc.js";
import { optionsBase } from "./options.fakes.js";

describe("blockNvmrc", () => {
	it("only includes metadata when options.node does not exist", async () => {
		const creation = await testBlock(blockNvmrc, { options: optionsBase });

		expect(creation).toEqual({
			metadata: [
				{ glob: ".nvmrc", parser: "yaml", type: MetadataFileType.Config },
			],
		});
	});

	it("also includes package when options.node exists without pinned", async () => {
		const creation = await testBlock(blockNvmrc, {
			options: { ...optionsBase, node: { minimum: "18.3.0" } },
		});

		expect(creation).toEqual({
			metadata: [
				{ glob: ".nvmrc", parser: "yaml", type: MetadataFileType.Config },
			],
			package: {
				engines: {
					node: `>=18.3.0`,
				},
			},
		});
	});

	it("also includes files when options.node exists with pinned", async () => {
		const creation = await testBlock(blockNvmrc, {
			options: {
				...optionsBase,
				node: { minimum: "18.3.0", pinned: "20.12.2" },
			},
		});

		expect(creation).toEqual({
			files: {
				".nvmrc": `20.12.2\n`,
			},
			metadata: [
				{ glob: ".nvmrc", parser: "yaml", type: MetadataFileType.Config },
			],
			package: {
				engines: {
					node: `>=18.3.0`,
				},
			},
		});
	});
});
