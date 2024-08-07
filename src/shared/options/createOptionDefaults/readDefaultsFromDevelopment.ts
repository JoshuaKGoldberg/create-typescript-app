import lazyValue from "lazy-value";

import { readFileSafe } from "../../readFileSafe.js";

export function readDefaultsFromDevelopment() {
	const development = lazyValue(
		async () => await readFileSafe(".github/DEVELOPMENT.md", ""),
	);

	const guideTag = lazyValue(async () =>
		/> .*guided walkthrough, see \[((?!\[).+)\]\((.+)\)/i.exec(
			await development(),
		),
	);

	return {
		guide: async () => (await guideTag())?.[2],
		guideTitle: async () => (await guideTag())?.[1],
	};
}
