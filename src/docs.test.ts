import { Block } from "create";
import * as fs from "node:fs/promises";
import * as prettier from "prettier";
import { describe, expect, test } from "vitest";

import { blocks, presets } from "./index.js";

const actualLines = await createActualLines();
const expectedLines = await createExpectedLines();

describe("Blocks.md", () => {
	for (const [i, line] of expectedLines.entries()) {
		const name = line.split(" | ")[0].replace("| ", "").trim();
		if (!name) {
			continue;
		}

		// eslint-disable-next-line vitest/valid-title
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
		"| Block                        | Exclusion Flag                           | Minimal | Common | Everything |",
		"| ---------------------------- | ---------------------------------------- | ------- | ------ | ---------- |",
	];

	for (const block of Object.values(blocks) as Block[]) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const name = block.about!.name!;

		lines.push(
			[
				name,
				`\`--exclude-${name.replaceAll(/\W+/g, "-").toLowerCase()}\``,
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

function splitTable(table: string) {
	return table
		.split("\n")
		.filter((line) => !line.includes("----"))
		.map((line) => line.toLowerCase());
}
