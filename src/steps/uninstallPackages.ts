import { $ } from "execa";

import {
	readPackageData,
	removeDependencies,
	removeDevDependencies,
} from "../shared/packages.js";

export async function uninstallPackages() {
	const packageData = await readPackageData();

	await removeDependencies(
		[
			"@clack/prompts",
			"all-contributors-for-repository",
			"chalk",
			"execa",
			"git-remote-origin-url",
			"git-url-parse",
			"js-yaml",
			"npm-user",
			"octokit",
			"prettier",
			"replace-in-file",
			"title-case",
		],
		packageData,
	);

	await removeDevDependencies(
		[
			"@octokit/request-error",
			"@types/git-url-parse",
			"@types/js-yaml",
			"@types/prettier",
			"all-contributors-cli",
			"c8",
			"globby",
			"tsx",
		],
		packageData,
	);

	await $`pnpm add prettier -D`;
}
