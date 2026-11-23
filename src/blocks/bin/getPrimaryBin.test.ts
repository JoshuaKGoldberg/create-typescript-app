import { describe, expect, test } from "vitest";

import { getPrimaryBin } from "./getPrimaryBin.ts";

const repository = "Test-Repository";

describe(getPrimaryBin, () => {
	test.each([
		[undefined, repository, undefined],
		["bin/index.js", repository, "bin/index.js"],
		["bin/index.js", undefined, "bin/index.js"],
		[{ [repository]: "bin/index.js" }, repository, "bin/index.js"],
		[{ "test-repository": "bin/index.js" }, repository, "bin/index.js"],
		[
			{ [repository]: "bin/index.js", "test-repository": "bin/other.js" },
			repository,
			"bin/index.js",
		],
		[{ [repository]: "bin/index.js" }, undefined, undefined],
		[{}, repository, undefined],
		[{ other: "bin/index.js" }, repository, undefined],
	])("%j in %s", (bin, name, expected) => {
		expect(getPrimaryBin(bin, name)).toBe(expected);
	});
});
