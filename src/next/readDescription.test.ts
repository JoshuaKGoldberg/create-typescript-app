import { describe, expect, it, vi } from "vitest";

import { readDescription } from "./readDescription.js";

const mockSourcePackageJsonDescription = vi.fn<() => string>();

vi.mock("./blocks/sourcePackageJson", () => ({
	sourcePackageJson: {
		get description() {
			return mockSourcePackageJsonDescription();
		},
	},
}));

describe("finalize", () => {
	it("returns undefined when the description matches the current package.json description", async () => {
		const existing = "Same description.";

		mockSourcePackageJsonDescription.mockReturnValueOnce(existing);

		const documentation = await readDescription(() =>
			Promise.resolve({
				description: existing,
			}),
		);

		expect(documentation).toBeUndefined();
	});

	it("filters known headings when .github/DEVELOPMENT.md exists", async () => {
		const updated = "Updated description.";

		mockSourcePackageJsonDescription.mockReturnValueOnce(
			"Existing description",
		);

		const documentation = await readDescription(() =>
			Promise.resolve({
				description: updated,
			}),
		);

		expect(documentation).toBe(updated);
	});
});
