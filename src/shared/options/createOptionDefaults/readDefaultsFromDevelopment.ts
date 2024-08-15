import lazyValue from "lazy-value";

import { readFileSafe } from "../../readFileSafe.js";

export function readDefaultsFromDevelopment() {
	return {
		guide: lazyValue(async () => {
			const tag = /> .*guided walkthrough, see \[((?!\[).+)\]\((.+)\)/i.exec(
				await readFileSafe(".github/DEVELOPMENT.md", ""),
			);

			if (!tag) {
				return undefined;
			}

			return {
				href: tag[2],
				title: tag[1],
			};
		}),
	};
}
