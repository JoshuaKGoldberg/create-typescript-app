import lazyValue from "lazy-value";

import { readFileSafe } from "../../readFileSafe.js";

export function readDefaultsFromDevelopment() {
	const development = lazyValue(
		async () => await readFileSafe(".github/DEVELOPMENT.md", ""),
	);

	const guideTag = lazyValue(async () =>
		(await development()).match(
			/> .*guided walkthrough, see \[((?!\[).+)\]\((.+)\)/i,
		),
	);

	return {
		guide: async () => (await guideTag())?.[2],
		guideTitle: async () => (await guideTag())?.[1],
	};
}
