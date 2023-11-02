import { describe, expect, it, vi } from "vitest";

import packageData from "../../package.json" assert { type: "json" };
import { getVersionFromPackageJson } from "./packageJson.js";

const mockReadFileSafeAsJson = vi.fn();

/* 
Mock the readFileSafeAsJson function that is called in getVersionFromPackageJson().

Modeled on readDefaultsFromDevelopment.test.ts line 7
*/
vi.mock("../shared/readFileSafeAsJson", () => ({
	get readFileSafeAsJson() {
		return mockReadFileSafeAsJson;
	},
}));

describe("getVersionFromPackageJson", () => {
	it("returns the current version number from the package.json", async () => {
		const version = await getVersionFromPackageJson();

		expect(version).toBe(packageData.version);
	});

	// Failing test
	it("throws an error when there is no version number", async () => {
		/*
			First calling the mocked function similar to line 16 of
			readDefaultFromDevelopment.test.ts
		*/
		mockReadFileSafeAsJson.mockResolvedValue({});

		// Test error case. This passes if I move line 15 of packageJson.ts to line 10.
		await expect(() => getVersionFromPackageJson()).rejects.toEqual(
			new Error("Cannot find version number"),
		);
	});
});
