import { existingBadgeMatcherCreators } from "./findExistingBadges.js";

export function findIntroSectionClose(contents: string) {
	// Highest priority: after an existing create-typescript-app-style logo
	const projectLogoMatch =
		/<img align="right" alt="Project logo.+" src=".+">/.exec(contents);
	if (projectLogoMatch) {
		return contents.indexOf("\n", projectLogoMatch.index) + 2;
	}

	// Next: before a first code block or h2, presumably following badges
	const indexOfH2OrCodeBlock = contents.search(/## |<\s*h2|```/);

	if (indexOfH2OrCodeBlock !== -1) {
		return indexOfH2OrCodeBlock - 2;
	}

	// Failing those, if any badges are found, go after the last of them
	for (const createMatcher of existingBadgeMatcherCreators) {
		const lastMatch = [...contents.matchAll(createMatcher())].at(-1);

		if (lastMatch?.index) {
			return lastMatch.index + lastMatch[0].length + 2;
		}
	}

	// Lastly, go for the second line altogether
	return contents.indexOf("\n", 1) + 1;
}
