import { titleCase } from "title-case";

export async function readTitle(
	getReadme: () => Promise<string>,
	getRepository: () => Promise<string | undefined>,
) {
	const text = await getReadme();
	const fromText = (/^<h1\s+align="center">(.+)<\/h1>/.exec(text) ??
		/^# (.+)/.exec(text))?.[1];
	if (fromText) {
		return fromText;
	}

	const repositoryValue = await getRepository();

	return (
		repositoryValue &&
		titleCase(repositoryValue)
			.replaceAll("Eslint", "ESLint")
			.replaceAll("Typescript", "TypeScript")
			.replaceAll("-", " ")
	);
}
