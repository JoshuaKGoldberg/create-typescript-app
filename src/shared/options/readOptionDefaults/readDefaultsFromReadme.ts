import { readFileSafe } from "../../readFileSafe.js";

export async function readDefaultsFromReadme() {
	const contents = await readFileSafe("./README.md", "");

	return {
		// TODO: This!
		logo: undefined,
		title: contents
			.match(/^(?:# |<h1\s+align="center">)(.*?)(?:<\/h1>)?$/i)?.[1]
			?.trim()
			.replace(/<[^>]+(?:>|$)/g, ""),
	};
}
