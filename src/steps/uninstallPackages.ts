import { $ } from "execa";

import { readPackageData, removeDependencies } from "../shared/packages.js";

export async function uninstallPackages(offline: boolean | undefined) {
	const packageData = await readPackageData();

	await removeDependencies(
		[
			"@clack/prompts",
			"@prettier/sync",
			"all-contributors-cli",
			"chalk",
			"create",
			"cspell-populate-words",
			"execa",
			"git-remote-origin-url",
			"git-url-parse",
			"input-from-file",
			"input-from-file-json",
			"js-yaml",
			"lazy-value",
			"npm-user",
			"object-strings-deep",
			"octokit",
			"octokit-from-auth",
			"parse-author",
			"parse-package-name",
			"populate-all-contributors-for-repository",
			"prettier",
			"replace-in-file",
			"rimraf",
			"set-github-repository-labels",
			"sort-package-json",
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
			"@types/parse-author",
			"all-contributors-cli",
			"c8",
			"create-testers",
			"eslint-config-prettier",
			"globby",
			"tsx",
		],
		packageData.devDependencies,
		"-D",
	);

	await $`pnpm add prettier -D${offline ? " --offline" : ""}`;
}
