//#region src/options/readReadmeExplainer.ts
const lastTagMatchers = [
	`">`,
	"/p>",
	"/>"
];
async function readReadmeExplainer(getReadme) {
	const readme = await getReadme();
	const indexOfFirstH2 = readme.indexOf("##");
	const indexOfUsageH2 = /## Usage/.exec(readme)?.index;
	const [indexOfLastTag, lastTagMatcher] = lastLastIndexOf(readme.slice(0, indexOfUsageH2 ?? indexOfFirstH2), lastTagMatchers);
	if (!lastTagMatcher) return;
	const endingIndex = indexOfUsageH2 ?? /## (?:Contrib|Develop)/.exec(readme)?.index;
	return readme.slice(indexOfLastTag + lastTagMatcher.length, endingIndex).trim();
}
function lastLastIndexOf(text, matchers) {
	let pair = [-1, void 0];
	for (const matcher of matchers) {
		const indexOf = text.lastIndexOf(matcher);
		if (indexOf > pair[0]) pair = [indexOf, matcher];
	}
	return pair;
}
//#endregion
export { readReadmeExplainer };
