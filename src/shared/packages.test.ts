import { describe, expect, it, vi } from "vitest";

import { removeDependencies } from "./packages.js";

const mockExecaCommand = vi.fn();

vi.mock("execa", () => ({
	get execaCommand() {
		return mockExecaCommand;
	},
}));

describe("removeDependencies", () => {
	it("removes all packages that already exist when all already exist", async () => {
		await removeDependencies(["one", "two"], {
			one: "1.2.3",
			two: "4.5.6",
		});

		expect(mockExecaCommand.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "pnpm remove one two",
			  ],
			]
		`);
	});

	it("removes only packages that already exist when some don't exist", async () => {
		await removeDependencies(["exists", "missing"], {
			exists: "1.2.3",
		});

		expect(mockExecaCommand.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "pnpm remove exists",
			  ],
			]
		`);
	});

	it("adds a flag to removing packages when one is provided", async () => {
		await removeDependencies(
			["exists", "missing"],
			{
				exists: "1.2.3",
			},
			"-D",
		);

		expect(mockExecaCommand.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "pnpm remove exists -D",
			  ],
			]
		`);
	});

	it("does nothing when no packages already exist", async () => {
		await removeDependencies(["missing"]);

		expect(mockExecaCommand.mock.calls).toMatchInlineSnapshot("[]");
	});
});
