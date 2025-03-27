import { Block } from "bingo-stratum";
import * as fs from "node:fs/promises";
import * as prettier from "prettier";
import { describe, expect, test } from "vitest";

import { blocks, presets } from "./index.js";

const actualLines = await createActualLines();
const expectedLines = await createExpectedLines();

// This test ensures ensures docs/Blocks.md has a row for each of CTA's blocks.
// Each row should include emojis describing which preset(s) include the block.
//
// If this fails, it's likely due to adding, removing, or renaming a block.
// You may need to manually change docs/Blocks.md to match to those changes.
//
// For example, if you add a blockExample to the Common and Everything presets,
// you'll need to add a row like:
//
// ```md
// | Example | `--add-example`, `--exclude-example` | | ✅ | 💯 |
// ```
//
// Rows are kept sorted by alphabetical order of name.
describe("docs/Blocks.md", () => {
	for (const [i, line] of expectedLines.entries()) {
		const name = line.split(" | ")[0].replace("| ", "").trim();
		if (!name) {
			continue;
		}

		test(name, () => {
			const actualLine = actualLines.find((line) => line.includes(`| ${name}`));
			const expectedLine = expectedLines[i];

			expect(actualLine).toBe(expectedLine);
		});
	}
});

async function createActualLines() {
	const actualFile = (await fs.readFile("docs/Blocks.md")).toString();

	actualFile
		.split("\n")
		.filter((line) => !line.includes("----"))
		.map((line) => line.toLowerCase());

	return splitTable(actualFile);
}

async function createExpectedLines() {
	const lines = [
		"| Block | Flags | Minimal | Common | Everything |",
		"| ----- | ----- | ------- | ------ | ---------- |",
	];

	for (const block of Object.values(blocks) as Block[]) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const name = block.about!.name!;

		lines.push(
			[
				name,
				`${createFlag("add", name)}, ${createFlag("exclude", name)}`,
				presets.minimal.blocks.includes(block) ? "✔️" : " ",
				presets.common.blocks.includes(block) ? "✅" : " ",
				presets.everything.blocks.includes(block) ? "💯" : " ",
				"",
			].join(" | "),
		);
	}

	const expectedTable = await prettier.format(lines.join("\n"), {
		parser: "markdown",
		useTabs: true,
	});

	return splitTable(expectedTable);
}

function createFlag(prefix: string, name: string) {
	return `\`--${prefix}-${name.replaceAll(/\W+/g, "-").toLowerCase()}\``;
}

function splitTable(table: string) {
	return table
		.split("\n")
		.filter((line) => !line.includes("----"))
		.map((line) => line.toLowerCase());
}
