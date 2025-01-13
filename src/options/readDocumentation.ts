import { TakeInput } from "create";
import { inputFromFile } from "input-from-file";

import { swallowError } from "../utils/swallowError.js";

const knownHeadings = new Set([
	"building",
	"development",
	"formatting",
	"linting",
	"testing",
	"type checking",
]);

export async function readDocumentation(take: TakeInput) {
	const existing = swallowError(
		await take(inputFromFile, {
			filePath: ".github/DEVELOPMENT.md",
		}),
	);
	if (!existing) {
		return undefined;
	}

	return existing
		.split(/\n\n(?=##\s)/)
		.filter((section) => !knownHeadings.has(parseHeading(section)))
		.join("\n\n");
}

function parseHeading(section: string) {
	return section
		.split("\n")[0]
		.replace(/^#+\s+/, "")
		.trim()
		.toLowerCase();
}
