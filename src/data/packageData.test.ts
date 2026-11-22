import { describe, expect, it, vi } from "vitest";

import { getPackageDependencies } from "./packageData.ts";

vi.mock("node:module", () => ({
	createRequire: () => () => ({
		dependencies: {
			"package-dep": "0.0.2",
			"package-dep-ranged": "^0.0.3",
		},
		devDependencies: {
			"package-dev-dep": "0.0.1",
		},
	}),
}));

vi.mock("./blockDependencies/package.json", () => ({
	default: {
		dependencies: {
			"block-dep": "0.0.4",
			"package-dev-dep": "0.0.5",
		},
	},
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

	it("returns a block dependency when it exists", () => {
		const actual = getPackageDependencies("block-dep");

		expect(actual).toEqual({ "block-dep": "0.0.4" });
	});

	it("prefers package.json over block dependencies", () => {
		const actual = getPackageDependencies("package-dev-dep");

		expect(actual).toEqual({ "package-dev-dep": "0.0.1" });
	});

	it("returns a pinned version when a dependency is a range", () => {
		const actual = getPackageDependencies("package-dep-ranged");

		expect(actual).toEqual({ "package-dep-ranged": "0.0.3" });
	});

	it("throws an error when neither exist", () => {
		const act = () => getPackageDependencies("package-unknown");

		expect(act).toThrow(
			"'package-unknown' is not in package.json's dependencies or devDependencies, nor in src/data/blockDependencies/package.json.",
		);
	});
});
