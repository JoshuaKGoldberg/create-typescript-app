import { describe, expect, it, vi } from "vitest";

import { readEmailFromCodeOfConduct } from "./readEmailFromCodeOfConduct.js";

describe(readEmailFromCodeOfConduct, () => {
	it("resolves undefined when CODE_OF_CONDUCT.md cannot be read", async () => {
		const take = vi.fn().mockResolvedValueOnce(new Error("Oh no!"));

		const actual = await readEmailFromCodeOfConduct(take);

		expect(actual).toBeUndefined();
	});

	it("resolves undefined when CODE_OF_CONDUCT.md is not the Contributor Code of Conduct", async () => {
		const take = vi.fn().mockResolvedValueOnce("# Some Other Code of Conduct");

		const actual = await readEmailFromCodeOfConduct(take);

		expect(actual).toBeUndefined();
	});

	it("resolves undefined when CODE_OF_CONDUCT.md is a Contributor Code of Conduct without an email", async () => {
		const take = vi.fn()
			.mockResolvedValueOnce(`# Contributor Covenant Code of Conduct
				
for enforcement at.
`);

		const actual = await readEmailFromCodeOfConduct(take);

		expect(actual).toBeUndefined();
	});

	it("resolves the email when CODE_OF_CONDUCT.md is a Contributor Code of Conduct with an email", async () => {
		const email = "test-email";
		const take = vi.fn()
			.mockResolvedValueOnce(`# Contributor Covenant Code of Conduct

reported to the community leaders responsible for enforcement at
${email}.
All complaints will be reviewed and investigated promptly and fairly.
`);

		const actual = await readEmailFromCodeOfConduct(take);

		expect(actual).toBe(email);
	});
});
