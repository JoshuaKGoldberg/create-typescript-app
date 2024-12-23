import lazyValue from "lazy-value";

import { readFileSafe } from "../../readFileSafe.js";

export function readDefaultsFromReadme() {
	const readme = lazyValue(async () => await readFileSafe("README.md", ""));

	const imageTag = lazyValue(
		async () => /\n<img.+src=.+>/.exec(await readme())?.[0],
	);

	return {
		logo: async () => {
			const tag = await imageTag();

			if (!tag) {
				return undefined;
			}

			const src = /src\s*=(.+)['"/]>/
				.exec(tag)?.[1]
				?.replaceAll(/^['"]|['"]$/g, "");

			if (!src) {
				return undefined;
			}

			return {
				alt: /alt=['"](.+)['"]\s*src=/.exec(tag)?.[1] ?? "Project logo",
				src,
			};
		},
		title: async () => {
			const text = await readme();
			return (/^<h1\s+align="center">(.+)<\/h1>/.exec(text) ??
				/^# (.+)/.exec(text))?.[1];
		},
	};
}
