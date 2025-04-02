import { describe, expect, it } from "vitest";

import { readPackageAuthor } from "./readPackageAuthor.js";

describe(readPackageAuthor, () => {
	it.each([
		[{}, {}],
		[{ name: "abc123" }, { author: "abc123" }],
		[
			{ email: "def@ghi.com", name: "abc123" },
			{ author: "abc123 <def@ghi.com>" },
		],
		[
			{ email: "def@ghi.com", name: "abc123" },
			{ author: "abc123 <def@ghi.com>" },
		],
		[
			{ email: "def@ghi.com", name: "abc123" },
			{ author: { email: "def@ghi.com", name: "abc123" } },
		],
	])("returns %s when given %s", async (expected, packageDataFull) => {
		const actual = await readPackageAuthor(() =>
			Promise.resolve(packageDataFull),
		);

		expect(actual).toEqual(expected);
	});
});
