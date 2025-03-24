import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test, vi } from "vitest";

import { blockRemoveDependencies } from "./blockRemoveDependencies.js";
import { optionsBase } from "./options.fakes.js";

vi.mock("../utils/resolveBin.js", () => ({
	resolveBin: (bin: string) => `path/to/${bin}`,
}));

describe("blockRemoveDependencies", () => {
	test("without addons or mode", () => {
		const creation = testBlock(blockRemoveDependencies, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	test("with addons", () => {
		const creation = testBlock(blockRemoveDependencies, {
			addons: {
				dependencies: ["a", "b", "c"],
			},
			options: optionsBase,
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

	test("with addons and mode", () => {
		const creation = testBlock(blockRemoveDependencies, {
			addons: {
				dependencies: ["a", "b", "c"],
			},
			mode: "transition",
			options: optionsBase,
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
