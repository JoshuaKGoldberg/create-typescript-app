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

	const existing = (await readFileAsJson(
		"cspell.json",
	)) as typeof import("../../cspell.json");

	await fs.writeFile(
		"cspell.json",
		await formatJson({
			...existing,
			words: [...existing.words, ...unknownWords].sort(),
		}),
	);
}
