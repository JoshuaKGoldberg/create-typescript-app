import { describe, expect, it, vi } from "vitest";

import { createKnipConfig } from "./createKnipConfig.js";

const mockReadFileSafeAsJson = vi.fn();

vi.mock("../../../shared/readFileSafeAsJson.js", () => ({
	get readFileSafeAsJson() {
		return mockReadFileSafeAsJson;
	},
}));

describe("createKnipConfig", () => {
	it("uses uses the knip version from package.json devDependencies when it exists", async () => {
		const version = "1.2.3";
		mockReadFileSafeAsJson.mockResolvedValueOnce({
			devDependencies: { knip: version },
		});

		const packageJson = await createKnipConfig();

		expect(JSON.parse(packageJson)).toEqual({
			$schema: `https://unpkg.com/knip@${version}/schema.json`,
			entry: ["src/index.ts!"],
			ignoreExportsUsedInFile: {
				interface: true,
				type: true,
			},
			project: ["src/**/*.ts!"],
		});
	});

	it("uses version 'latest' when the package.json does not exist", async () => {
		mockReadFileSafeAsJson.mockResolvedValueOnce(undefined);

		const packageJson = await createKnipConfig();

		expect(JSON.parse(packageJson)).toEqual({
			$schema: `https://unpkg.com/knip@latest/schema.json`,
			entry: ["src/index.ts!"],
			ignoreExportsUsedInFile: {
				interface: true,
				type: true,
			},
			project: ["src/**/*.ts!"],
		});
	});

	it("uses version 'latest' when the package.json exists but does not have knip in devDependencies", async () => {
		mockReadFileSafeAsJson.mockResolvedValueOnce({
			dependencies: {},
		});

		const packageJson = await createKnipConfig();

		expect(JSON.parse(packageJson)).toEqual({
			$schema: `https://unpkg.com/knip@latest/schema.json`,
			entry: ["src/index.ts!"],
			ignoreExportsUsedInFile: {
				interface: true,
				type: true,
			},
			project: ["src/**/*.ts!"],
		});
	});
});
