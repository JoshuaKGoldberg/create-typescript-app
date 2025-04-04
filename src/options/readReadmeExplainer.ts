const lastTagMatchers = [`">`, "/p>", "/>"];

export async function readReadmeExplainer(getReadme: () => Promise<string>) {
	const readme = await getReadme();

	const indexOfFirstH2 = readme.indexOf("##");
	const indexOfUsageH2 = /## Usage/.exec(readme)?.index;
	const beforeH2s = readme.slice(0, indexOfUsageH2 ?? indexOfFirstH2);
	const [indexOfLastTag, lastTagMatcher] = lastLastIndexOf(
		beforeH2s,
		lastTagMatchers,
	);
	if (!lastTagMatcher) {
		return undefined;
	}

	const endingIndex =
		indexOfUsageH2 ?? /## (?:Contrib|Develop)/.exec(readme)?.index;

	return readme
		.slice(indexOfLastTag + lastTagMatcher.length, endingIndex)
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
