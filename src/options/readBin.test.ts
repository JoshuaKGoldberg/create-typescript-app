import { describe, expect, it } from "vitest";

import { readBin } from "./readBin.ts";

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

	it("resolves with dist/ when the package data has a legacy lib/ string bin", async () => {
		const getPackageData = () => Promise.resolve({ bin: "lib/index.js" });

		const actual = await readBin(getPackageData);

		expect(actual).toBe("dist/index.js");
	});

	it("resolves with dist/ values when the package data has legacy lib/ object bins", async () => {
		const getPackageData = () =>
			Promise.resolve({
				bin: { legacy: "./lib/index.js", other: "bin/index.js" },
			});

		const actual = await readBin(getPackageData);

		expect(actual).toEqual({ legacy: "dist/index.js", other: "bin/index.js" });
	});
});
