import { describe, expect, it } from "vitest";

import { detectEmailRedundancy } from "./detectEmailRedundancy.js";

describe("detectEmailRedundancy", () => {
	it("returns undefined when only email is specified", () => {
		expect(detectEmailRedundancy({ email: "test@email.com" })).toBeUndefined();
	});

	it("returns undefined when email-github and email-npm are specified while email is not", () => {
		expect(
			detectEmailRedundancy({
				"email-github": "test@email.com",
				"email-npm": "test@email.com",
			}),
		).toBeUndefined();
	});

	it("returns a complaint when email-github is specified while email and email-npm are not", () => {
		expect(
			detectEmailRedundancy({
				"email-github": "test@email.com",
			}),
		).toBe(
			"If --email-github is specified, either --email or --email-npm should be.",
		);
	});

	it("returns a complaint when email-npm is specified while email and email-github are not", () => {
		expect(
			detectEmailRedundancy({
				"email-npm": "test@email.com",
			}),
		).toBe(
			"If --email-npm is specified, either --email or --email-github should be.",
		);
	});
});
