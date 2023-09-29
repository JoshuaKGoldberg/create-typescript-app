import { describe, expect, it, vi } from "vitest";

import { uninstallPackages } from "./uninstallPackages.js";

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

vi.mock("../shared/packages.js", () => ({
	readPackageData: () => ({}),
	removeDependencies: vi.fn(),
}));

describe("uninstallPackages", () => {
	it("runs without --offline when offline is false", async () => {
		await uninstallPackages(false);

		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    [
			      "pnpm add prettier -D",
			      "",
			    ],
			    "",
			  ],
			]
		`);
	});

	it("runs with --offline when offline is true", async () => {
		await uninstallPackages(true);

		expect(mock$.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    [
			      "pnpm add prettier -D",
			      "",
			    ],
			    " --offline",
			  ],
			]
		`);
	});
});
