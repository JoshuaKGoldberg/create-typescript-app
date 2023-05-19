import { describe, expect, it } from "vitest";

import { ensureSettingsAreFilledOut } from "./repositorySettings.js";

describe("ensureSettingsAreFilledOut", () => {
	it("throws an error when no settings are filled out", () => {
		expect(() =>
			ensureSettingsAreFilledOut({
				author: undefined,
				description: undefined,
				email: undefined,
				funding: undefined,
				owner: undefined,
				releases: undefined,
				repository: undefined,
				title: undefined,
				unitTests: undefined,
			})
		).toThrow(`Failed to determine repository settings:
- Could not determine description. Please add a 'description' to package.json, or provide with --description.
- Could not determine repository. Please add a 'name' to package.json, or provide with --repository.
- Could not determine author. Please add an 'author' to package.json like "Your Name <your@email.com>" or an { email, name } object, or provide with --author.
- Could not determine email. Please add an 'author' to package.json like "Your Name <your@email.com>" or an { email, name } object, or provide with --email.
- Could not determine owner. Please add an 'origin' git remote, or provide with --owner.
- Could not determine title. Please add an h1 to the README.md, or provide with --title.`);
	});

	it("does not throw an error when all settings are filled out", () => {
		expect(() =>
			ensureSettingsAreFilledOut({
				author: "Test Author",
				description: "test description",
				email: "test@email.com",
				funding: "TestFunding",
				owner: "TestOwner",
				releases: true,
				repository: "test-repository",
				title: "Test Title",
				unitTests: true,
			})
		).not.toThrow();
	});
});
