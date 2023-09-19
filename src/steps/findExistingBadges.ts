const matchers = [
	/\[!\[.+\]\(.+\)\]\(.+\)/,
	/!\[.+\]\(.+\)/,
	/^\s*<a[ \tA-Za-z_\-=#&;?./:'"]*>[\s\S]+<\/a>/gm,
	/<img.+src.+\/>/,
];

export function findExistingBadges(contents: string): string[] {
	const badges: string[] = [];
	let remaining = contents.split(/<\/p>|##/)[0];

	for (const matcher of matchers) {
		while (true) {
			const matched = matcher.exec(remaining);

			if (!matched) {
				break;
			}

			const [badge] = matched;

			badges.push(badge);
			remaining = [
				remaining.slice(0, matched.index),
				remaining.slice(matched.index + badge.length),
			].join("");
		}
	}

	return badges;
}
