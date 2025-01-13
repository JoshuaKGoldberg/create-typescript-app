import { describe, expect, it } from "vitest";

import { parsePackageAuthor } from "./parsePackageAuthor.js";

describe("parsePackageAuthor", () => {
	it.each([
		[{}, {}],
		[{ author: "abc123" }, { author: "abc123" }],
		[
			{ author: "abc123", email: "def@ghi.com" },
			{ author: "abc123 <def@ghi.com>" },
		],
		[
			{ author: "abc123", email: "def@ghi.com" },
			{ author: "abc123 <def@ghi.com>" },
		],
		[
			{ author: "abc123", email: "def@ghi.com" },
			{ author: { email: "def@ghi.com", name: "abc123" } },
		],
	])("returns %s when given %s", (expected, packageData) => {
		expect(parsePackageAuthor(packageData)).toEqual(expected);
	});
});
