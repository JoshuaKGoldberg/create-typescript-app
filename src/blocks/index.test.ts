import { Block } from "bingo-stratum";
import { describe, expect, test } from "vitest";

import { presetEverything } from "../presets/everything.ts";
import { presetMinimal } from "../presets/minimal.ts";
import * as blocksModule from "./index.ts";
import { blocks } from "./index.ts";

describe("blocks", () => {
	test("block names are unique", () => {
		const names = (Object.values(blocks) as Block[]).map(
			(block) => block.about?.name,
		);

		expect(names).toEqual([...new Set(names)]);
	});

	test.each([
		["blocks", blocks],
		["named exports", blocksModule],
	])(
		"%s include every block added on top of the minimal preset",
		(_, exports) => {
			const exported = new Set<unknown>(Object.values(exports));
			const missing = presetEverything.blocks
				.filter(
					(block) =>
						!presetMinimal.blocks.includes(block) && !exported.has(block),
				)
				.map((block) => block.about?.name);

			expect(missing).toEqual([]);
		},
	);
});
