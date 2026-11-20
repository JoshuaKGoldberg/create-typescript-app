import { testBlock } from "bingo-stratum-testers";
import { describe, expect, it } from "vitest";

import { blockPackageJson } from "./blockPackageJson.ts";
import { blockPnpmDevEngines } from "./blockPnpmDevEngines.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { optionsBase } from "./options.fakes.ts";

describe("blockPnpmDevEngines", () => {
	it("only removes .nvmrc when options.node.pinned does not exist", () => {
		const creation = testBlock(blockPnpmDevEngines, { options: optionsBase });

		expect(creation).toEqual({
			addons: [blockRemoveFiles({ files: [".nvmrc"] })],
		});
	});

	it("also sets devEngines.runtime when options.node.pinned exists", () => {
		const creation = testBlock(blockPnpmDevEngines, {
			options: {
				...optionsBase,
				node: { minimum: ">=20.19.0", pinned: "24.3.0" },
			},
		});

		expect(creation).toEqual({
			addons: [
				blockPackageJson({
					properties: {
						devEngines: {
							runtime: {
								name: "node",
								onFail: "download",
								version: "24.3.0",
							},
						},
					},
				}),
				blockRemoveFiles({ files: [".nvmrc"] }),
			],
		});
	});
});
