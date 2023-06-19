import type { PartialPackageData } from "./types.js";

import { readFileSafe } from "../readFileSafe.js";
import { readAuthorIfExists } from "./readAuthorIfExists.js";
import { readEmailIfExists } from "./readEmailIfExists.js";
import { readFundingIfExists } from "./readFundingIfExists.js";
import { readOwnerFromGitRemote } from "./readOwnerFromGitRemote.js";

export async function getHydrationDefaults() {
	const existingReadme = await readFileSafe("./README.md", "");
	const existingPackage = JSON.parse(
		await readFileSafe("./package.json", "{}")
	) as PartialPackageData;

	return {
		author: () => readAuthorIfExists(existingPackage),
		email: () => readEmailIfExists(existingPackage),
		funding: readFundingIfExists,
		owner: readOwnerFromGitRemote,
		releases: true,
		title: existingReadme.match(/^(?:# |<h1\s+align="center">)(\S+)/)?.[1],
		unitTests: true,
	};
}
