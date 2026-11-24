import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { resolveBin } from "./resolveBin.ts";

describe(resolveBin, () => {
	it.each([
		"cspell-populate-words/bin/index.mjs",
		"remove-dependencies/bin/index.js",
		"trash-cli/cli.js",
	])("resolves %s to a file that exists", (bin) => {
		expect(existsSync(resolveBin(bin))).toBe(true);
	});

	it("throws an error when the package can't be found", () => {
		expect(() => resolveBin("not-a-real-package/bin/index.js")).toThrow();
	});
});
