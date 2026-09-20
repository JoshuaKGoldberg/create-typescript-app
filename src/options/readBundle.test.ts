import { describe, expect, it, vi } from "vitest";

import { readBundle } from "./readBundle.ts";

const mockTake = vi.fn();

describe(readBundle, () => {
	it("resolves with undefined when tsdown.config.ts cannot be read", async () => {
		mockTake.mockResolvedValueOnce(new Error("Oh no!"));

		const actual = await readBundle(mockTake);

		expect(actual).toBeUndefined();
	});

	it("resolves with undefined when tsdown.config.ts does not contain a defineConfig", async () => {
		mockTake.mockResolvedValueOnce("...");

		const actual = await readBundle(mockTake);

		expect(actual).toBeUndefined();
	});

	it("resolves with false when tsdown.config.ts contains unbundle: true", async () => {
		mockTake.mockResolvedValueOnce(
			`defineConfig(${JSON.stringify({ entry: ["src/**/*.ts"], unbundle: true })})`,
		);

		const actual = await readBundle(mockTake);

		expect(actual).toBe(false);
	});

	it("resolves with true when tsdown.config.ts contains unbundle: false", async () => {
		mockTake.mockResolvedValueOnce(
			`defineConfig(${JSON.stringify({ unbundle: false })})`,
		);

		const actual = await readBundle(mockTake);

		expect(actual).toBe(true);
	});

	it("resolves with true when tsdown.config.ts does not contain unbundle", async () => {
		mockTake.mockResolvedValueOnce(
			`defineConfig(${JSON.stringify({ entry: ["src/index.ts"] })})`,
		);

		const actual = await readBundle(mockTake);

		expect(actual).toBe(true);
	});
});
