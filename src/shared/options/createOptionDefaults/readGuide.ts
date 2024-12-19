import path from "node:path";

import { readFileSafe } from "../../readFileSafe.js";

export async function readGuide(directory: string) {
	const development = await readFileSafe(
		path.join(directory, ".github/DEVELOPMENT.md"),
		"",
	);
	const tag = /> .*guided walkthrough, see \[((?!\[).+)\]\((.+)\)/i.exec(
		development,
	);

	if (!tag) {
		return undefined;
	}

	return {
		href: tag[2],
		title: tag[1],
	};
}
