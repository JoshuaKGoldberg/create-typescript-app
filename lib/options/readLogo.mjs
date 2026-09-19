import { readLogoSizing } from "./readLogoSizing.mjs";
import * as fs from "node:fs/promises";
//#region src/options/readLogo.ts
async function readLogo(getReadme) {
	const tag = /\n<img.+src=.+>/.exec(await getReadme())?.[0];
	if (!tag) return;
	const alt = /alt=['"](.+)['"]\s*src=/.exec(tag)?.[1].split(/['"]?\s*\w+=/)[0] ?? "Project logo";
	if (/All Contributors: \d+/.test(alt)) return;
	const src = /src\s*=(.+)['"/]>/.exec(tag)?.[1]?.split(/\s*\w+=/)[0].replaceAll(/^['"]|['"]$/g, "");
	if (!src || src.includes("//img.shields.io")) return;
	const bufferData = await fs.readFile(src);
	return {
		alt,
		src,
		...readLogoSizing(bufferData)
	};
}
//#endregion
export { readLogo };
