import { TakeInput } from "bingo";
import { inputFromFile } from "input-from-file";

import { swallowError } from "../utils/swallowError.ts";

const knownHeadings = new Set([
	"building",
	"development",
	"formatting",
	"linting",
	"testing",
	"type checking",
]);

export async function readDevelopmentDocumentation(take: TakeInput) {
	const existing = swallowError(
		await take(inputFromFile, {
			filePath: ".github/DEVELOPMENT.md",
		}),
	);
	return existing
		? existing
				.split(/\n\n(?=##\s)/)
				.filter((section) => !knownHeadings.has(parseHeading(section)))
				.join("\n\n")
		: undefined;
}

function parseHeading(section: string) {
	return section
		.split("\n", 1)[0]
		.replace(/^#+\s+/, "")
		.trim()
		.toLowerCase();
}
