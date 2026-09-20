import { describe, expect, it } from "vitest";

import { resolveEmails } from "./resolveEmails.ts";

describe(resolveEmails, () => {
	it("uses the string for both github and npm when given a string", () => {
		const actual = resolveEmails("test@example.com");

		expect(actual).toEqual({
			github: "test@example.com",
			npm: "test@example.com",
		});
	});

	it("returns the object as-is when given an object", () => {
		const actual = resolveEmails({
			github: "github@example.com",
			npm: "npm@example.com",
		});

		expect(actual).toEqual({
			github: "github@example.com",
			npm: "npm@example.com",
		});
	});
});
