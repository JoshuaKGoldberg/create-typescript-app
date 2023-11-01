import { describe, expect, it, vi } from "vitest";

import { getBase } from "./getBase.js";

const mockReadPackageData = vi.fn();
vi.mock("../packages.js", () => ({
	get readPackageData() {
		return mockReadPackageData;
	},
}));

describe("getBase", () => {
	it("should return minimum with minimum scripts", async () => {
		mockReadPackageData.mockImplementationOnce(() =>
			Promise.resolve({
				scripts: {
					build: "build",
					lint: "lint",
					test: "test",
				},
			}),
		);

		expect(await getBase()).toBe("minimum");
	});
	it("should return common with common scripts", async () => {
		mockReadPackageData.mockImplementationOnce(() =>
			Promise.resolve({
				scripts: {
					build: "build",
					lint: "lint",
					"lint:knip": "knip",
					test: "test",
				},
			}),
		);

		expect(await getBase()).toBe("common");
	});
	it("should return everything with everything scripts", async () => {
		mockReadPackageData.mockImplementationOnce(() =>
			Promise.resolve({
				scripts: {
					build: "build",
					lint: "lint",
					"lint:knip": "knip",
					"lint:md": "md",
					"lint:package-json": "package-json",
					"lint:packages": "packages",
					test: "test",
				},
			}),
		);

		expect(await getBase()).toBe("everything");
	});
});
