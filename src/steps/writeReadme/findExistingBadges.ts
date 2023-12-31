export const existingBadgeMatcherCreators = [
	() => /\[!\[.+\]\(.+\)\]\(.+\)/g,
	() => /!\[.+\]\(.+\)/g,
	() => /^\s*<a[ \tA-Za-z_\-=#&;?./:'"]*>[\s\S]+?<\/a>/gm,
	() => /<img.+src.+\/>/g,
];

export function findExistingBadges(contents: string): string[] {
	const badges: string[] = [];
	let remaining = contents.split(/<\s*h2.*>|##/)[0];

	for (const createMatcher of existingBadgeMatcherCreators) {
		while (true) {
			const matcher = createMatcher();
			const matched = matcher.exec(remaining);

			if (!matched) {
				break;
			}

			const [badge] = matched;

			badges.push(badge.trim());

			remaining = remaining.replace(badge, "");
		}
	}

	return badges;
}
