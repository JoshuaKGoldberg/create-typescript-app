import { describe, expect, it, vi } from "vitest";

import { readPackageDataFull } from "./readPackageDataFull.js";

describe(readPackageDataFull, () => {
	it("returns {} when there is no package.json", async () => {
		const take = vi.fn().mockResolvedValueOnce(undefined);

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
