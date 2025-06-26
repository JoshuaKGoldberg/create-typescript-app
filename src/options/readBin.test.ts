import { describe, expect, it } from "vitest";

import { readBin } from "./readBin.js";

describe(readBin, () => {
	it("resolves with undefined when package data has no bin", async () => {
		const getPackageData = () => Promise.resolve({});

		const actual = await readBin(getPackageData);

		expect(actual).toBe(undefined);
	});

	it("resolves with a trimmed string when the package data has a string bin", async () => {
		const getPackageData = () =>
			Promise.resolve({
				bin: "./index.js",
			});

		const actual = await readBin(getPackageData);

		expect(actual).toBe("index.js");
	});

	it("resolves with an object of trimmed bins when the package data has a string bin", async () => {
		const getPackageData = () =>
			Promise.resolve({
				bin: {
					absolute: "index.js",
					relative: "./index.js",
				},
			});

		const actual = await readBin(getPackageData);

		expect(actual).toEqual({
			absolute: "index.js",
			relative: "index.js",
		});
	});
});
