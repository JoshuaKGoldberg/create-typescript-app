import { $ } from "execa";
import * as fs from "node:fs/promises";

import { readFileAsJson } from "../shared/readFileAsJson.js";
import { formatJson } from "./writing/creation/formatters/formatJson.js";

async function getStdout() {
	try {
		return await $`pnpm run lint:spelling`;
	} catch (error) {
		return error as { stdout: string };
	}
}

export async function populateCSpellDictionary() {
	const { stdout } = await getStdout();
	const unknownWords = new Set(
		Array.from(stdout.matchAll(/Unknown word \((.+)\)/g)).map(
			([, matched]) => matched,
		),
	);

	const existing = (await readFileAsJson("cspell.json")) as Partial<
		typeof import("../../cspell.json")
	>;

	const allWords = [...(existing.words ?? []), ...unknownWords];
	const allWordsUnique = new Set(allWords);

	await fs.writeFile(
		"cspell.json",
		await formatJson({
			...existing,
			words: allWords
				.filter((word) => {
					const wordLowerCase = word.toLowerCase();
					return word === wordLowerCase || !allWordsUnique.has(wordLowerCase);
				})
				.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
		}),
	);
}
