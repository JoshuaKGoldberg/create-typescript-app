export async function readReadmeExplainer(getReadme: () => Promise<string>) {
	const readme = await getReadme();

	const indexOfUsageH2 = /## Usage/.exec(readme)?.index ?? readme.indexOf("##");
	if (indexOfUsageH2 === -1) {
		return undefined;
	}

	const beforeUsageH2 = readme.slice(0, indexOfUsageH2);

	const [indexOfLastTag, lastTagMatcher] = lastLastIndexOf(beforeUsageH2, [
		`">`,
		"/p>",
		"/>",
	]);
	if (!lastTagMatcher) {
		return undefined;
	}

	return readme
		.slice(indexOfLastTag + lastTagMatcher.length, indexOfUsageH2)
		.trim();
}

function lastLastIndexOf(text: string, matchers: string[]) {
	let pair: [number, string | undefined] = [-1, undefined];

	for (const matcher of matchers) {
		const indexOf = text.lastIndexOf(matcher);
		if (indexOf > pair[0]) {
			pair = [indexOf, matcher];
		}
	}

	return pair;
}
