import fs from "node:fs/promises";
import { EOL } from "node:os";

import { readFileSafe } from "../shared/readFileSafe.js";

export const endOfReadmeNotice = [
	``,
	`<!-- You can remove this notice if you don't want it 🙂 no worries! -->`,
	``,
	`> 💙 This package was templated with [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app).`,
	``,
].join(EOL);

export const endOfReadmeMatcher =
	/💙.+(?:based|built|templated).+(?:from|using|on|with).+create-typescript-app/;

export async function updateReadme() {
	const contents = await readFileSafe("./README.md", "");

	if (!endOfReadmeMatcher.test(contents)) {
		await fs.appendFile("./README.md", endOfReadmeNotice);
	}
}
