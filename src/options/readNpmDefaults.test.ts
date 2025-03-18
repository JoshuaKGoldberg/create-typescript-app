import { describe, expect, it, vi } from "vitest";

import { readNpmDefaults } from "./readNpmDefaults.js";

const mockNpmUser = vi.fn();

vi.mock("npm-user", () => ({
	get default() {
		return mockNpmUser;
	},
}));

const user = "test-user";

describe(readNpmDefaults, () => {
	it("returns the corresponding npm user when whoami resolves a value", async () => {
		mockNpmUser.mockResolvedValueOnce(user);
		const getWhoami = vi.fn().mockResolvedValueOnce({ stdout: "test-whoami" });

		const actual = await readNpmDefaults(getWhoami);

		expect(actual).toBe(user);
	});

	it("returns undefined when whoami resolves undefined", async () => {
		const getWhoami = vi.fn().mockResolvedValueOnce(undefined);

		const actual = await readNpmDefaults(getWhoami);

		expect(actual).toBeUndefined();
		expect(mockNpmUser).not.toHaveBeenCalled();
	});

	it("returns undefined when whoami resolves no value", async () => {
		const getWhoami = vi.fn().mockResolvedValueOnce({});

		const actual = await readNpmDefaults(getWhoami);

		expect(actual).toBeUndefined();
		expect(mockNpmUser).not.toHaveBeenCalled();
	});

	it("returns undefined when whoami resolves a value but npmUser rejects", async () => {
		const getWhoami = vi.fn().mockResolvedValueOnce(user);
		mockNpmUser.mockRejectedValueOnce(new Error("Oh no!"));

		const actual = await readNpmDefaults(getWhoami);

		expect(actual).toBeUndefined();
	});
});
