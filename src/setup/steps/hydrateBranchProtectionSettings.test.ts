import { Octokit } from "octokit";
import { SpyInstance, describe, expect, it, vi } from "vitest";

import { hydrateBranchProtectionSettings } from "./hydrateBranchProtectionSettings.js";

const createMockOctokit = (request: SpyInstance) =>
	({
		request,
	} as unknown as Octokit);

const stubValues = { owner: "", repository: "" };

describe("hydrateBranchProtectionSettings", () => {
	it("returns false when the request receives a 403 response", async () => {
		const mockRequest = vi.fn().mockRejectedValue({ status: 403 });

		const actual = await hydrateBranchProtectionSettings(
			createMockOctokit(mockRequest),
			stubValues
		);

		expect(actual).toBe(false);
	});

	it("throws the error when the request throws with a non-403 response", async () => {
		const error = { status: 404 };
		const mockRequest = vi.fn().mockRejectedValue(error);

		await expect(() =>
			hydrateBranchProtectionSettings(
				createMockOctokit(mockRequest),
				stubValues
			)
		).rejects.toBe(error);
	});
});
