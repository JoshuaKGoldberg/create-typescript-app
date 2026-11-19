import { Block } from "bingo-stratum";
import { describe, expect, test } from "vitest";

import { blocks } from "./index.ts";

describe("blocks", () => {
	// Block names are used to create CLI flags, so duplicates would collide.
	test("block names are unique", () => {
		const names = (Object.values(blocks) as Block[]).map(
			(block) => block.about?.name,
		);

		expect(names).toEqual([...new Set(names)]);
	});
});
