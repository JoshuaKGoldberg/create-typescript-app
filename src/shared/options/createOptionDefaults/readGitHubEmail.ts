import { readFileSafe } from "../../readFileSafe.js";

export async function readGitHubEmail() {
	// The create-typescript-app template puts the GitHub email in the CoC.
	// If they seem to be using the template, we can go with that.
	const codeOfConduct = await readFileSafe(".github/CODE_OF_CONDUCT.md", "");
	if (!codeOfConduct.includes("Contributor Covenant Code of Conduct")) {
		return undefined;
	}

	return /for enforcement at[\r\n]+(.+)\.[\r\n]+All/.exec(codeOfConduct)?.[1];
}
