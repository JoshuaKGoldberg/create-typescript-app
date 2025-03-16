import { describe, expect, it } from "vitest";

import { readGuide } from "./readGuide.js";

describe(readGuide, () => {
	it("resolves with undefined when .github/DEVELOPMENT.md cannot be read", async () => {
		const guide = await readGuide(() => Promise.resolve(new Error("Oh no!")));

		expect(guide).toBeUndefined();
	});

	it("resolves with undefined when .github/DEVELOPMENT.md does not contain a guided walkthrough", async () => {
		const guide = await readGuide(() => Promise.resolve(""));

		expect(guide).toBeUndefined();
	});

	it("reads the href and title when the tag exists", async () => {
		const guide = await readGuide(() =>
			Promise.resolve(`# Development

> If you'd like a more guided walkthrough, see [Contributing to a create-typescript-app Repository](https://www.joshuakgoldberg.com/blog/contributing-to-a-create-typescript-app-repository).
> It'll walk you through the common activities you'll need to contribute.
`),
		);

		expect(guide).toEqual({
			href: "https://www.joshuakgoldberg.com/blog/contributing-to-a-create-typescript-app-repository",
			title: "Contributing to a create-typescript-app Repository",
		});
	});
});
