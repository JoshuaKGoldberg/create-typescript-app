import { describe, expect, it } from "vitest";

import { readTitle } from "./readTitle.js";

describe(readTitle, () => {
	describe("title", () => {
		it("defaults to undefined when it cannot be found", async () => {
			const title = await readTitle(
				() => Promise.resolve(`nothing`),
				() => Promise.resolve(undefined),
			);

			expect(title).toBeUndefined();
		});

		it('reads title as markdown from "README.md" when it exists', async () => {
			const title = await readTitle(
				() => Promise.resolve(`# My Awesome Package`),
				() => Promise.resolve(undefined),
			);

			expect(title).toBe("My Awesome Package");
		});

		it('reads title as HTML from "README.md" when it exists', async () => {
			const title = await readTitle(
				() => Promise.resolve('<h1 align="center">My Awesome Package</h1>'),
				() => Promise.resolve(undefined),
			);

			expect(title).toBe("My Awesome Package");
		});

		it("converts 'typescript' to 'TypeScript' when parsed from the repository name", async () => {
			const title = await readTitle(
				() => Promise.resolve(""),
				() => Promise.resolve("my-typescript-app"),
			);

			expect(title).toBe("My TypeScript App");
		});

		it("converts 'eslint' to 'ESLint' when parsed from the repository name", async () => {
			const title = await readTitle(
				() => Promise.resolve(""),
				() => Promise.resolve("my-eslint-plugin"),
			);

			expect(title).toBe("My ESLint Plugin");
		});

		it("returns undefined when title does not exist", async () => {
			const title = await readTitle(
				() => Promise.resolve(`Other text.`),
				() => Promise.resolve(undefined),
			);

			expect(title).toBeUndefined();
		});
	});
});
