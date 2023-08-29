import { describe, expect, it, vi } from "vitest";

import { removeDependencies } from "./packages.js";

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

describe("removeDependencies", () => {
	it("removes only packages that already exist when some don't exist", async () => {
		await removeDependencies(["exists", "missing"], {
			exists: "1.2.3",
		});

		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    [
			      "pnpm remove ",
			      " ",
			      "",
			    ],
			    "exists",
			    "",
			  ],
			]
		`);
	});

	it("adds a flag removes packages when one is provided", async () => {
		await removeDependencies(
			["exists", "missing"],
			{
				exists: "1.2.3",
			},
			"-D",
		);

		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    [
			      "pnpm remove ",
			      " ",
			      "",
			    ],
			    "exists",
			    "-D",
			  ],
			]
		`);
	});

	it("does nothing when no packages already exist", async () => {
		await removeDependencies(["missing"]);

		expect(mock$.mock.calls).toMatchInlineSnapshot("[]");
	});
});
