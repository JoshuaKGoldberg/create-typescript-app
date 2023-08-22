import { readPackageData } from "../../shared/packages.js";
import { readAuthorIfExists } from "./readAuthorIfExists.js";
import { readEmailIfExists } from "./readEmailIfExists.js";
import { readFundingIfExists } from "./readFundingIfExists.js";
import { readOwnerFromGitRemote } from "./readOwnerFromGitRemote.js";
import { readTitleFromReadme } from "./readTitleFromReadme.js";

export async function getMigrationDefaults() {
	const packageData = await readPackageData();

	return {
		author: () => readAuthorIfExists(packageData),
		email: () => readEmailIfExists(packageData),
		funding: readFundingIfExists,
		owner: readOwnerFromGitRemote,
		releases: true,
		title: readTitleFromReadme,
		unitTests: true,
	};
}
