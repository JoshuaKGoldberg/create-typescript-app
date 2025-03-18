import { describe, expect, it, vi } from "vitest";

import { readPackageDataFull } from "./readPackageDataFull.js";

describe(readPackageDataFull, () => {
	it("returns {} when reading package.json results in an error", async () => {
		const take = vi.fn().mockResolvedValueOnce(new Error("Oh no!"));

		const actual = await readPackageDataFull(take);

		expect(actual).toEqual({});
	});

	it("returns {} when package.json is empty", async () => {
		const take = vi.fn().mockResolvedValueOnce("");

		const actual = await readPackageDataFull(take);

		expect(actual).toEqual({});
	});
	it("returns file data when there is a package.json", async () => {
		const packageData = { name: "test-name" };
		const take = vi.fn().mockResolvedValueOnce(packageData);

		const actual = await readPackageDataFull(take);

		expect(actual).toBe(packageData);
	});
});
