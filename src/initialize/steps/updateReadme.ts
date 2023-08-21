import fs from "node:fs/promises";
import { EOL } from "node:os";

export async function updateReadme() {
	const endOfReadmeNotice = [
		``,
		`<!-- You can remove this notice if you don't want it 🙂 no worries! -->`,
		``,
		`> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [template-typescript-node-package](https://github.com/JoshuaKGoldberg/template-typescript-node-package).`,
		``,
	].join(EOL);

	await fs.appendFile("./README.md", endOfReadmeNotice);
}
