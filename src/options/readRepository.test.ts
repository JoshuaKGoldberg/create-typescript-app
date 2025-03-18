import { describe, expect, it, vi } from "vitest";

import { readRepository } from "./readRepository.js";

describe(readRepository, () => {
	it("returns options.repository when it exists", async () => {
		const repository = "test-repository";
		const getGitDefaults = vi.fn();
		const getPackageDataFull = vi.fn();
		const options = { repository };

		const actual = await readRepository(
			getGitDefaults,
			getPackageDataFull,
			options,
		);

		expect(actual).toBe(repository);
		expect(getGitDefaults).not.toHaveBeenCalled();
		expect(getPackageDataFull).not.toHaveBeenCalled();
	});

	it("returns git defaults name when only it exists", async () => {
		const name = "test-name";
		const getGitDefaults = vi.fn().mockResolvedValueOnce({ name });
		const getPackageDataFull = vi.fn();

		const actual = await readRepository(getGitDefaults, getPackageDataFull, {});

		expect(actual).toBe(name);
		expect(getPackageDataFull).not.toHaveBeenCalled();
	});

	it("returns package data name when only it exists", async () => {
		const name = "test-name";
		const getGitDefaults = vi.fn();
		const getPackageDataFull = vi.fn().mockResolvedValueOnce({ name });

		const actual = await readRepository(getGitDefaults, getPackageDataFull, {});

		expect(actual).toBe(name);
	});

	it("returns options.directory when only it exists", async () => {
		const directory = "test-directory";
		const getGitDefaults = vi.fn();
		const getPackageDataFull = vi.fn().mockResolvedValueOnce({});
		const options = { directory };

		const actual = await readRepository(
			getGitDefaults,
			getPackageDataFull,
			options,
		);

		expect(actual).toBe(directory);
	});
});
