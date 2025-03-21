import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test, vi } from "vitest";

import { blockRemoveFiles } from "./blockRemoveFiles.js";
import { optionsBase } from "./options.fakes.js";

vi.mock("../utils/resolveBin.js", () => ({
	resolveBin: (bin: string) => `path/to/${bin}`,
}));

describe("blockRemoveFiles", () => {
	test("without addons or mode", () => {
		const creation = testBlock(blockRemoveFiles, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	test("with addons", () => {
		const creation = testBlock(blockRemoveFiles, {
			addons: {
				files: ["a", "b", "c"],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	test("with mode", () => {
		const creation = testBlock(blockRemoveFiles, {
			mode: "transition",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	test("with addons and mode", () => {
		const creation = testBlock(blockRemoveFiles, {
			addons: {
				files: ["a", "b", "c"],
			},
			mode: "transition",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "scripts": [
			    {
			      "commands": [
			        "node path/to/trash-cli/cli.js a b c",
			      ],
			      "phase": 0,
			      "silent": true,
			    },
			  ],
			}
		`);
	});
});
