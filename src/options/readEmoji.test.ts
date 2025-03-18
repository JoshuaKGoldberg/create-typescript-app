import { describe, expect, it, vi } from "vitest";

import { readEmoji } from "./readEmoji.js";

describe(readEmoji, () => {
	it("resolves with undefined when description is undefined", async () => {
		const getDescription = vi.fn().mockResolvedValue(undefined);

		const actual = await readEmoji(getDescription);

		expect(actual).toBe("💖");
	});

	it("resolves with undefined when the description does not have any emoji", async () => {
		const getDescription = () => Promise.resolve("Hello world.");

		const actual = await readEmoji(getDescription);

		expect(actual).toBe("💖");
	});

	it("resolves with the emoji when the description has one emoji", async () => {
		const getDescription = () => Promise.resolve("Hello. 😊");

		const actual = await readEmoji(getDescription);

		expect(actual).toBe("😊");
	});

	it("resolves with the last emoji when the description has multiple emoji", async () => {
		const getDescription = () => Promise.resolve("Hello 🌍. 😊");

		const actual = await readEmoji(getDescription);

		expect(actual).toBe("😊");
	});
});
