import { $ } from "execa";

import { getNpmAuthor } from "../../shared/getNpmAuthor.js";
import { readFileSafe } from "../readFileSafe.js";
import { readEmailIfExists } from "./readEmailIfExists.js";
import { readFundingIfExists } from "./readFundingIfExists.js";
import type { PartialPackageData } from "./types.js";

export async function getHydrationDefaults() {
	const existingReadme = await readFileSafe("./README.md", "");
	const existingPackage = JSON.parse(
		await readFileSafe("./package.json", "{}")
	) as PartialPackageData;

	return {
		author: async () => {
			const fromPackage =
				typeof existingPackage.author === "string"
					? existingPackage.author.split("<")[0].trim()
					: existingPackage.author?.name;

			return fromPackage ?? (await getNpmAuthor());
		},
		email: () => readEmailIfExists(existingPackage),
		funding: readFundingIfExists,
		owner: async () =>
			(await $`git remote -v`).stdout.match(
				/origin\s+https:\/\/\S+\.\w+\/([^/]+)/
			)?.[1],
		releases: true,
		title: existingReadme.match(/^(?:# |<h1\s+align="center">)(\S+)/)?.[1],
		unitTests: true,
	};
}
