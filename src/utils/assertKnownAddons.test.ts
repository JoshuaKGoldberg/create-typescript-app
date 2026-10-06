import { describe, expect, it } from "vitest";

import { assertKnownAddons } from "./assertKnownAddons.ts";

describe(assertKnownAddons, () => {
	it("does not throw when addons are undefined", () => {
		expect(() => {
			assertKnownAddons("Example", new Set(["a"]), undefined);
		}).not.toThrow();
	});

	it("does not throw when all addons are known", () => {
		expect(() => {
			assertKnownAddons("Example", new Set(["a", "b"]), { a: 1 });
		}).not.toThrow();
	});

	it("throws when an addon is unknown and the Block has a name", () => {
		expect(() => {
			assertKnownAddons("Example", new Set(["a"]), { a: 1, b: 2, c: 3 });
		}).toThrowErrorMatchingInlineSnapshot(
			`[Error: Unknown Addon(s) passed to Block Example: b, c. Known Addons are: a.]`,
		);
	});

	it("throws when an addon is unknown and the Block has no name", () => {
		expect(() => {
			assertKnownAddons(undefined, new Set(["a"]), { b: 2 });
		}).toThrowErrorMatchingInlineSnapshot(
			`[Error: Unknown Addon(s) passed to a Block: b. Known Addons are: a.]`,
		);
	});
});
