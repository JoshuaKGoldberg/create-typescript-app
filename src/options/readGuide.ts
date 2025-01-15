import { readFileSafe } from "./readFileSafe.js";

export async function readGuide() {
	const development = await readFileSafe(".github/DEVELOPMENT.md", "");
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
