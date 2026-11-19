import { Block } from "bingo-stratum";
import { describe, expect, test } from "vitest";

import { blocks } from "./index.ts";

describe("blocks", () => {
	test("block names are unique", () => {
		const names = (Object.values(blocks) as Block[]).map(
			(block) => block.about?.name,
		);

		expect(names).toEqual([...new Set(names)]);
	});
});
