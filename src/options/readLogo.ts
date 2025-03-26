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

	return {
		alt,
		src,
		...readLogoSizing(src),
	};
}
