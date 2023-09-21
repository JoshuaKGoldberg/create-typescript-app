import { $ } from "execa";

import { readPackageData, removeDependencies } from "../shared/packages.js";

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
			"lazy-value",
			"js-yaml",
			"npm-user",
			"octokit",
			"prettier",
			"replace-in-file",
			"title-case",
			"zod",
			"zod-validation-error",
		],
		packageData.dependencies,
	);

	await removeDependencies(
		[
			"@octokit/request-error",
			"@types/git-url-parse",
			"@types/js-yaml",
			"@types/prettier",
			"all-contributors-cli",
			"c8",
			"eslint-config-prettier",
			"globby",
			"tsx",
		],
		packageData.devDependencies,
		"-D",
	);

	await $`pnpm add prettier -D`;
}
