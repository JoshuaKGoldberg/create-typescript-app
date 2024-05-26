import lazyValue from "lazy-value";

import { readFileSafe } from "../../readFileSafe.js";

export function readDefaultsFromReadme() {
	const readme = lazyValue(async () => await readFileSafe("README.md", ""));

	const imageTag = lazyValue(
		async () => (await readme()).match(/<img.+src.+\/>/)?.[0],
	);

	return {
		logo: async () =>
			(await imageTag())
				?.match(/src\s*=(.+)?\/>/)?.[1]
				?.replaceAll(/^['"]|['"]$/g, ""),
		title: async () =>
			(await readme())
				.match(/^(?:# |<h1\s+align="center">)(.*?)(?:<\/h1>)?$/i)?.[1]
				?.trim()
				.replace(/<[^>]+(?:>|$)/g, ""),
	};
}
