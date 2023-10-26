import { describe, expect, it, vi } from "vitest";

import { readDefaultsFromDevelopment } from "./readDefaultsFromDevelopment.js";

const mockReadFileSafe = vi.fn();

vi.mock("../../readFileSafe.js", () => ({
	get readFileSafe() {
		return mockReadFileSafe;
	},
}));

describe("readDefaultsFromDevelopment", () => {
	describe("guide", () => {
		it("defaults to undefined when .github/DEVELOPMENT.md cannot be found", async () => {
			mockReadFileSafe.mockResolvedValue("");

			const guide = await readDefaultsFromDevelopment().guide();

			expect(guide).toBeUndefined();
		});

		it("reads guide when it exists", async () => {
			mockReadFileSafe.mockResolvedValue(`# Development

> If you'd like a more guided walkthrough, see [Contributing to a create-typescript-app Repository](https://www.joshuakgoldberg.com/blog/contributing-to-a-create-typescript-app-repository).
> It'll walk you through the common activities you'll need to contribute.
`);

			const guide = await readDefaultsFromDevelopment().guide();

			expect(guide).toBe(
				"https://www.joshuakgoldberg.com/blog/contributing-to-a-create-typescript-app-repository",
			);
		});
	});

	describe("guideTitle", () => {
		it("defaults to undefined when .github/DEVELOPMENT.md cannot be found", async () => {
			mockReadFileSafe.mockResolvedValue("");

			const guideTitle = await readDefaultsFromDevelopment().guideTitle();

			expect(guideTitle).toBeUndefined();
		});

		it("reads guideTitle when it exists", async () => {
			mockReadFileSafe.mockResolvedValue(`# Development

> If you'd like a more guided walkthrough, see [Contributing to a create-typescript-app Repository](https://www.joshuakgoldberg.com/blog/contributing-to-a-create-typescript-app-repository).
> It'll walk you through the common activities you'll need to contribute.
`);

			const guideTitle = await readDefaultsFromDevelopment().guideTitle();

			expect(guideTitle).toBe(
				"Contributing to a create-typescript-app Repository",
			);
		});
	});
});
