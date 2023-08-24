import { describe, expect, it, vi } from "vitest";

import { parsePackageAuthor } from "./parsePackageAuthor.js";

const mockReadFileSafe = vi.fn();

vi.mock("../../shared/readFileSafe.js", () => ({
	get readFileSafe() {
		return mockReadFileSafe;
	},
}));

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
