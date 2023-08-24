import { readFileSafe } from "../../readFileSafe.js";

export async function readTitleFromReadme() {
	return (await readFileSafe("./README.md", ""))
		.match(/^(?:# |<h1\s+align="center">)(.*?)(?:<\/h1>)?$/i)?.[1]
		?.trim()
		.replace(/<[^>]+(?:>|$)/g, "");
}
