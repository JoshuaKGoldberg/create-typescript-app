import { existingBadgeMatcherCreators } from "./findExistingBadges.js";

export function findIntroSectionClose(contents: string) {
	// Highest priority match: an h2, presumably following badges
	const indexOfH2OrCodeBlock = contents.search(/## |<\s*h2|```/);

	if (indexOfH2OrCodeBlock !== -1) {
		return indexOfH2OrCodeBlock - 2;
	}

	// Failing that, if any badges are found, go after the last of them
	for (const createMatcher of existingBadgeMatcherCreators) {
		const lastMatch = [...contents.matchAll(createMatcher())].at(-1);

		if (lastMatch?.index) {
			return lastMatch.index + lastMatch[0].length + 2;
		}
	}

	// Lastly, go for the second line altogether
	return contents.indexOf("\n", 1) + 1;
}
