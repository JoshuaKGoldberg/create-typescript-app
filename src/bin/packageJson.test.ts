import { describe, expect, it, vi } from "vitest";

import { getVersionFromPackageJson } from "./packageJson.js";

const mockReadFileSafeAsJson = vi.fn();

vi.mock("../shared/readFileSafeAsJson.js", () => ({
	get readFileSafeAsJson() {
		return mockReadFileSafeAsJson;
	},
}));

describe("getVersionFromPackageJson", () => {
	it("returns the current version number from the package.json", async () => {
		mockReadFileSafeAsJson.mockResolvedValue({
			version: "1.40.0",
		});

		const version = await getVersionFromPackageJson();

		expect(version).toBe("1.40.0");
	});

	it("throws an error when there is no version number", async () => {
		mockReadFileSafeAsJson.mockResolvedValue({});

		await expect(() => getVersionFromPackageJson()).rejects.toEqual(
			new Error("Cannot find version number"),
		);
	});
});
