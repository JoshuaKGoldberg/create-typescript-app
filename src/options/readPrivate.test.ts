import { describe, expect, it, vi } from "vitest";

import { readPrivate } from "./readPrivate.ts";

const getOwner = () => Promise.resolve("test-owner");
const getRepository = () => Promise.resolve("test-repository");

describe(readPrivate, () => {
	it("returns undefined without requesting when there is no owner", async () => {
		const take = vi.fn();

		const actual = await readPrivate(
			take,
			() => Promise.resolve(undefined),
			getRepository,
		);

		expect(actual).toBeUndefined();
		expect(take).not.toHaveBeenCalled();
	});

	it("returns undefined without requesting when there is no repository", async () => {
		const take = vi.fn();

		const actual = await readPrivate(take, getOwner, () =>
			Promise.resolve(undefined),
		);

		expect(actual).toBeUndefined();
		expect(take).not.toHaveBeenCalled();
	});

	it("returns undefined when the GET request does not retrieve a repository", async () => {
		const take = () => Promise.resolve(undefined);

		const actual = await readPrivate(take, getOwner, getRepository);

		expect(actual).toBeUndefined();
	});

	it("returns false when the repository is public", async () => {
		const take = () => Promise.resolve({ private: false });

		const actual = await readPrivate(take, getOwner, getRepository);

		expect(actual).toBe(false);
	});

	it("returns true when the repository is private", async () => {
		const take = () => Promise.resolve({ private: true });

		const actual = await readPrivate(take, getOwner, getRepository);

		expect(actual).toBe(true);
	});
});
