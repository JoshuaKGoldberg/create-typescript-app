import { describe, expect, it, vi } from "vitest";

import { readAccess } from "./readAccess.js";

describe(readAccess, () => {
	it("resolves with 'public' when package data does not exist", async () => {
		const getDescription = vi.fn().mockResolvedValue(undefined);

		const actual = await readAccess(getDescription);

		expect(actual).toBe("public");
	});

	it("resolves with 'public' when package data does not have publishConfig", async () => {
		const getDescription = vi.fn().mockResolvedValue({});

		const actual = await readAccess(getDescription);

		expect(actual).toBe("public");
	});

	it("resolves with 'public' when package data has an empty publishConfig", async () => {
		const getDescription = vi.fn().mockResolvedValue({
			publishConfig: {},
		});

		const actual = await readAccess(getDescription);

		expect(actual).toBe("public");
	});

	it("resolves with the access when package data has a publishConfig with access", async () => {
		const access = "restricted";
		const getDescription = vi.fn().mockResolvedValue({
			publishConfig: { access },
		});

		const actual = await readAccess(getDescription);

		expect(actual).toBe(access);
	});
});
