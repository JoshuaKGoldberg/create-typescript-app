import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test, vi } from "vitest";

import { blockRemoveDependencies } from "./blockRemoveDependencies.ts";
import { optionsBase } from "./options.fakes.ts";

vi.mock("../utils/resolveBin.ts", () => ({
	resolveBin: (bin: string) => `path/to/${bin}`,
}));

describe(blockRemoveDependencies, () => {
	test("without props or mode", () => {
		const creation = testBlock(blockRemoveDependencies, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	test("with props", () => {
		const creation = testBlock(blockRemoveDependencies, {
			options: optionsBase,
			props: {
				dependencies: ["a", "b", "c"],
			},
		});

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	test("with mode", () => {
		const creation = testBlock(blockRemoveDependencies, {
			mode: "transition",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	test("with props and mode", () => {
		const creation = testBlock(blockRemoveDependencies, {
			mode: "transition",
			options: optionsBase,
			props: {
				dependencies: ["a", "b", "c"],
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "scripts": [
			    {
			      "commands": [
			        "node path/to/remove-dependencies/bin/index.js a b c",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});
});
