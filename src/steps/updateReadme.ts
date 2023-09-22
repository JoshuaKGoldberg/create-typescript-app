import fs from "node:fs/promises";
import { EOL } from "node:os";

import { readFileSafe } from "../shared/readFileSafe.js";

const detectionLine = `<!-- You can remove this notice if you don't want it 🙂 no worries! -->`;

export const endOfReadmeNotice = [
	``,
	detectionLine,
	``,
	`> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app).`,
	``,
].join(EOL);

export async function updateReadme() {
	const contents = await readFileSafe("./README.md", "");

	if (!contents.includes(detectionLine)) {
		await fs.appendFile("./README.md", endOfReadmeNotice);
	}
}
