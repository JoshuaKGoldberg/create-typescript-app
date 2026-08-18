import { describe, expect, test } from "vitest";

import { resolveEmails } from "./resolveEmails.js";

describe(resolveEmails, () => {
	test("string", () => {
		const actual = resolveEmails("test@example.com");

		expect(actual).toEqual({
			github: "test@example.com",
			npm: "test@example.com",
		});
	});

	test("object", () => {
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
