import { describe, expect, it } from "vitest";

import packageData from "../../package.json" assert { type: "json" };
import { getVersionFromPackageJson } from "./packageJson.js";

describe("getVersionFromPackageJson", () => {
	it("returns the current version number when given a valid package.json URL", async () => {
		const version = await getVersionFromPackageJson();

		expect(version).toBe(packageData.version);
	});
});
