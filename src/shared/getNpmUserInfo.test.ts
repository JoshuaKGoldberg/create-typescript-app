import { describe, expect, it, vi } from "vitest";

import { getNpmUserInfo } from "./getNpmUserInfo.js";

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

const mockNpmUser = vi.fn();

vi.mock("npm-user", () => ({
	get default() {
		return mockNpmUser;
	},
}));

const npmUsername = "test-npm-username";

describe("getNpmUserInfo", () => {
	it("returns an error result when npm whoami fails", async () => {
		mock$.mockRejectedValue({ stderr: "Oh no!" });
		const result = await getNpmUserInfo();

		expect(result).toEqual({
			reason: "Could not populate npm user. Failed to run npm whoami.",
			succeeded: false,
		});
	});

	it("returns a success result when the npm whoami user succeeds", async () => {
		mock$.mockResolvedValue({ stdout: npmUsername });
		mockNpmUser.mockResolvedValue({ name: npmUsername });
		const result = await getNpmUserInfo();

		expect(result).toEqual({
			succeeded: true,
			value: { name: npmUsername },
		});
	});

	it("returns an error result the npm whoami user fails", async () => {
		mock$.mockResolvedValue({ stdout: npmUsername });
		mockNpmUser.mockRejectedValue("error");
		const result = await getNpmUserInfo();

		expect(result).toEqual({
			reason:
				"Could not populate npm user. Failed to retrieve user info from npm.",
			succeeded: false,
		});
	});
});
