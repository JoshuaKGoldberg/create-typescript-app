import { describe, expect, it, vi } from "vitest";

import { readEmailFromGit } from "./readEmailFromGit.js";

describe(readEmailFromGit, () => {
	it("resolves the git config email when it can be found", async () => {
		const email = "test-email";
		const take = vi.fn().mockResolvedValueOnce({ stdout: email });

		const actual = await readEmailFromGit(take);

		expect(actual).toBe(email);
	});

	it("resolves undefined when there is no git config email", async () => {
		const take = vi.fn().mockResolvedValueOnce({ stdout: undefined });

		const actual = await readEmailFromGit(take);

		expect(actual).toBeUndefined();
	});
});
