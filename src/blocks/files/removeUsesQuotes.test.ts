import { describe, expect, test } from "vitest";

import { removeUsesQuotes } from "./removeUsesQuotes.js";

describe(removeUsesQuotes, () => {
	test.each([
		[""],
		["run: pnpm run build"],
		["- uses: actions/checkout@v4"],
		["- uses: 'actions/checkout@v4'", "- uses: actions/checkout@v4"],
		["- uses: actions/checkout@abc # v4"],
		[
			"- uses: 'actions/checkout@abc # v4'",
			"- uses: actions/checkout@abc # v4",
		],
	])("%s", (input, expected = input) => {
		expect(removeUsesQuotes(input)).toBe(expected);
	});
});
