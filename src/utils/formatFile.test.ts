import { describe, expect, test } from "vitest";

import { formatFile } from "./formatFile.ts";

describe(formatFile, () => {
	test("JSON file", () => {
		const actual = formatFile(
			"example.json",
			JSON.stringify({ array: ["a", "b"], object: { key: "value" } }),
		);

		expect(actual).toBe(`{ "array": ["a", "b"], "object": { "key": "value" } }
`);
	});

	test("package.json file", () => {
		const actual = formatFile(
			"package.json",
			JSON.stringify({ files: ["lib/"], name: "example" }),
		);

		expect(actual).toBe(`{
	"files": [
		"lib/"
	],
	"name": "example"
}
`);
	});

	test("TypeScript file", () => {
		const actual = formatFile(
			"example.config.ts",
			`export default ${JSON.stringify({ useTabs: true })};`,
		);

		expect(actual).toBe(`export default { useTabs: true };
`);
	});
});
