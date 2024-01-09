export function splitIntoSections(text: string) {
	const sections: [string, string][] = [];
	if (!text) {
		return sections;
	}

	let remaining = `${text}\n`;

	while (remaining) {
		const indexOfNewline = remaining.indexOf("\n", 1);
		let nextStart = remaining.indexOf("\n#", 1);
		if (nextStart === -1) {
			nextStart = remaining.length;
		}

		const heading = remaining.slice(0, indexOfNewline).trim();
		const contents = remaining
			.slice(indexOfNewline, nextStart)
			.trimEnd()
			.replace(/^\n+/, "");

		sections.push([heading, contents]);
		remaining = remaining.slice(nextStart);
	}

	return sections;
}
