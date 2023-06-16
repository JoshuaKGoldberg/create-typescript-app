import { describe, expect, it, vi } from "vitest";

import {
	ErrorResult,
	SuccessResult,
	getNpmUserInfo,
} from "./getNpmUserInfo.js";

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
		const result = (await getNpmUserInfo()) as ErrorResult;

		expect(result.succeeded).toBe(false);
		expect(result.reason).toBe(
			"Could not populate npm user. Failed to run npm whoami."
		);
	});

	it("returns an error result the npm whoami user fails", async () => {
		mock$.mockRejectedValue({ stdout: npmUsername });
		mockNpmUser.mockRejectedValue("error");
		const result = (await getNpmUserInfo()) as ErrorResult;

		expect(result.succeeded).toBe(false);
		expect(result.reason).toBe(
			"Could not populate npm user. Failed to run npm whoami."
		);
	});

	it("returns an error result the npm whoami user fails", async () => {
		mock$.mockResolvedValue({ stdout: npmUsername });
		mockNpmUser.mockResolvedValue({ name: npmUsername });
		const result = (await getNpmUserInfo()) as SuccessResult;

		expect(result.succeeded).toBe(true);
		expect(result.value).toStrictEqual({ name: npmUsername });
	});
});
