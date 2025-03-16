import * as fs from "node:fs/promises";
import { describe, expect, it } from "vitest";

import { base } from "./index.js";

// This test ensures all options are mentioned in either:
// - docs/CLI.md: for options that can be used on the command line
// - docs/Configuration Files.md: for options that can be used in a config file
//
// If this fails, it's likely due to adding, removing, or renaming an option.
// You may need to manually change the docs to match those changes.
//
// For example, if you add an `example: z.boolean().optional` option to Base,
// you'll need to add a row to docs/CLI.md like:
//
// ```md
// | `--example` | `boolean` | same description from base.ts | `false` |
// ```
describe("Docs: Options", () => {
	it("includes mentions of all options from the Base", async () => {
		const existingOptions = new Set(
			(
				await Promise.all([
					splitFileIntoOptions("docs/CLI.md"),
					splitFileIntoOptions("docs/Configuration Files.md"),
				])
			).flat(),
		);

		const missingOptions = Object.keys(base.options).filter(
			(key) => !existingOptions.has(key),
		);

		expect(missingOptions).toEqual([]);
	});
});

async function splitFileIntoOptions(filePath: string) {
	const text = (await fs.readFile(filePath)).toString();

	return text
		.split(/[\r\n]+/)
		.map((line) => /`(?:--)?(\w+)` /.exec(line)?.[1])
		.filter((line) => typeof line === "string");
}
