import fs from "node:fs/promises";
import { EOL } from "node:os";

export const endOfReadmeNotice = [
	``,
	`<!-- You can remove this notice if you don't want it 🙂 no worries! -->`,
	``,
	`> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app).`,
	``,
].join(EOL);

export async function updateReadme() {
	await fs.appendFile("./README.md", endOfReadmeNotice);
}
