import { describe, expect, test } from "vitest";

import { getPrimaryBin } from "./getPrimaryBin.js";

const repository = "test-repository";

describe(getPrimaryBin, () => {
	test.each([
		[undefined, undefined],
		["bin/index.js", "bin/index.js"],
		[{ [repository]: "bin/index.js" }, "bin/index.js"],
		[{}, undefined],
		[{ other: "bin/index.js" }, undefined],
	])("%j", (bin, expected) => {
		expect(getPrimaryBin(bin, repository)).toBe(expected);
	});
});
