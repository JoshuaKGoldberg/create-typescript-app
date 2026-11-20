import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test, vi } from "vitest";

import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { optionsBase } from "./options.fakes.ts";

vi.mock("../utils/resolveBin.ts", () => ({
	resolveBin: (bin: string) => `path/to/${bin}`,
}));

describe(blockRemoveFiles, () => {
	test("without props or mode", () => {
		const creation = testBlock(blockRemoveFiles, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	test("with props", () => {
		const creation = testBlock(blockRemoveFiles, {
			options: optionsBase,
			props: {
				files: ["a", "b", "c"],
			},
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

	test("with props and mode", () => {
		const creation = testBlock(blockRemoveFiles, {
			mode: "transition",
			options: optionsBase,
			props: {
				files: ["a", "b", "c"],
			},
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
