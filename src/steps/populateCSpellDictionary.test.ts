import { describe, expect, it, vi } from "vitest";

import { populateCSpellDictionary } from "./populateCSpellDictionary.js";

const mock$ = vi.fn();

vi.mock("execa", () => ({
	get $() {
		return mock$;
	},
}));

const mockReadFile = vi.fn();
const mockWriteFile = vi.fn();

vi.mock("node:fs/promises", () => ({
	get readFile() {
		return mockReadFile;
	},
	get writeFile() {
		return mockWriteFile;
	},
}));

const mockFormatJson = vi.fn();

vi.mock("./writing/creation/formatters/formatJson.js", () => ({
	get formatJson() {
		return mockFormatJson;
	},
}));

describe("populateCSpellDictionary", () => {
	it("adds unknown words to cspell.json", async () => {
		const existingWords = ["abc", "ghi", "casing"];
		const unknownWords = ["def", "jkl", "Casing"];

		mock$.mockResolvedValue({
			stdout: `
				file-1.ts Unknown word (${unknownWords[0]})
				file-2.ts Unknown word (${unknownWords[1]})
				file-2.ts Unknown word (${unknownWords[0]})
			`,
		});

		mockReadFile.mockResolvedValue(JSON.stringify({ words: existingWords }));

		await populateCSpellDictionary();

		expect(mockFormatJson.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    {
			      "words": [
			        "abc",
			        "casing",
			        "def",
			        "ghi",
			        "jkl",
			      ],
			    },
			  ],
			]
		`);
	});
});
