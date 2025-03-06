import { describe, expect, it } from "vitest";

import { getInstallationSuggestions } from "./getInstallationSuggestions.js";

const description = "do the action";
const url = "https://example.com";

describe(getInstallationSuggestions, () => {
	it("returns undefined when there are no entries", () => {
		const actual = getInstallationSuggestions(description, [], url);

		expect(actual).toBeUndefined();
	});

	it("returns a non-plural list when there is one entry", () => {
		const actual = getInstallationSuggestions(description, ["entry"], url);

		expect(actual).toMatchInlineSnapshot(`
			[
			  "- do the action on https://example.com:
			   - entry",
			]
		`);
	});

	it("returns a plural list when there are multiple entries", () => {
		const actual = getInstallationSuggestions(
			description,
			["entry a", "entry b"],
			url,
		);

		expect(actual).toMatchInlineSnapshot(`
			[
			  "- do the actions on https://example.com:
			   - entry a
			   - entry b",
			]
		`);
	});
});
