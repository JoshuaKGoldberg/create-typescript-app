import type { PartialPackageData } from "./types.js";

import { readFileSafe } from "../readFileSafe.js";
import { readAuthorIfExists } from "./readAuthorIfExists.js";
import { readEmailIfExists } from "./readEmailIfExists.js";
import { readFundingIfExists } from "./readFundingIfExists.js";
import { readOwnerFromGitRemote } from "./readOwnerFromGitRemote.js";
import { readTitleFromReadme } from "./readTitleFromReadme.js";

export async function getHydrationDefaults() {
	const existingPackage = JSON.parse(
		await readFileSafe("./package.json", "{}")
	) as PartialPackageData;

	return {
		author: () => readAuthorIfExists(existingPackage),
		email: () => readEmailIfExists(existingPackage),
		funding: readFundingIfExists,
		owner: readOwnerFromGitRemote,
		releases: true,
		title: readTitleFromReadme,
		unitTests: true,
	};
}
