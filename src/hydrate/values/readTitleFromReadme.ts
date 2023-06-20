import { readFileSafe } from "../readFileSafe.js";

export async function readTitleFromReadme() {
	const titleMatch = (await readFileSafe("./README.md", "")).match(
		/^(?:# |<h1\s+align="center">)(.*?)(?:<\/h1>)?$/i
	);

	if (!titleMatch) {
		return undefined;
	}

	const title = titleMatch[1].trim().replace(/<[^>]+(?:>|$)/g, "");
	return title;
}
