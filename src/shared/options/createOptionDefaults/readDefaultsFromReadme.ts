import lazyValue from "lazy-value";

import { readFileSafe } from "../../readFileSafe.js";

export function readDefaultsFromReadme() {
	const readme = lazyValue(async () => await readFileSafe("README.md", ""));

	const imageTag = lazyValue(
		async () => /<img.+src.+\/>/.exec(await readme())?.[0],
	);

	return {
		logo: async () =>
			(await imageTag())
				?.match(/src\s*=(.+)?\/>/)?.[1]
				?.replaceAll(/^['"]|['"]$/g, ""),
		title: async () =>
			(/^<h1\s+align="center">(.+)<\/h1>/.exec(await readme()) ||
				/^# (.+)/.exec(await readme()))?.[1],
	};
}
