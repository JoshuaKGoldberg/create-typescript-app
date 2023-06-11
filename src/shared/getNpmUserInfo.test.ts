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
	it("logs and defaults to owner when npm whoami fails", async () => {
		mock$.mockRejectedValue({ stderr: "Oh no!" });
		try {
			await getNpmUserInfo();
		} catch (error) {
			expect((error as Error).message).toBe(
				"Could not populate npm user. Failed to run npm whoami."
			);
		}
	});

	it("logs and defaults to owner when retrieving the npm whoami user fails", async () => {
		mock$.mockResolvedValue({ stdout: npmUsername });
		try {
			await getNpmUserInfo();
		} catch (error) {
			expect((error as Error).message).toBe(
				"Could not populate npm user. Failed to retrieve user info from npm."
			);
		}
	});
});
