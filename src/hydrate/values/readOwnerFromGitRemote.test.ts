import { describe, expect, it, vi } from "vitest";

import { readOwnerFromGitRemote } from "./readOwnerFromGitRemote.js";

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

describe("readEmailIfExists", () => {
	it('reads email from the package "author" field when it exists', async () => {
		mock$.mockResolvedValue({
			stdout:
				"origin  https://github.com/Contributor/template-typescript-node-package.git (fetch)",
		});
		const result = await readOwnerFromGitRemote();

		expect(result).toBe("Contributor");
	});

	it("does something when no remote available", async () => {
		mock$.mockResolvedValue({ stdout: "" });
		const result = await readOwnerFromGitRemote();
		expect(result).toBe(undefined);
	});
});
