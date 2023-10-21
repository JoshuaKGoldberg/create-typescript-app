import { describe, expect, it, vi } from "vitest";

import packageData from "../../package.json" assert { type: "json" };
import { getVersionFromPackageJson } from "./packageJson.js";

describe("getVersionFromPackageJson", () => {
	it("returns the current version number from the package.json", async () => {
		const version = await getVersionFromPackageJson();

		expect(version).toBe(packageData.version);
	});

	it("throws an error when there is no version number", async () => {
		vi.mock("../shared/readFileSafeAsJson", async (importOriginal) => {
			await importOriginal();
			return {
				readFileSafeAsJson: vi.fn(() => {
					return {};
				}),
			};
		});

		await expect(() => getVersionFromPackageJson()).rejects.toEqual(
			new Error("Cannot find version number"),
		);
	});
});
