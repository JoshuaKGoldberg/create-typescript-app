import { TakeInput } from "bingo";
import { inputFromFile } from "input-from-file";

export async function readGuide(take: TakeInput) {
	const development = await take(inputFromFile, {
		filePath: ".github/DEVELOPMENT.md",
	});

	if (development instanceof Error) {
		return undefined;
	}

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
