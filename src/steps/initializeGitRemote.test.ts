import { describe, expect, it, vi } from "vitest";

import { initializeGitRemote } from "./initializeGitRemote.js";

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

const options = {
	owner: "TestOwner",
	repository: "test-repository",
};

describe("initializeGitRemote", () => {
	it("does not add an origin or fetch when remotes already includes origin", async () => {
		mock$.mockResolvedValue({
			stdout: "origin",
		});

		await initializeGitRemote(options);

		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    [
			      "git remote",
			    ],
			  ],
			]
		`);
	});

	it("add an origin and fetch when remotes does not include origin", async () => {
		mock$.mockResolvedValue({
			stdout: "",
		});

		await initializeGitRemote(options);

		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    [
			      "git remote",
			    ],
			  ],
			  [
			    [
			      "git remote add origin https://github.com/",
			      "/",
			      "",
			    ],
			    "TestOwner",
			    "test-repository",
			  ],
			  [
			    [
			      "git fetch",
			    ],
			  ],
			]
		`);
	});
});
