import { describe, expect, it, vi } from "vitest";

import { readPackageData } from "./readPackageData.js";

describe(readPackageData, () => {
	it("returns {} when reading package.json results in an error", async () => {
		const take = vi.fn().mockResolvedValueOnce(new Error("Oh no!"));

		const actual = await readPackageData(take);

		expect(actual).toEqual({});
	});

	it("returns {} when package.json is empty", async () => {
		const take = vi.fn().mockResolvedValueOnce("");

		const actual = await readPackageData(take);

		expect(actual).toEqual({});
	});

	it("returns file data when there is a package.json", async () => {
		const packageData = { name: "test-name" };
		const take = vi.fn().mockResolvedValueOnce(packageData);

		const actual = await readPackageData(take);

		expect(actual).toBe(packageData);
	});
});
