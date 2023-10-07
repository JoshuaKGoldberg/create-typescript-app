import { describe, expect, it } from "vitest";

import { getVersionFromPackageJson } from "./packageJson.js";

describe("getVersionFromPackageJson", () => {
	it("returns a string representing a version number when given a valid package.json URL", async () => {
		const version = await getVersionFromPackageJson();

		expect(version).toBeTypeOf("string");

		expect(version.split(".").length).toBe(3);
	});
});
