import { GitUrl } from "git-url-parse";

import { PartialPackageData } from "../types.js";

export async function readRepository(
	getGitDefaults: () => Promise<GitUrl | undefined>,
	getPackageDataFull: () => Promise<PartialPackageData>,
	options: { directory?: string; repository?: string },
) {
	return (
		options.repository ??
		(await getGitDefaults())?.name ??
		(await getPackageDataFull()).name ??
		options.directory
	);
}
