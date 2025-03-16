import { describe, expect, it, vi } from "vitest";

import { readOwner } from "./readOwner.js";

describe(readOwner, () => {
	it("returns git defaults organization when it exists", async () => {
		const take = vi.fn();
		const organization = "test-organization";
		const getGitDefaults = vi.fn().mockResolvedValueOnce({ organization });
		const getPackageDataFull = vi.fn();

		const actual = await readOwner(take, getGitDefaults, getPackageDataFull);

		expect(actual).toBe(organization);
		expect(take).not.toHaveBeenCalled();
		expect(getPackageDataFull).not.toHaveBeenCalled();
	});

	it("returns package data author when only it exists", async () => {
		const take = vi.fn();
		const author = "test-author";
		const getGitDefaults = vi.fn();
		const getPackageDataFull = vi.fn().mockResolvedValueOnce({ author });

		const actual = await readOwner(take, getGitDefaults, getPackageDataFull);

		expect(actual).toBe(author);
		expect(take).not.toHaveBeenCalled();
	});

	it("returns the gh config value when only it resolves", async () => {
		const user = "test-user";
		const take = vi.fn().mockResolvedValueOnce({ stdout: user });
		const getGitDefaults = vi.fn();
		const getPackageDataFull = vi.fn().mockResolvedValueOnce({});

		const actual = await readOwner(take, getGitDefaults, getPackageDataFull);

		expect(actual).toBe(user);
	});

	it("returns undefined when no values exist", async () => {
		const take = vi.fn().mockResolvedValueOnce({});
		const getGitDefaults = vi.fn();
		const getPackageDataFull = vi.fn().mockResolvedValueOnce({});

		const actual = await readOwner(take, getGitDefaults, getPackageDataFull);

		expect(actual).toBe(undefined);
	});
});
