import { describe, expect, it, vi } from "vitest";

import { readEmailFromNpm } from "./readEmailFromNpm.js";

describe(readEmailFromNpm, () => {
	it("resolves the npm defaults email when it exists", async () => {
		const email = "test-email";
		const getNpmDefaults = vi.fn().mockResolvedValueOnce({ email });
		const getPackageAuthor = vi.fn();

		const actual = await readEmailFromNpm(getNpmDefaults, getPackageAuthor);

		expect(actual).toBe(email);
		expect(getPackageAuthor).not.toHaveBeenCalled();
	});

	it("resolves the package author email when only it exists", async () => {
		const email = "test-email";
		const getNpmDefaults = vi.fn().mockResolvedValueOnce(undefined);
		const getPackageAuthor = vi.fn().mockResolvedValueOnce({ email });

		const actual = await readEmailFromNpm(getNpmDefaults, getPackageAuthor);

		expect(actual).toBe(email);
	});
});
