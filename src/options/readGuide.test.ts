import { describe, expect, it, vi } from "vitest";

import { readGuide } from "./readGuide.js";

const mockReadFileSafe = vi.fn();

vi.mock("./readFileSafe.js", () => ({
	get readFileSafe() {
		return mockReadFileSafe;
	},
}));

describe(readGuide, () => {
	it("defaults to undefined when .github/DEVELOPMENT.md cannot be found", async () => {
		mockReadFileSafe.mockResolvedValue("");

		const guide = await readGuide();

		expect(guide).toBeUndefined();
	});

	it("reads the href and title when the tag exists", async () => {
		mockReadFileSafe.mockResolvedValue(`# Development

> If you'd like a more guided walkthrough, see [Contributing to a create-typescript-app Repository](https://www.joshuakgoldberg.com/blog/contributing-to-a-create-typescript-app-repository).
> It'll walk you through the common activities you'll need to contribute.
`);

		const guide = await readGuide();

		expect(guide).toEqual({
			href: "https://www.joshuakgoldberg.com/blog/contributing-to-a-create-typescript-app-repository",
			title: "Contributing to a create-typescript-app Repository",
		});
	});
});
