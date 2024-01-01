import { describe, expect, test } from "vitest";

import { splitIntoSections } from "./splitIntoSections.js";

describe("createDevelopment", () => {
	test.each([
		["", []],
		["# Development \nabc 123", [["# Development", "abc 123"]]],
		["# Development \n\nabc 123 ", [["# Development", "abc 123"]]],
		["# Development \n  Indented. ", [["# Development", "  Indented."]]],
		["# Development \n    Indented. ", [["# Development", "    Indented."]]],
		["# Development \n\tIndented. ", [["# Development", "\tIndented."]]],
		[
			`# Development

.

## Abc

abc 123

### Def

def 456

## Ghi

ghi 789
`,
			[
				["# Development", "."],
				["## Abc", "abc 123"],
				["### Def", "def 456"],
				["## Ghi", "ghi 789"],
			],
		],
	])("%j", (text, expected) => {
		expect(splitIntoSections(text)).toEqual(expected);
	});
});
