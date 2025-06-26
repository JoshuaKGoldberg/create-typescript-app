import * as fs from "node:fs/promises";

import { readLogoSizing } from "./readLogoSizing.js";

export async function readLogo(getReadme: () => Promise<string>) {
	const tag = /\n<img.+src=.+>/.exec(await getReadme())?.[0];

	if (!tag) {
		return undefined;
	}

	const alt =
		/alt=['"](.+)['"]\s*src=/.exec(tag)?.[1].split(/['"]?\s*\w+=/)[0] ??
		"Project logo";

	if (/All Contributors: \d+/.test(alt)) {
		return undefined;
	}

	const src = /src\s*=(.+)['"/]>/
		.exec(tag)?.[1]
		?.split(/\s*\w+=/)[0]
		.replaceAll(/^['"]|['"]$/g, "");

	if (!src || src.includes("//img.shields.io")) {
		return undefined;
	}

	// TODO: imageSize does not go through take(input*), making it harder to test.
	// It takes either a string (fs access) or buffer data (not in bingo-fs).
	// https://github.com/JoshuaKGoldberg/create-typescript-app/issues/1993
	const bufferData = await fs.readFile(src);

	return {
		alt,
		src,
		...readLogoSizing(bufferData),
	};
}
