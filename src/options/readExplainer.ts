export async function readExplainer(getReadme: () => Promise<string>) {
	const readme = await getReadme();

	const indexOfH2 = readme.indexOf("##");
	if (indexOfH2 === -1) {
		return undefined;
	}

	const lastTag = readme.slice(0, indexOfH2).lastIndexOf(">");

	return readme
		.slice(lastTag + 1, indexOfH2)
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean);
}
