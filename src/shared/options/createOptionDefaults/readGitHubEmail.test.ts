import { describe, expect, it, vi } from "vitest";

import { readGitHubEmail } from "./readGitHubEmail.js";

const mockReadFileSafe = vi.fn();

vi.mock("../../readFileSafe.js", () => ({
	get readFileSafe() {
		return mockReadFileSafe;
	},
}));

describe("readGitHubEmail", () => {
	it("returns undefined when it cannot be found", async () => {
		mockReadFileSafe.mockResolvedValue("nothing.");

		const email = await readGitHubEmail();

		expect(email).toBeUndefined();
	});

	it("returns undefined when a different template", async () => {
		mockReadFileSafe.mockResolvedValue(
			`## Other Code of Conduct

for enforcement at
invalid@test.com.
`,
		);

		const email = await readGitHubEmail();

		expect(email).toBeUndefined();
	});

	it("returns the email when it matches the template", async () => {
		const expected = `email@test.com`;

		mockReadFileSafe.mockResolvedValue(
			`## Contributor Covenant Code of Conduct

reported to the community leaders responsible for enforcement at
${expected}.
All complaints will be reviewed and investigated promptly and fairly.
`,
		);

		const email = await readGitHubEmail();

		expect(email).toBe(expected);
	});
});
