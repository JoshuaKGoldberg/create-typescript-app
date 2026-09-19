import { inputFromFile } from "input-from-file";
//#region src/options/readGuide.ts
async function readGuide(take) {
	const development = await take(inputFromFile, { filePath: ".github/DEVELOPMENT.md" });
	if (development instanceof Error) return;
	const tag = /> .*guided walkthrough, see \[((?!\[).+)\]\((.+)\)/i.exec(development);
	if (!tag) return;
	return {
		href: tag[2],
		title: tag[1]
	};
}
//#endregion
export { readGuide };
