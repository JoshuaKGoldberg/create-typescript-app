import { describe, expect, it, vi } from "vitest";

import { getPackageDependencies } from "./packageData.ts";

vi.mock("node:module", () => ({
	createRequire: () => () => ({
		dependencies: {
			"package-dep": "0.0.2",
			"package-range-dep": "^0.0.3",
		},
		devDependencies: {
			"package-dev-dep": "0.0.1",
		},
	}),
}));

describe(getPackageDependencies, () => {
	it("returns a devDependency when it exists", () => {
		const actual = getPackageDependencies("package-dev-dep");

		expect(actual).toEqual({ "package-dev-dep": "0.0.1" });
	});

	it("returns a dependency when it exists", () => {
		const actual = getPackageDependencies("package-dep");

		expect(actual).toEqual({ "package-dep": "0.0.2" });
	});

	it("returns a pinned version when a dependency has a range prefix", () => {
		const actual = getPackageDependencies("package-range-dep");

		expect(actual).toEqual({ "package-range-dep": "0.0.3" });
	});

	it("throws an error when neither exist", () => {
		const act = () => getPackageDependencies("package-unknown");

		expect(act).toThrow(
			"'package-unknown' is neither in package.json's dependencies nor its devDependencies.",
		);
	});
});
