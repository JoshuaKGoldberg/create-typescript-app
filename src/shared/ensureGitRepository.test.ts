import { describe, expect, it, vi } from "vitest";

import { ensureGitRepository } from "./ensureGitRepository.js";

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

describe("ensureGitRepository", () => {
	it("does not run git init when git status succeeds", async () => {
		mock$.mockResolvedValue(0);

		await ensureGitRepository();

		expect(mock$).toHaveBeenCalledTimes(1);
	});

	it("runs git init when git status fails", async () => {
		mock$.mockRejectedValueOnce(1);

		await ensureGitRepository();

		expect(mock$).toHaveBeenCalledWith(["git init"]);
	});
});
